'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const sections = [
  { href: '/',           label: 'Overview' },
  { href: '/logo',       label: 'Logo' },
  { href: '/colors',     label: 'Colour' },
  { href: '/typography', label: 'Type' },
  { href: '/voice',      label: 'Voice' },
  { href: '/components', label: 'Components' },
  { href: '/downloads',  label: 'Downloads' },
];

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      {/* Mobile: sticky top bar. Desktop: vertical dock fixed to the left, vertically centered. */}
      <header className="sticky top-0 z-30 w-full md:fixed md:left-6 md:top-1/2 md:w-auto md:-translate-y-1/2">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 bg-bg/85 px-6 backdrop-blur md:h-auto md:max-w-none md:flex-col md:items-stretch md:gap-3 md:rounded-[28px] md:border md:border-line md:bg-bg md:px-3 md:py-4 md:shadow-[0_10px_40px_rgba(0,0,0,0.12)] md:dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <Link href="/" className="flex shrink-0 items-center md:justify-center md:px-2 md:py-1" aria-label="Oxydise — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/oxydise-black.svg" alt="Oxydise" className="block h-7 w-auto md:h-6 dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/oxydise-white.svg" alt="Oxydise" className="hidden h-7 w-auto md:h-6 dark:block" />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex flex-col gap-0.5">
              {sections.map((s) => {
                const isActive = s.href === '/' ? pathname === '/' : pathname?.startsWith(s.href);
                return (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex h-9 items-center rounded-full px-4 text-[15px] transition-colors ${
                        isActive
                          ? 'bg-ink text-bg'
                          : 'text-muted hover:bg-panel hover:text-ink'
                      }`}
                    >
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 md:flex-col md:gap-1 md:border-t md:border-line md:pt-3">
            <a
              href="/downloads/oxydise-brand.pdf"
              download
              aria-label="Download brand guide as PDF"
              title="Download as PDF"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-panel hover:text-ink md:inline-flex"
            >
              <DownloadIcon />
            </a>
            <ThemeToggle className="h-11 w-11 border border-line hover:border-ink/30 md:h-10 md:w-10 md:border-0 md:hover:border-0 md:hover:bg-panel" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink/30 hover:text-ink md:hidden"
            >
              {open ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-20 flex flex-col bg-bg md:hidden">
          <nav className="flex-1 overflow-y-auto px-6 pt-6">
            <ul>
              {sections.map((s) => {
                const isActive = s.href === '/' ? pathname === '/' : pathname?.startsWith(s.href);
                return (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block py-3 font-display text-[32px] font-medium leading-[1.1] tracking-[-0.02em] transition-colors ${
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="px-6 py-6">
            <a
              href="/downloads/oxydise-brand.pdf"
              download
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-[16px] text-muted hover:text-ink"
            >
              <DownloadIcon />
              Download as PDF
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function BurgerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 14h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
