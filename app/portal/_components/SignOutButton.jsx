'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function SignOutButton({ email }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push('/portal/login');
  }

  return (
    <div className="flex items-center gap-3">
      {email && <span className="hidden text-[14px] text-muted sm:inline">{email}</span>}
      <button
        type="button"
        onClick={signOut}
        disabled={pending}
        className="inline-flex h-9 items-center rounded-full px-4 text-[14px] font-medium text-ink transition-colors hover:bg-panel disabled:opacity-50"
        style={{ border: '1.5px solid currentColor' }}
      >
        {pending ? 'Signing out…' : 'Sign out'}
      </button>
    </div>
  );
}
