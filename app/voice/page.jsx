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
          <article key={name} className="rounded-[20px] bg-panel p-8 md:p-14">
            <p className="text-[14px] text-primary">{TAGS[i] ?? 'Principle'}</p>

            <h2
              className="mt-6 font-display font-medium leading-[0.92] tracking-[-0.035em] text-ink"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5rem)' }}
            >
              {name}
            </h2>

            <p className="mt-6 max-w-2xl text-[18px] leading-[1.55] text-ink/70">
              {description}
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
              <Example tone="do" text={yes} />
              <Example tone="dont" text={no} />
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
