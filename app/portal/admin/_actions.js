'use server';

import { revalidatePath } from 'next/cache';
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';

const BUCKET = 'client-files';

const AUDIENCE_SLUG = {
  internal: 'oxydise-internal',
  client: 'clients',
};

const VALID_CATEGORIES = new Set([
  'logo', 'pdf', 'font', 'brochure', 'photo', 'video', 'social_template', 'other',
]);

async function assertAdmin() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthenticated');
  const { data: adminRows } = await supabase
    .from('client_member')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .limit(1);
  if ((adminRows?.length ?? 0) === 0) throw new Error('Forbidden');
  return { supabase, user };
}

async function resolveAudienceClient(audience) {
  const slug = AUDIENCE_SLUG[audience];
  if (!slug) throw new Error('Invalid audience');
  const admin = getSupabaseAdminClient();
  const { data: row, error } = await admin.from('client').select('id, slug').eq('slug', slug).maybeSingle();
  if (error) throw new Error(error.message);
  if (!row) throw new Error(`Missing seed client "${slug}". Run migration 0003.`);
  return row;
}

export async function inviteMember(formData) {
  await assertAdmin();
  const admin = getSupabaseAdminClient();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const audience = String(formData.get('audience') ?? 'client');
  if (!email) throw new Error('Email required');

  const target = await resolveAudienceClient(audience);
  const role = audience === 'internal' ? 'admin' : 'client';

  const { data: invited, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/portal/auth/callback`,
  });
  if (inviteErr && !/already registered/i.test(inviteErr.message)) {
    throw new Error(inviteErr.message);
  }

  let userId = invited?.user?.id;
  if (!userId) {
    const { data: list } = await admin.auth.admin.listUsers();
    userId = list?.users?.find((u) => u.email === email)?.id;
  }
  if (!userId) throw new Error('Could not resolve user');

  const { error } = await admin
    .from('client_member')
    .upsert({ user_id: userId, client_id: target.id, role }, { onConflict: 'user_id,client_id' });
  if (error) throw new Error(error.message);
  revalidatePath('/portal/admin');
}

export async function uploadFile(formData) {
  const { user } = await assertAdmin();
  const admin = getSupabaseAdminClient();
  const audience = String(formData.get('audience') ?? 'client');
  const file = formData.get('file');
  const categoryRaw = String(formData.get('category') ?? 'other');
  const category = VALID_CATEGORIES.has(categoryRaw) ? categoryRaw : 'other';
  if (!file || typeof file === 'string') throw new Error('File required');

  const target = await resolveAudienceClient(audience);

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${target.slug}/${category}/${Date.now()}-${safeName}`;

  const bytes = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await admin.storage.from(BUCKET).upload(path, bytes, {
    contentType: file.type || 'application/octet-stream',
    upsert: false,
  });
  if (upErr) throw new Error(upErr.message);

  const { error: rowErr } = await admin.from('file').insert({
    client_id: target.id,
    storage_path: path,
    display_name: file.name,
    mime_type: file.type || null,
    size_bytes: file.size,
    category,
    uploaded_by: user.id,
  });
  if (rowErr) throw new Error(rowErr.message);
  revalidatePath('/portal/admin');
  revalidatePath('/portal');
}

export async function deleteFile(formData) {
  await assertAdmin();
  const admin = getSupabaseAdminClient();
  const fileId = String(formData.get('fileId') ?? '');
  if (!fileId) throw new Error('File id required');
  const { data: file } = await admin.from('file').select('storage_path').eq('id', fileId).maybeSingle();
  if (file) {
    await admin.storage.from(BUCKET).remove([file.storage_path]);
  }
  await admin.from('file').delete().eq('id', fileId);
  revalidatePath('/portal/admin');
  revalidatePath('/portal');
}
