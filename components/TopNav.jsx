import Link from 'next/link';
import { brand } from '@/lib/brand.config';
import ThemeToggle from './ThemeToggle';

const sections = [
  { href: '/logo',       number: '01', label: 'Logo' },
  { href: '/colors',     number: '02', label: 'Color' },
  { href: '/typography', number: '03', label: 'Type' },
  { href: '/voice',      number: '04', label: 'Voice' },
  { href: '/components', number: '05', label: 'Components' },
  { href: '/downloads',  number: '06', label: 'Downloads' },
];

export default function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-6 md:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Mark />
          <span className="font-display text-[15px] font-medium tracking-tight text-ink">
            {brand.name}
          </span>
          <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted sm:inline">
            / Brand
          </span>
        </Link>

        <nav className="flex-1 overflow-x-auto">
          <ul className="flex items-center justify-end gap-x-5 whitespace-nowrap md:gap-x-7">
            {sections.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group inline-flex items-baseline gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
                >
                  <span className="font-mono text-[10px] text-muted/70 group-hover:text-ink/60">
                    {s.number}
                  </span>
                  <span>{s.label}</span>
                </Link>
              </li>
            ))}
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
