import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Proposition — ${brand.name}` };

export default function PropositionPage() {
  const { headline, headlineTail, definition, primary, support, pillars, usage } = brand.proposition;

  return (
    <>
      <Poster
        eyebrow="Proposition"
        headline={
          <>
            {headline}<br />
            <span className="text-muted">{headlineTail}</span>
          </>
        }
        subcopy="The single sentence that leads, and the support line that grounds it. Used wherever we introduce the brand."
      />

      {/* Definition — what a proposition is */}
      <section className="mb-20 grid grid-cols-12 gap-6 md:mb-28 md:gap-10">
        <header className="col-span-12 md:col-span-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">What it is</p>
          <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-[32px]">
            The central idea.
          </h2>
        </header>
        <p className="col-span-12 self-center text-[18px] leading-[1.55] text-ink/80 md:col-span-8 md:text-[20px]">
          {definition}
        </p>
      </section>

      {/* Primary — the lead */}
      <section className="mb-16 grid grid-cols-12 gap-6 md:mb-24 md:gap-10">
        <header className="col-span-12 md:col-span-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">Primary</p>
          <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-[32px]">
            The lead line.
          </h2>
        </header>
        <blockquote className="col-span-12 md:col-span-8">
          <p
            className="font-display font-medium leading-[1.02] tracking-[-0.035em] text-ink"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {primary}
          </p>
        </blockquote>
      </section>

      {/* Support — the follow */}
      <section className="mb-24 grid grid-cols-12 gap-6 md:mb-32 md:gap-10">
        <header className="col-span-12 md:col-span-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">Support</p>
          <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-[32px]">
            Follows the primary.
          </h2>
        </header>
        <blockquote className="col-span-12 md:col-span-8">
          <p
            className="font-display font-medium leading-[1.2] tracking-[-0.02em] text-ink/90"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            {support}
          </p>
        </blockquote>
      </section>

      {/* Pillars */}
      <section className="mb-24 md:mb-32">
        <header className="mb-10 flex items-baseline justify-between md:mb-14">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">Pillars</p>
            <h2
              className="mt-3 font-display font-medium leading-[1.05] tracking-[-0.025em] text-ink"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Two technologies anchor the brand.
            </h2>
          </div>
          <p className="hidden shrink-0 text-[16px] text-muted md:block">
            {pillars.length} pillars
          </p>
        </header>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className="col-span-12 flex min-h-[220px] flex-col justify-between rounded-[20px] bg-panel p-8 md:col-span-6 md:p-12"
            >
              <span className="font-display text-[14px] font-medium text-muted tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p
                className="font-display font-medium leading-[1.05] tracking-[-0.025em] text-ink"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
              >
                {p.title}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Usage */}
      <section className="mb-24 md:mb-32">
        <header className="mb-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">Usage</p>
          <h2 className="mt-3 font-display text-[22px] font-medium tracking-[-0.015em] text-ink md:text-[26px]">
            Where each form appears.
          </h2>
        </header>
        <ul className="divide-y divide-line border-y border-line">
          {usage.map((row) => (
            <UsageRow key={row.label} label={row.label} where={row.where} />
          ))}
        </ul>
      </section>
    </>
  );
}

function UsageRow({ label, where }) {
  return (
    <li className="grid grid-cols-12 items-baseline gap-4 py-5">
      <span className="col-span-12 font-display text-[18px] font-medium tracking-[-0.01em] text-ink md:col-span-4">
        {label}
      </span>
      <span className="col-span-12 text-[16px] leading-[1.5] text-muted md:col-span-8">
        {where}
      </span>
    </li>
  );
}
