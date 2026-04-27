'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';

// Storage moved to Google Drive — see DRIVE-SETUP.md. uploadFile and
// deleteFile are kept as stubs returning a friendly error so any
// pre-cutover client code that still references them fails loudly.

const AUDIENCE_SLUG = {
  internal: 'oxydise-internal',
  client: 'clients',
};

// Custom non-Error throwable so we can return clear messages without Next.js
// redacting them. Caught at the action boundary and returned to the client.
class ActionFailure {
  constructor(message) { this.message = message; }
}
const fail = (msg) => { throw new ActionFailure(msg); };

async function assertAdmin() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) fail('Unauthenticated');
  const { data: adminRows } = await supabase
    .from('client_member')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .limit(1);
  if ((adminRows?.length ?? 0) === 0) fail('Forbidden — your account is not an admin.');
  return { supabase, user };
}

async function resolveAudienceClient(audience) {
  const slug = AUDIENCE_SLUG[audience];
  if (!slug) fail('Invalid audience');
  const admin = getSupabaseAdminClient();
  const { data: row, error } = await admin.from('client').select('id, slug').eq('slug', slug).maybeSingle();
  if (error) fail(`DB: ${error.message}`);
  if (!row) fail(`Missing seed client "${slug}" — run migration ${slug === 'clients' ? '0003' : slug === 'brand-downloads' ? '0004' : '0002'} in Supabase.`);
  return row;
}

export async function inviteMember(formData) {
  try {
    await assertAdmin();
    const admin = getSupabaseAdminClient();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const audience = String(formData.get('audience') ?? 'client');
    if (!email) fail('Email required');

    const target = await resolveAudienceClient(audience);
    const role = audience === 'internal' ? 'admin' : 'client';

    const { data: invited, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/portal/auth/callback`,
    });
    if (inviteErr && !/already registered/i.test(inviteErr.message)) {
      fail(`Invite: ${inviteErr.message}`);
    }

    let userId = invited?.user?.id;
    if (!userId) {
      const { data: list } = await admin.auth.admin.listUsers();
      userId = list?.users?.find((u) => u.email === email)?.id;
    }
    if (!userId) fail('Could not resolve user');

    const { error } = await admin
      .from('client_member')
      .upsert({ user_id: userId, client_id: target.id, role }, { onConflict: 'user_id,client_id' });
    if (error) fail(`DB: ${error.message}`);
    revalidatePath('/portal/admin');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

export async function uploadFile() {
  return {
    ok: false,
    error:
      'Uploads moved to Google Drive. Drop files into the audience folder in Drive — see DRIVE-SETUP.md.',
  };
}

export async function deleteFile() {
  return {
    ok: false,
    error:
      'Files are managed in Google Drive now. Move them to the trash there to remove them from the portal.',
  };
}
