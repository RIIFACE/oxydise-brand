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
        subcopy={`If someone reads Oxydise content, they should feel ${feel.should.join(', ')}—not ${feel.shouldNot.join(', ')}.`}
      />

      <section className="mb-16 md:mb-24">
        <p className="text-[14px] text-primary">Aligned to values</p>
        <h2
          className="mt-6 max-w-4xl font-display font-medium leading-[1.05] tracking-[-0.035em] text-ink"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {tone}
        </h2>
      </section>

      <section className="mb-24 space-y-8 md:mb-32 md:space-y-10">
        {principles.map(({ name, values, guidelines, do: yes, dont: no }) => (
          <article key={name} className="rounded-[20px] bg-panel p-8 md:p-14">
            <p className="text-[14px] text-primary">{values}</p>

            <h2
              className="mt-6 font-display font-medium leading-[0.92] tracking-[-0.035em] text-ink"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5rem)' }}
            >
              {name}
            </h2>

            {guidelines?.length > 0 && (
              <ul className="mt-6 max-w-2xl space-y-2 text-[18px] leading-[1.55] text-ink/70">
                {guidelines.map((g) => (
                  <li key={g} className="flex gap-3">
                    <span aria-hidden className="mt-[0.65em] inline-block h-[3px] w-3 flex-none rounded-full bg-ink/40" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
              <Example tone="do" items={yes} />
              <Example tone="dont" items={no} />
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function Example({ tone, items }) {
  const isDo = tone === 'do';
  const list = Array.isArray(items) ? items : [items];
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-white ${
            isDo ? 'bg-primary' : 'bg-[#E5484D]'
          }`}
        >
          {isDo ? <CheckIcon /> : <XIcon />}
        </span>
        <span className="text-[14px] font-medium text-ink">{isDo ? 'Do' : "Don't"}</span>
      </div>
      <div className="mt-5 space-y-5">
        {list.map((text, i) => (
          <blockquote
            key={i}
            className={`font-display font-medium leading-[1.2] tracking-[-0.015em] ${
              isDo ? 'text-ink' : 'text-muted line-through decoration-[1px]'
            }`}
            style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)' }}
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
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
