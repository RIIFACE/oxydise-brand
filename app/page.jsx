import Link from 'next/link';
import { brand } from '@/lib/brand.config';

const sections = [
  { href: '/logo',       number: '01', title: 'Logo',        description: 'Wordmark, symbol, clear space, misuse.' },
  { href: '/colors',     number: '02', title: 'Colors',      description: 'Palette, usage rules, copyable values.' },
  { href: '/typography', number: '03', title: 'Typography',  description: 'Type system, scale, and sample copy.' },
  { href: '/voice',      number: '04', title: 'Voice',       description: 'How we sound. Principles and examples.' },
  { href: '/components', number: '05', title: 'Components',  description: 'Reusable UI building blocks.' },
  { href: '/downloads',  number: '06', title: 'Downloads',   description: 'Logos, fonts, templates.' },
];

const stats = [
  { label: 'Colors',      value: Object.keys(brand.colors).length },
  { label: 'Type scale',  value: brand.typography.scale.length },
  { label: 'Principles',  value: brand.voice.principles.length },
  { label: 'Assets',      value: brand.downloads.length },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className="mb-14 border-b border-line pb-14">
        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          00 · Overview
        </p>
        <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
          The {brand.name} brand,<br />
          <span className="text-muted">documented.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.55] text-muted">
          {brand.tagline} A living reference for anyone building, writing, or designing with
          us — inside or outside the company.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/colors"
            className="inline-flex h-10 items-center rounded-lg bg-ink px-5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            Start with colors
          </Link>
          <Link
            href="/downloads"
            className="inline-flex h-10 items-center rounded-lg border border-line bg-bg px-5 text-[14px] font-medium text-ink transition-colors hover:bg-surface"
          >
            Get assets
          </Link>
        </div>
      </header>

      {/* Stat strip */}
      <section className="mb-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-panel px-6 py-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
              {s.label}
            </p>
            <p className="mt-1 text-[28px] font-semibold tracking-[-0.02em] text-ink">
              {s.value}
            </p>
          </div>
        ))}
      </section>

      {/* Section grid */}
      <section className="mb-16">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">Contents</h2>
          <p className="text-[12px] text-muted">{sections.length} sections</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex flex-col rounded-xl border border-line bg-bg p-5 transition-all hover:border-ink/15 hover:bg-panel"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted">{s.number}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink">
                  <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="mt-8">
                <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
                <p className="mt-1 text-[13.5px] leading-[1.5] text-muted">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission panel */}
      <section className="rounded-xl border border-line bg-panel px-8 py-12 md:px-12 md:py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
          Why this exists
        </p>
        <p className="mt-4 max-w-3xl text-[22px] font-medium leading-[1.35] tracking-[-0.015em] text-ink md:text-[26px]">
          A brand is every small choice you make, repeated. This site keeps those choices
          consistent — so we spend energy on the work, not the edge cases.
        </p>
      </section>
    </>
  );
}
