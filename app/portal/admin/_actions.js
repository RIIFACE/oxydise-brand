'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';

const PRIVATE_BUCKET = 'client-files';
const PUBLIC_BUCKET = 'brand-downloads';

const AUDIENCE_SLUG = {
  internal: 'oxydise-internal',
  client: 'clients',
  public: 'brand-downloads',
};

const BUCKET_FOR_AUDIENCE = {
  internal: PRIVATE_BUCKET,
  client: PRIVATE_BUCKET,
  public: PUBLIC_BUCKET,
};

const VALID_CATEGORIES = new Set([
  'logo', 'pdf', 'font', 'brochure', 'photo', 'video', 'social_template', 'other',
]);

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

export async function uploadFile(formData) {
  try {
    const { user } = await assertAdmin();
    const admin = getSupabaseAdminClient();
    const audience = String(formData.get('audience') ?? 'client');
    const file = formData.get('file');
    const categoryRaw = String(formData.get('category') ?? 'other');
    const category = VALID_CATEGORIES.has(categoryRaw) ? categoryRaw : 'other';
    if (!file || typeof file === 'string') fail('File required');

    const target = await resolveAudienceClient(audience);
    const bucket = BUCKET_FOR_AUDIENCE[audience] ?? PRIVATE_BUCKET;

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${target.slug}/${category}/${Date.now()}-${safeName}`;

    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await admin.storage.from(bucket).upload(path, bytes, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });
    if (upErr) {
      if (/bucket not found/i.test(upErr.message)) {
        fail(`Storage bucket "${bucket}" doesn't exist. Create it in Supabase → Storage (or run migration 0004 for brand-downloads).`);
      }
      fail(`Storage: ${upErr.message}`);
    }

    const row = {
      client_id: target.id,
      storage_path: path,
      display_name: file.name,
      mime_type: file.type || null,
      size_bytes: file.size,
      category,
      uploaded_by: user.id,
    };
    // Only include bucket when it's not the default — keeps the action
    // working on schemas that pre-date migration 0004.
    if (bucket !== PRIVATE_BUCKET) row.bucket = bucket;

    const { error: rowErr } = await admin.from('file').insert(row);
    if (rowErr && /column .*bucket.* does not exist/i.test(rowErr.message)) {
      fail('Schema out of date — run migration 0004_brand_downloads.sql in the Supabase SQL editor.');
    }
    if (rowErr) fail(`DB: ${rowErr.message}`);

    revalidatePath('/portal/admin');
    revalidatePath('/portal');
    if (audience === 'public') revalidatePath('/downloads');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

export async function deleteFile(formData) {
  try {
    await assertAdmin();
    const admin = getSupabaseAdminClient();
    const fileId = String(formData.get('fileId') ?? '');
    if (!fileId) fail('File id required');
    let { data: file } = await admin
      .from('file')
      .select('storage_path, bucket, client:client_id(slug)')
      .eq('id', fileId)
      .maybeSingle();
    if (!file) {
      const fallback = await admin
        .from('file')
        .select('storage_path, client:client_id(slug)')
        .eq('id', fileId)
        .maybeSingle();
      file = fallback.data;
    }
    if (file) {
      await admin.storage.from(file.bucket || PRIVATE_BUCKET).remove([file.storage_path]);
    }
    await admin.from('file').delete().eq('id', fileId);
    revalidatePath('/portal/admin');
    revalidatePath('/portal');
    if (file?.client?.slug === 'brand-downloads') revalidatePath('/downloads');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}
