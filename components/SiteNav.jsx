import Link from 'next/link';
import { brand } from '@/lib/brand.config';

const sections = [
  { href: '/logo',        label: 'Logo' },
  { href: '/colors',      label: 'Colors' },
  { href: '/typography',  label: 'Typography' },
  { href: '/voice',       label: 'Voice' },
  { href: '/components',  label: 'Components' },
  { href: '/downloads',   label: 'Downloads' },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-text">
          <Mark />
          <span className="font-display text-lg tracking-tight">{brand.name}</span>
          <span className="ml-1 hidden rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted sm:inline">
            Brand
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-text"
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/downloads"
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text transition-colors hover:border-primary md:hidden"
        >
          Menu
        </Link>
      </div>
    </header>
  );
}

function Mark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="14" stroke="#C24A1E" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="8"  stroke="#4FA69C" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2"  fill="#F3EBDD" />
    </svg>
  );
}
