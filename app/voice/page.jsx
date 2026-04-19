import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Voice — ${brand.name}` };

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

      <section className="mb-24 space-y-6 md:mb-32">
        {brand.voice.principles.map(({ name, description, do: yes, dont: no }) => (
          <article key={name} className="rounded-[20px] bg-panel p-8 md:p-12">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.035em] text-ink">
              {name}
            </h2>

            <p className="mt-6 max-w-2xl text-[18px] leading-[1.55] text-ink/70">
              {description}
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-6">
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
    <div>
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-white ${
            isDo ? 'bg-primary' : 'bg-[#E5484D]'
          }`}
        >
          {isDo ? <CheckIcon /> : <XIcon />}
        </span>
        <span className="text-[16px] font-medium text-ink">{isDo ? 'Do' : "Don't"}</span>
      </div>
      <blockquote
        className={`mt-5 font-display text-[clamp(1.5rem,3vw,2rem)] font-medium leading-[1.25] tracking-[-0.015em] ${
          isDo ? 'text-ink' : 'text-muted line-through decoration-[1px]'
        }`}
      >
        “{text}”
      </blockquote>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
