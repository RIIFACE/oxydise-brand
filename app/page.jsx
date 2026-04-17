import Link from 'next/link';
import { brand } from '@/lib/brand.config';

const sections = [
  { href: '/logo',       title: 'Logo',        description: 'Wordmark, symbol, clear space, misuse.' },
  { href: '/colors',     title: 'Colors',      description: 'Palette, usage rules, copyable values.' },
  { href: '/typography', title: 'Typography',  description: 'Type system, scale, and sample copy.' },
  { href: '/voice',      title: 'Voice',       description: 'How we sound. Principles and examples.' },
  { href: '/components', title: 'Components',  description: 'Reusable UI building blocks.' },
  { href: '/downloads',  title: 'Downloads',   description: 'Logos, fonts, templates.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {brand.domain}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] tracking-tightest">
            The {brand.name} <span className="italic text-accent">brand</span>,<br />
            documented.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            {brand.tagline} A living reference for anyone building, writing, or designing
            with us — inside or outside the company.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/colors"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-primary/90"
            >
              Start with colors
            </Link>
            <Link
              href="/downloads"
              className="rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary"
            >
              Get assets
            </Link>
          </div>
        </div>

        {/* Oxidation halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(194,74,30,0.25) 0%, transparent 60%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(79,166,156,0.18) 0%, transparent 60%)',
          }}
        />
      </section>

      {/* Section grid */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl">Contents</h2>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {sections.length} sections
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <div className="flex items-start justify-between">
                <p className="font-mono text-[11px] text-muted">
                  0{i + 1}
                </p>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted transition-colors group-hover:text-primary">
                  <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="mt-14">
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission strip */}
      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Why this exists
          </p>
          <p className="mt-6 font-display text-3xl leading-snug md:text-4xl">
            A brand is every small choice you make, repeated. This site keeps those choices
            consistent — so we spend energy on the work, not the edge cases.
          </p>
        </div>
      </section>
    </>
  );
}
