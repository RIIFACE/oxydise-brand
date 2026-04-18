'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { brand } from '@/lib/brand.config';
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
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Mark />
          <span className="font-display text-[15px] font-medium tracking-tight text-ink">
            {brand.name}
          </span>
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
                    className={`inline-flex h-9 items-center rounded-full border px-3.5 text-[13px] transition-colors ${
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

function Mark() {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-bg">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}
