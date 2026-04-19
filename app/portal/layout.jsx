import Link from 'next/link';
import { brand } from '@/lib/brand.config';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import SignOutButton from './_components/SignOutButton';

export const metadata = { title: `Portal — ${brand.name}` };

export default async function PortalLayout({ children }) {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-dvh bg-bg">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-6 md:px-10">
          <Link href="/portal" className="flex items-center gap-3" aria-label="Oxydise portal — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/oxydise-black.svg" alt="Oxydise" className="block h-6 w-auto dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/oxydise-white.svg" alt="Oxydise" className="hidden h-6 w-auto dark:block" />
            <span className="font-display text-[15px] text-muted">Portal</span>
          </Link>
          {user && <SignOutButton email={user.email} />}
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 md:py-16">{children}</main>
    </div>
  );
}
