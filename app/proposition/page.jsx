import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Proposition — ${brand.name}` };

export default function PropositionPage() {
  const { headline, headlineTail, oneLiner, audience, pillars, against } = brand.proposition;

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
        subcopy={audience}
      />

      {/* One-liner — the elevator pitch */}
      <section className="mb-24 grid grid-cols-12 gap-6 md:mb-32 md:gap-10">
        <header className="col-span-12 md:col-span-4">
          <p className="text-[14px] text-primary">One line</p>
          <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-[32px]">
            If you have five seconds, say this.
          </h2>
        </header>
        <blockquote className="col-span-12 md:col-span-8">
          <p
            className="font-display font-medium leading-[1.1] tracking-[-0.03em] text-ink"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {oneLiner}
          </p>
        </blockquote>
      </section>

      {/* Pillars — why it matters */}
      <section className="mb-24 md:mb-32">
        <header className="mb-10 flex items-baseline justify-between md:mb-14">
          <div>
            <p className="text-[14px] text-primary">What holds it up</p>
            <h2
              className="mt-3 font-display font-medium leading-[1.05] tracking-[-0.025em] text-ink"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Four things that make it true.
            </h2>
          </div>
          <p className="hidden shrink-0 text-[16px] text-muted md:block">
            {pillars.length} pillars
          </p>
        </header>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {pillars.map((p, i) => (
            <article key={p.title} className="col-span-12 md:col-span-6">
              <p className="font-display text-[14px] text-muted tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-[22px] font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-[26px]">
                {p.title}
              </h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-muted">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Anti-proposition — what we're not */}
      <section className="mb-24 md:mb-32">
        <header className="mb-6">
          <p className="text-[14px] text-primary">{against.label}</p>
          <h2
            className="mt-3 font-display font-medium leading-[1.05] tracking-[-0.025em] text-ink"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
          >
            The places we deliberately don&apos;t play.
          </h2>
        </header>
        <ul className="divide-y divide-line">
          {against.items.map((item) => (
            <li key={item} className="py-4 text-[18px] leading-[1.5] text-muted md:text-[20px]">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
