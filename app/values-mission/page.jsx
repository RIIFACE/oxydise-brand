import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Values + Mission — ${brand.name}` };

export default function ValuesMissionPage() {
  const { headline, headlineTail, intro, mission, values } = brand.valuesMission;

  return (
    <>
      <Poster
        eyebrow="Values + Mission"
        headline={
          <>
            {headline}<br />
            <span className="text-muted">{headlineTail}</span>
          </>
        }
        subcopy={intro}
      />

      {/* Mission — one line that keeps us honest */}
      <section className="mb-24 grid grid-cols-12 gap-6 md:mb-32 md:gap-10">
        <header className="col-span-12 md:col-span-4">
          <p className="text-[14px] text-primary">{mission.label}</p>
          <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-[32px]">
            One sentence. Kept simple.
          </h2>
        </header>
        <blockquote className="col-span-12 md:col-span-8">
          <p
            className="font-display font-medium leading-[1.1] tracking-[-0.03em] text-ink"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {mission.statement}
          </p>
        </blockquote>
      </section>

      {/* Values — how we work */}
      <section className="mb-24 md:mb-32">
        <header className="mb-10 flex items-baseline justify-between md:mb-14">
          <div>
            <p className="text-[14px] text-primary">Values</p>
            <h2
              className="mt-3 font-display font-medium leading-[1.05] tracking-[-0.025em] text-ink"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              The six things we measure every decision against.
            </h2>
          </div>
          <p className="hidden shrink-0 text-[16px] text-muted md:block">
            {values.length} values
          </p>
        </header>

        <div className="space-y-6 md:space-y-8">
          {values.map((v, i) => (
            <Value key={v.name} index={i + 1} {...v} />
          ))}
        </div>
      </section>
    </>
  );
}

function Value({ index, name, description }) {
  return (
    <article className="grid grid-cols-12 items-baseline gap-4 border-t border-line pt-6 md:gap-8 md:pt-8">
      <div className="col-span-2 md:col-span-1">
        <span className="font-display text-[14px] text-muted tabular-nums">
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <h3
        className="col-span-10 font-display font-medium leading-[1.1] tracking-[-0.02em] text-ink md:col-span-4"
        style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
      >
        {name}
      </h3>
      <p className="col-span-12 text-[16px] leading-[1.55] text-muted md:col-span-7">
        {description}
      </p>
    </article>
  );
}
