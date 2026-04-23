'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function PortalAuthButton() {
  const pathname = usePathname();
  const [state, setState] = useState({ status: 'loading', email: null });

  useEffect(() => {
    let mounted = true;
    let supabase;
    try {
      supabase = getSupabaseBrowserClient();
    } catch {
      // Missing env vars in browser — silently behave as signed out.
      setState({ status: 'out', email: null });
      return () => {};
    }

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setState(data?.user
        ? { status: 'in', email: data.user.email }
        : { status: 'out', email: null });
    }).catch(() => {
      if (mounted) setState({ status: 'out', email: null });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setState(session?.user
        ? { status: 'in', email: session.user.email }
        : { status: 'out', email: null });
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  // Conditional render must come AFTER all hooks (Rules of Hooks).
  // Portal routes have their own sign-out button in the portal header.
  if (pathname?.startsWith('/portal')) return null;

  // Desktop only — on mobile the sticky TopNav already occupies the top.
  const wrapper = 'fixed right-6 top-6 z-40 hidden md:block';

  if (state.status === 'loading') {
    return <div className={wrapper + ' h-10 w-24 rounded-full bg-panel/60'} aria-hidden />;
  }

  if (state.status === 'in') {
    return (
      <div className={wrapper + ' flex items-center gap-2'}>
        <Link
          href="/portal"
          className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
          title={state.email || 'Open portal'}
        >
          Portal
        </Link>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <Link
        href="/portal/login"
        className="inline-flex h-10 items-center rounded-full px-5 text-[14px] font-medium text-ink transition-colors hover:bg-panel"
        style={{ border: '1.5px solid currentColor' }}
      >
        Sign in
      </Link>
    </div>
  );
}
