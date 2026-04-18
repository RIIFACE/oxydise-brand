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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const inner = [
    'mx-auto flex h-16 items-center justify-between gap-4 max-w-[1440px] px-6 transition-all duration-300',
    scrolled
      ? 'bg-bg md:mt-3 md:max-w-[1120px] md:rounded-full md:border md:border-line md:px-5 md:shadow-[0_6px_24px_rgba(0,0,0,0.08)] md:dark:shadow-[0_6px_24px_rgba(0,0,0,0.5)]'
      : 'bg-bg/85 backdrop-blur md:px-10',
  ].join(' ');

  return (
    <>
      <header className="sticky top-0 z-30">
        <div className={inner}>
          <Link href="/" className="flex shrink-0 items-center" aria-label="Oxydise — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/oxydise-black.svg" alt="Oxydise" className="block h-7 w-auto md:h-8 dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/oxydise-white.svg" alt="Oxydise" className="hidden h-7 w-auto md:h-8 dark:block" />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-1.5">
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

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/downloads/oxydise-brand.pdf"
              download
              aria-label="Download brand guide as PDF"
              title="Download as PDF"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink/30 hover:text-ink md:inline-flex"
            >
              <DownloadIcon />
            </a>
            <ThemeToggle />
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
