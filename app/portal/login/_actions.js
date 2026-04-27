'use server';

import { getSupabaseAdminClient } from '@/lib/supabase/server';
import { isOxydiseDomain, normaliseEmail } from '@/lib/portal/access';

// Server-side login gate. Returns:
//   { ok: true,  status: 'sent'    }  → magic link sent to inbox
//   { ok: true,  status: 'pending' }  → email not allowed, request logged
//   { ok: false, error }              → something went wrong
//
// Allowed = matches an Oxydise domain OR is in the `allowed_email`
// table. Anything else gets a row written to `access_request` so the
// admin can see the request and approve from /portal/admin.
export async function requestMagicLink(formData) {
  const email = normaliseEmail(formData.get('email'));
  const next = String(formData.get('next') ?? '/portal');

  if (!email) return { ok: false, error: 'Email required' };
  if (!email.includes('@')) return { ok: false, error: 'That doesn’t look like an email' };

  const admin = getSupabaseAdminClient();

  let allowed = isOxydiseDomain(email);
  if (!allowed) {
    const { data } = await admin
      .from('allowed_email')
      .select('email')
      .eq('email', email)
      .maybeSingle();
    allowed = !!data;
  }

  if (!allowed) {
    // Log the request, dedupe on email so repeated attempts don't pile up.
    await admin
      .from('access_request')
      .upsert(
        { email, status: 'pending', requested_at: new Date().toISOString() },
        { onConflict: 'email', ignoreDuplicates: false },
      );
    return { ok: true, status: 'pending' };
  }

  // Allowed — send the magic link. inviteUserByEmail creates the
  // Supabase user on first try and returns "already registered" on
  // subsequent tries; in that case we fall through to a magic link
  // generated for the existing user.
  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/portal/auth/callback?next=${encodeURIComponent(next)}`;

  const { error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo });
  if (inviteErr && !/already registered/i.test(inviteErr.message)) {
    return { ok: false, error: inviteErr.message };
  }

  if (inviteErr) {
    // User already exists — generate a magic link instead.
    const { error: linkErr } = await admin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo },
    });
    if (linkErr) return { ok: false, error: linkErr.message };
  }

  return { ok: true, status: 'sent' };
}
