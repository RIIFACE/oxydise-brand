import { NextResponse } from 'next/server';
import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';
import { isOxydiseDomain } from '@/lib/portal/access';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/portal';

  if (code) {
    const supabase = getSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Auto-grant Internal-team membership to anyone signing in with an
    // Oxydise domain. Skips the Pending approval step for the team so
    // new hires just get a working magic link. Admin promotion is a
    // separate, explicit action.
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email && isOxydiseDomain(user.email)) {
        const admin = getSupabaseAdminClient();
        const { data: internal } = await admin
          .from('client')
          .select('id')
          .eq('slug', 'oxydise-internal')
          .maybeSingle();
        if (internal?.id) {
          await admin
            .from('client_member')
            .upsert(
              { user_id: user.id, client_id: internal.id, role: 'client' },
              { onConflict: 'user_id,client_id', ignoreDuplicates: true },
            );
        }
      }
    } catch {
      // Best-effort — if it fails the user lands on Pending approval
      // and an admin can grant manually from the Users tab.
    }
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
