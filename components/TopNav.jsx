'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const sections = [
  { href: '/',           label: 'Overview' },
  { href: '/logo',       label: 'Logo' },
  { href: '/colors',     label: 'Color' },
  { href: '/typography', label: 'Type' },
  { href: '/voice',      label: 'Voice' },
  { href: '/components', label: 'Components' },
  { href: '/downloads',  label: 'Downloads' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 bg-bg/80 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 md:px-10">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Oxydise — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/oxydise-black.svg" alt="Oxydise" className="block h-8 w-auto dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/oxydise-white.svg" alt="Oxydise" className="hidden h-8 w-auto dark:block" />
        </Link>

        <nav className="overflow-x-auto md:justify-self-center">
          <ul className="flex items-center gap-1 whitespace-nowrap md:gap-1.5">
            {sections.map((s) => {
              const isActive = s.href === '/' ? pathname === '/' : pathname?.startsWith(s.href);
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`inline-flex h-10 items-center rounded-full border px-4 text-[16px] transition-colors ${
                      isActive
                        ? 'border-ink bg-ink text-bg'
                        : 'border-line text-muted hover:border-ink/30 hover:bg-panel hover:text-ink'
                    }`}
                  >
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
