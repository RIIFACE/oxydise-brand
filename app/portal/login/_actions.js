'use server';

import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';
import { isOxydiseDomain, normaliseEmail } from '@/lib/portal/access';

// Server-side login. Returns:
//   { ok: true,  status: 'signed-in' }  → session set, redirect client-side
//   { ok: true,  status: 'pending'   }  → email not allowed, request logged
//   { ok: false, error }                → bad credentials or other failure
//
// Policy:
//   - Email matches an Oxydise domain OR is in `allowed_email` → try
//     signing in with the supplied password.
//   - Anything else → write to `access_request`, return 'pending'.
//   - Password mismatch / no account yet → return a generic
//     "Invalid email or password" so we don't leak which side is wrong.
export async function signInWithPassword(formData) {
  const email = normaliseEmail(formData.get('email'));
  const password = String(formData.get('password') ?? '');

  if (!email) return { ok: false, error: 'Email required' };
  if (!email.includes('@')) return { ok: false, error: 'That doesn’t look like an email' };
  if (!password) return { ok: false, error: 'Password required' };

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
    await admin
      .from('access_request')
      .upsert(
        { email, status: 'pending', requested_at: new Date().toISOString() },
        { onConflict: 'email', ignoreDuplicates: false },
      );
    return { ok: true, status: 'pending' };
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, error: 'Invalid email or password.' };
  }

  return { ok: true, status: 'signed-in' };
}
