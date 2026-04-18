import Link from 'next/link';
import { brand } from '@/lib/brand.config';
import ThemeToggle from './ThemeToggle';

const sections = [
  { href: '/',           label: 'Overview',    number: '00' },
  { href: '/logo',       label: 'Logo',        number: '01' },
  { href: '/colors',     label: 'Colors',      number: '02' },
  { href: '/typography', label: 'Typography',  number: '03' },
  { href: '/voice',      label: 'Voice',       number: '04' },
  { href: '/components', label: 'Components',  number: '05' },
  { href: '/downloads',  label: 'Downloads',   number: '06' },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-panel md:flex">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <Mark />
        <div className="leading-tight">
          <p className="font-display text-[16px] font-medium tracking-tight text-ink">{brand.name}</p>
          <p className="text-[16px] text-muted">Brand guidelines</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2">
        <p className="mb-2 px-3 text-[16px] font-medium uppercase tracking-[0.08em] text-muted">
          Sections
        </p>
        <ul className="space-y-0.5">
          {sections.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-[16px] font-medium text-ink/80 transition-colors hover:bg-surface hover:text-ink"
              >
                <span className="w-5 text-[16px] text-muted group-hover:text-ink/60">
                  {s.number}
                </span>
                <span>{s.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-3 border-t border-line px-4 py-4">
        <ThemeToggle />
        <div className="px-2">
          <p className="text-[16px] text-muted">{brand.domain}</p>
          <p className="text-[16px] text-muted/80">
            v1.0 · {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
    </aside>
  );
}

function Mark() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-bg">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}
