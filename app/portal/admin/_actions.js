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

// Returns { supabase, user, role } where role is 'admin' | 'manager' | null.
// Use it to gate actions: assertAdmin() for admin-only, assertManager()
// for manager-or-admin.
async function getActingRole() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) fail('Unauthenticated');
  const { data: rows } = await supabase
    .from('client_member')
    .select('role')
    .eq('user_id', user.id)
    .in('role', ['manager', 'admin']);
  let role = null;
  for (const r of rows ?? []) {
    if (r.role === 'admin') { role = 'admin'; break; }
    if (r.role === 'manager') role = 'manager';
  }
  return { supabase, user, role };
}

async function assertAdmin() {
  const ctx = await getActingRole();
  if (ctx.role !== 'admin') fail('Forbidden — admin only.');
  return ctx;
}

async function assertManager() {
  const ctx = await getActingRole();
  if (ctx.role !== 'admin' && ctx.role !== 'manager') {
    fail('Forbidden — manager or admin only.');
  }
  return ctx;
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

// ----- User management ------------------------------------------------------

// Returns every authenticated user and their current memberships, so the
// admin Users tab can show pending (unmembered) users alongside active ones.
export async function listPortalUsers() {
  try {
    await assertManager();
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
        isManager: ms.some((m) => m.role === 'manager'),
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
    await assertManager();
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

// ----- Manager role ---------------------------------------------------------

// Promotes/demotes manager role on the user's internal membership.
// Admin-only. Last-admin / self-demote guards are unnecessary because
// 'manager' isn't a privilege chain, but we still refuse self-promotion
// when the caller is only a manager (caught upstream by assertAdmin).
export async function setManagerRole(formData) {
  try {
    const { user: actingUser } = await assertAdmin();
    const admin = getSupabaseAdminClient();
    const userId = String(formData.get('userId') ?? '');
    const promote = String(formData.get('promote') ?? '') === '1';
    if (!userId) fail('User id required');
    if (!promote && userId === actingUser.id) fail("You can't demote yourself.");

    const internal = await resolveAudienceClient('internal');

    if (promote) {
      const { error } = await admin
        .from('client_member')
        .upsert(
          { user_id: userId, client_id: internal.id, role: 'manager' },
          { onConflict: 'user_id,client_id' },
        );
      if (error) fail(`DB: ${error.message}`);
    } else {
      const { error } = await admin
        .from('client_member')
        .update({ role: 'client' })
        .eq('user_id', userId)
        .eq('role', 'manager');
      if (error) fail(`DB: ${error.message}`);
    }

    revalidatePath('/portal/admin');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

// ----- Allowlist + access requests ------------------------------------------

export async function listAllowedEmails() {
  try {
    await assertManager();
    const admin = getSupabaseAdminClient();
    const { data, error } = await admin
      .from('allowed_email')
      .select('email, added_at, note')
      .order('added_at', { ascending: false });
    if (error) fail(`DB: ${error.message}`);
    return { ok: true, emails: data ?? [] };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message, emails: [] };
    return { ok: false, error: e?.message || 'Unknown error', emails: [] };
  }
}

export async function addAllowedEmail(formData) {
  try {
    const { user } = await assertManager();
    const admin = getSupabaseAdminClient();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const note = String(formData.get('note') ?? '').trim() || null;
    if (!email) fail('Email required');
    if (!email.includes('@')) fail('That doesn’t look like an email');

    const { error } = await admin
      .from('allowed_email')
      .upsert({ email, added_by: user.id, note }, { onConflict: 'email' });
    if (error) fail(`DB: ${error.message}`);

    // Clear any matching pending access request — the allowlist now covers it.
    await admin.from('access_request').delete().eq('email', email);

    revalidatePath('/portal/admin');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

export async function removeAllowedEmail(formData) {
  try {
    await assertManager();
    const admin = getSupabaseAdminClient();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    if (!email) fail('Email required');

    const { error } = await admin.from('allowed_email').delete().eq('email', email);
    if (error) fail(`DB: ${error.message}`);

    revalidatePath('/portal/admin');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

export async function listAccessRequests() {
  try {
    await assertManager();
    const admin = getSupabaseAdminClient();
    const { data, error } = await admin
      .from('access_request')
      .select('id, email, requested_at, status')
      .eq('status', 'pending')
      .order('requested_at', { ascending: false });
    if (error) fail(`DB: ${error.message}`);
    return { ok: true, requests: data ?? [] };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message, requests: [] };
    return { ok: false, error: e?.message || 'Unknown error', requests: [] };
  }
}

export async function approveAccessRequest(formData) {
  try {
    const { user } = await assertManager();
    const admin = getSupabaseAdminClient();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    if (!email) fail('Email required');

    const { error: addErr } = await admin
      .from('allowed_email')
      .upsert({ email, added_by: user.id }, { onConflict: 'email' });
    if (addErr) fail(`DB: ${addErr.message}`);

    await admin.from('access_request').delete().eq('email', email);

    revalidatePath('/portal/admin');
    return { ok: true };
  } catch (e) {
    if (e instanceof ActionFailure) return { ok: false, error: e.message };
    return { ok: false, error: e?.message || 'Unknown error' };
  }
}

export async function rejectAccessRequest(formData) {
  try {
    await assertManager();
    const admin = getSupabaseAdminClient();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    if (!email) fail('Email required');

    const { error } = await admin.from('access_request').delete().eq('email', email);
    if (error) fail(`DB: ${error.message}`);

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
