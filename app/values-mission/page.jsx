import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Mission & Values — ${brand.name}` };

export default function ValuesMissionPage() {
  const { label, headline, headlineTail, intro, mission, values, approvedOn } = brand.valuesMission;

  return (
    <>
      <Poster
        eyebrow={label}
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
          <p className="text-[14px] font-medium text-muted">{mission.label}</p>
          <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-[32px]">
            The north star.
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
            <p className="text-[14px] font-medium text-muted">Values</p>
            <h2
              className="mt-3 font-display font-medium leading-[1.05] tracking-[-0.025em] text-ink"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              The six we measure every decision against.
            </h2>
          </div>
          {approvedOn && (
            <p className="hidden shrink-0 text-[14px] text-muted md:block">
              Approved{' '}
              {new Date(approvedOn).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </header>

        <ul className="divide-y divide-line border-t border-line">
          {values.map((v, i) => (
            <li key={v.name} className="grid grid-cols-12 gap-x-4 gap-y-4 py-10 md:gap-x-8 md:py-12">
              <div className="col-span-2 md:col-span-1">
                <span className="font-display text-[14px] text-muted tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3
                  className="font-display font-medium leading-[1.05] tracking-[-0.02em] text-ink"
                  style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)' }}
                >
                  {v.name}
                </h3>
                {v.summary && (
                  <p className="mt-2 text-[14px] text-muted">{v.summary}</p>
                )}
              </div>
              <p className="col-span-12 self-center text-[17px] leading-[1.55] text-ink/80 md:col-span-7 md:text-[18px]">
                {v.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
