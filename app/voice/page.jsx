import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Voice — ${brand.name}` };

export default function VoicePage() {
  return (
    <>
      <SectionHeader
        eyebrow="Voice"
        title="How we sound."
        description="Three principles that shape every headline, button, and email."
      />

      <section className="space-y-6">
        {brand.voice.principles.map(({ name, description, do: yes, dont: no }) => (
          <article key={name} className="rounded-[20px] bg-panel p-8 md:p-10">
            <p className="text-[16px] font-medium text-muted">Principle</p>

            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink">
              {name}
            </h2>

            <p className="mt-5 max-w-2xl text-[18px] leading-[1.5] text-ink/80">
              {description}
            </p>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
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
      <p className="flex items-center gap-2 text-[16px] font-medium text-ink">
        <span
          aria-hidden
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
            isDo ? 'bg-primary text-white' : 'bg-[#E5484D] text-white'
          }`}
        >
          {isDo ? <CheckIcon /> : <XIcon />}
        </span>
        {isDo ? 'Do' : "Don't"}
      </p>
      <p className="mt-3 font-display text-[22px] font-medium leading-[1.3] tracking-[-0.01em] text-ink">
        {text}
      </p>
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
