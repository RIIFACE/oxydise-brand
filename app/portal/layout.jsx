import Link from 'next/link';
import { brand } from '@/lib/brand.config';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import SignOutButton from './_components/SignOutButton';

export const metadata = { title: `Portal — ${brand.name}` };

export default async function PortalLayout({ children }) {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      {/* The marketing site uses scroll-snap for a "slideshow" feel.
          The portal is an app — scroll should behave normally. */}
      <style>{`
        html { scroll-snap-type: none !important; }
        main > section, main > article,
        main > div > section, main > div > article {
          scroll-snap-align: none !important;
          scroll-snap-stop: normal !important;
          min-height: 0 !important;
        }
      `}</style>
    <div className="min-h-dvh bg-bg">
      <header className="border-b border-line">
        <div className="flex h-16 items-center justify-between gap-4 px-6 md:px-10">
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
      <main className="px-6 py-10 md:px-10 md:py-12">{children}</main>
    </div>
    </>
  );
}
