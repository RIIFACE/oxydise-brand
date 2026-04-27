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
    // Invites grant 'client' role on whichever client they're added to.
    // Admin promotion is a separate action (toggleAdmin) so role escalation
    // is always explicit.
    const role = 'client';

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

// ----- User management ------------------------------------------------------

// Returns every authenticated user and their current memberships, so the
// admin Users tab can show pending (unmembered) users alongside active ones.
export async function listPortalUsers() {
  try {
    await assertAdmin();
    const admin = getSupabaseAdminClient();

    const { data: usersData, error: usersErr } = await admin.auth.admin.listUsers({ perPage: 200 });
    if (usersErr) fail(`Auth: ${usersErr.message}`);

    const userIds = (usersData?.users ?? []).map((u) => u.id);

    const { data: members } = userIds.length
      ? await admin
          .from('client_member')
          .select('user_id, role, client_id, client:client_id(name, slug, is_internal)')
          .in('user_id', userIds)
      : { data: [] };

    const byUser = new Map();
    for (const m of members ?? []) {
      if (!byUser.has(m.user_id)) byUser.set(m.user_id, []);
      byUser.get(m.user_id).push(m);
    }

    const rows = (usersData?.users ?? []).map((u) => {
      const ms = byUser.get(u.id) ?? [];
      return {
        id: u.id,
        email: u.email,
        createdAt: u.created_at,
        lastSignInAt: u.last_sign_in_at,
        memberships: ms.map((m) => ({
          clientId: m.client_id,
          role: m.role,
          slug: m.client?.slug ?? null,
          name: m.client?.name ?? null,
          isInternal: !!m.client?.is_internal,
        })),
        isAdmin: ms.some((m) => m.role === 'admin'),
        isInternal: ms.some((m) => m.client?.is_internal),
        hasClientAccess: ms.some((m) => !m.client?.is_internal),
      };
    });

    rows.sort((a, b) => {
      const aPending = a.memberships.length === 0 ? 0 : 1;
      const bPending = b.memberships.length === 0 ? 0 : 1;
      if (aPending !== bPending) return aPending - bPending;
      return (a.email || '').localeCompare(b.email || '');
    });

    return { ok: true, users: rows };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message, users: [] };
    return { ok: false, error: e?.message || 'Unknown error', users: [] };
  }
}

// Adds a client_member row on the requested audience's seed client.
// audience: 'client' | 'internal'
export async function grantAccess(formData) {
  try {
    await assertAdmin();
    const admin = getSupabaseAdminClient();
    const userId = String(formData.get('userId') ?? '');
    const audience = String(formData.get('audience') ?? 'client');
    if (!userId) fail('User id required');

    const target = await resolveAudienceClient(audience);

    const { error } = await admin
      .from('client_member')
      .upsert(
        { user_id: userId, client_id: target.id, role: 'client' },
        { onConflict: 'user_id,client_id' },
      );
    if (error) fail(`DB: ${error.message}`);

    revalidatePath('/portal/admin');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

// Removes every client_member row for the user, fully revoking access.
// Use this for a "remove from the portal but keep their auth account"
// action; pair with deletePortalUser for full removal.
export async function revokeAccess(formData) {
  try {
    const { user: actingUser } = await assertAdmin();
    const admin = getSupabaseAdminClient();
    const userId = String(formData.get('userId') ?? '');
    if (!userId) fail('User id required');
    if (userId === actingUser.id) fail("You can't revoke your own access — ask another admin.");

    const { error } = await admin.from('client_member').delete().eq('user_id', userId);
    if (error) fail(`DB: ${error.message}`);

    revalidatePath('/portal/admin');
    revalidatePath('/portal');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

// Promotes/demotes admin role on the user's existing internal membership
// (or creates one). Demoting refuses to remove the last admin and to
// demote yourself.
export async function setAdminRole(formData) {
  try {
    const { user: actingUser } = await assertAdmin();
    const admin = getSupabaseAdminClient();
    const userId = String(formData.get('userId') ?? '');
    const promote = String(formData.get('promote') ?? '') === '1';
    if (!userId) fail('User id required');
    if (!promote && userId === actingUser.id) fail("You can't demote yourself — ask another admin.");

    const internal = await resolveAudienceClient('internal');

    if (promote) {
      const { error } = await admin
        .from('client_member')
        .upsert(
          { user_id: userId, client_id: internal.id, role: 'admin' },
          { onConflict: 'user_id,client_id' },
        );
      if (error) fail(`DB: ${error.message}`);
    } else {
      // Refuse to remove the last admin so we don't lock everyone out.
      const { data: admins } = await admin
        .from('client_member')
        .select('user_id')
        .eq('role', 'admin');
      const distinctAdmins = new Set((admins ?? []).map((r) => r.user_id));
      if (distinctAdmins.size <= 1 && distinctAdmins.has(userId)) {
        fail('Refusing to demote the last admin. Promote someone else first.');
      }

      const { error } = await admin
        .from('client_member')
        .update({ role: 'client' })
        .eq('user_id', userId)
        .eq('role', 'admin');
      if (error) fail(`DB: ${error.message}`);
    }

    revalidatePath('/portal/admin');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

// Hard-deletes the user from Supabase auth — they can no longer log in
// with that email. Use this to reject pending requests outright.
export async function deletePortalUser(formData) {
  try {
    const { user: actingUser } = await assertAdmin();
    const admin = getSupabaseAdminClient();
    const userId = String(formData.get('userId') ?? '');
    if (!userId) fail('User id required');
    if (userId === actingUser.id) fail("You can't delete your own account.");

    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) fail(`Auth: ${error.message}`);

    revalidatePath('/portal/admin');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

// ----- Storage stubs (Drive cutover) ----------------------------------------

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
