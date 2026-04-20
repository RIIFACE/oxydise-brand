import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Voice — ${brand.name}` };

const TAGS = ['On substance', 'On warmth', 'On clarity'];

export default function VoicePage() {
  return (
    <>
      <Poster
        eyebrow="Voice"
        headline={
          <>
            How we<br />
            <span className="text-muted">sound.</span>
          </>
        }
        subcopy="Three principles that shape every headline, button, and email."
      />

      <section className="mb-24 space-y-8 md:mb-32 md:space-y-10">
        {brand.voice.principles.map(({ name, description, do: yes, dont: no }, i) => (
          <article key={name} className="relative overflow-hidden rounded-[20px] bg-panel p-8 md:p-16">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-14 select-none font-display text-[280px] leading-none text-ink/[0.03] md:-right-10 md:-top-24 md:text-[460px]"
            >
              &ldquo;
            </span>

            <div className="relative grid grid-cols-12 gap-y-8 md:gap-x-12">
              <aside className="col-span-12 md:col-span-4 md:pt-4">
                <p className="text-[14px] italic text-primary">{TAGS[i] ?? 'Principle'}</p>
                <p className="mt-6 max-w-sm text-[18px] leading-[1.55] text-ink/70">
                  {description}
                </p>
              </aside>

              <div className="col-span-12 md:col-span-8">
                <h2
                  className="font-display font-medium leading-[0.92] tracking-[-0.035em] text-ink"
                  style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5rem)' }}
                >
                  {name}
                </h2>

                <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
                  <Example tone="do" text={yes} />
                  <Example tone="dont" text={no} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function Example({ tone, text }) {
  const isDo = tone === 'do';
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
      <blockquote
        className={`mt-5 font-display font-medium leading-[1.2] tracking-[-0.015em] ${
          isDo ? 'text-ink' : 'text-muted line-through decoration-[1px]'
        }`}
        style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)' }}
      >
        {text}
      </blockquote>
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
