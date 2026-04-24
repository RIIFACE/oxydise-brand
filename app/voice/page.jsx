import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Voice — ${brand.name}` };

export default function VoicePage() {
  const { tone, feel, principles } = brand.voice;

  return (
    <>
      <Poster
        eyebrow="Voice"
        headline={
          <>
            Calm, credible,<br />
            <span className="text-muted">and considered.</span>
          </>
        }
        subcopy={tone}
      />

      {/* Feeling — what readers take away */}
      <section className="mb-20 grid grid-cols-12 gap-6 md:mb-28 md:gap-10">
        <header className="col-span-12 md:col-span-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">Feeling</p>
          <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink md:text-[32px]">
            Read any Oxydise content and the reader should come away:
          </h2>
        </header>
        <div className="col-span-12 grid grid-cols-2 gap-6 md:col-span-8 md:gap-10">
          <FeelColumn label="Should feel" tone="do" items={feel.should} />
          <FeelColumn label="Never" tone="dont" items={feel.shouldNot} />
        </div>
      </section>

      {/* Principles — aligned to values */}
      <section className="mb-24 md:mb-32">
        <header className="mb-10 flex items-baseline justify-between md:mb-14">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">Aligned to values</p>
            <h2
              className="mt-3 font-display font-medium leading-[1.05] tracking-[-0.025em] text-ink"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              Six principles that shape the voice.
            </h2>
          </div>
          <p className="hidden shrink-0 text-[16px] text-muted md:block">
            {principles.length} principles
          </p>
        </header>

        <div className="space-y-8 md:space-y-10">
          {principles.map((p, i) => (
            <Principle key={p.name} index={i + 1} {...p} />
          ))}
        </div>
      </section>

      {/* At a glance */}
      <section className="mb-24 md:mb-32">
        <header className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-[16px] font-medium tracking-tight text-ink">
            At a glance
          </h2>
          <p className="text-[16px] text-muted">Quick reference</p>
        </header>
        <ul className="divide-y divide-line border-y border-line">
          {principles.map((p, i) => (
            <li key={p.name} className="grid grid-cols-12 items-baseline gap-4 py-5">
              <span className="col-span-2 text-[14px] font-medium text-muted md:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="col-span-10 font-display text-[20px] font-medium tracking-[-0.01em] text-ink md:col-span-3">
                {p.name}
              </span>
              <span className="col-span-12 text-[16px] text-muted md:col-span-8">
                {p.values}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Principle({ index, name, values, guidelines, do: yes, dont: no }) {
  return (
    <article className="grid grid-cols-12 gap-y-10 rounded-[20px] bg-panel p-8 md:gap-x-10 md:p-14">
      <div className="col-span-12 md:col-span-5">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-[14px] font-medium text-muted">
            {String(index).padStart(2, '0')}
          </span>
          <p className="text-[14px] text-muted">{values}</p>
        </div>
        <h3
          className="mt-5 font-display font-medium leading-[0.92] tracking-[-0.035em] text-ink"
          style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
        >
          {name}
        </h3>
        {guidelines?.length > 0 && (
          <ul className="mt-8 max-w-md space-y-3 text-[17px] leading-[1.5] text-ink/75">
            {guidelines.map((g) => (
              <li key={g} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.7em] inline-block h-[3px] w-3 flex-none rounded-full bg-primary"
                />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="col-span-12 space-y-10 border-t border-line pt-10 md:col-span-7 md:border-l md:border-t-0 md:pl-10 md:pt-0">
        <Example tone="do" items={yes} />
        <Example tone="dont" items={no} />
      </div>
    </article>
  );
}

function FeelColumn({ label, tone, items }) {
  const isDo = tone === 'do';
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-white ${
            isDo ? 'bg-primary' : 'bg-[#E5484D]'
          }`}
        >
          {isDo ? <CheckIcon /> : <XIcon />}
        </span>
        <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          {label}
        </span>
      </div>
      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={`font-display font-medium leading-[1.2] tracking-[-0.015em] ${
              isDo ? 'text-ink' : 'text-muted line-through decoration-[1px]'
            }`}
            style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Example({ tone, items }) {
  const isDo = tone === 'do';
  const list = Array.isArray(items) ? items : [items];
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-white ${
            isDo ? 'bg-primary' : 'bg-[#E5484D]'
          }`}
        >
          {isDo ? <CheckIcon /> : <XIcon />}
        </span>
        <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          {isDo ? 'Do' : "Don't"}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {list.map((text, i) => (
          <blockquote
            key={i}
            className={`font-display font-medium leading-[1.25] tracking-[-0.015em] ${
              isDo ? 'text-ink' : 'text-muted line-through decoration-[1px]'
            }`}
            style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)' }}
          >
            {text}
          </blockquote>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
