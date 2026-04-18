import Link from 'next/link';
import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

const sections = [
  { href: '/logo',       number: '01', title: 'Logo',        description: 'Wordmark, symbol, clear space, misuse.' },
  { href: '/colors',     number: '02', title: 'Color',       description: 'Palette, usage rules, copyable values.' },
  { href: '/typography', number: '03', title: 'Type',        description: 'Urbanist and Manrope. Scale and samples.' },
  { href: '/voice',      number: '04', title: 'Voice',       description: 'How we sound. Principles and examples.' },
  { href: '/components', number: '05', title: 'Components',  description: 'Reusable UI building blocks.' },
  { href: '/downloads',  number: '06', title: 'Downloads',   description: 'Logos, fonts, templates.' },
];

export default function HomePage() {
  return (
    <>
      <Poster
        eyebrow="00 — Overview"
        headline={
          <>
            The {brand.name}<br />
            brand, <span className="text-muted">documented.</span>
          </>
        }
        subcopy="A living reference for anyone building, writing, or designing with us — inside or outside the company."
        mark={<PosterMark />}
      />

      <section className="grid grid-cols-12 border-t border-line">
        <header className="col-span-12 flex items-baseline justify-between py-8">
          <h2 className="font-display text-[14px] font-medium uppercase tracking-[0.12em] text-muted">
            Contents
          </h2>
          <p className="font-mono text-[11px] text-muted">{sections.length} sections</p>
        </header>

        <ol className="col-span-12 divide-y divide-line border-t border-line">
          {sections.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group grid grid-cols-12 items-baseline gap-x-6 py-8 transition-colors hover:bg-panel/60 md:py-10"
              >
                <span className="col-span-2 font-mono text-[12px] text-muted md:col-span-1">
                  {s.number}
                </span>
                <span className="col-span-10 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium tracking-[-0.02em] text-ink md:col-span-6">
                  {s.title}
                </span>
                <span className="col-span-12 mt-1 text-[14px] leading-[1.5] text-muted md:col-span-4 md:mt-0">
                  {s.description}
                </span>
                <span className="hidden md:col-span-1 md:flex md:justify-end">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink">
                    <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid grid-cols-12 border-t border-line py-20 md:py-28">
        <p className="col-span-12 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink md:col-span-10 md:col-start-2">
          A brand is every small choice you make, repeated. This site keeps those choices
          consistent — so we spend energy on the work, not the edge cases.
        </p>
        <p className="col-span-12 mt-10 font-mono text-[11px] uppercase tracking-[0.12em] text-muted md:col-span-10 md:col-start-2">
          {brand.domain}
        </p>
      </section>
    </>
  );
}

function PosterMark() {
  return (
    <div aria-hidden className="flex h-24 w-24 items-center justify-center rounded-full border border-ink text-ink md:h-32 md:w-32">
      <svg width="48" height="48" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1" />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
    </div>
  );
}
