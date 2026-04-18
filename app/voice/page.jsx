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

      <section className="space-y-4">
        {brand.voice.principles.map((p) => (
          <article key={p.name} className="rounded-xl bg-panel p-8">
            <h2 className="font-display text-[24px] font-medium tracking-[-0.015em] text-ink">
              {p.name}
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-[1.55] text-muted">
              {p.description}
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Example tone="do"   text={p.do} />
              <Example tone="dont" text={p.dont} />
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
    <div className={`rounded-lg p-5 ${isDo ? 'bg-bg' : 'bg-accent/10'}`}>
      <p
        className={`mb-2 flex items-center gap-1.5 text-[16px] font-medium ${
          isDo ? 'text-primary' : 'text-accent'
        }`}
      >
        <span
          aria-hidden
          className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[16px] ${
            isDo ? 'bg-primary/15' : 'bg-accent/15'
          }`}
        >
          {isDo ? '✓' : '×'}
        </span>
        {isDo ? 'Do' : "Don't"}
      </p>
      <p className="text-[16px] leading-[1.45] text-ink">{text}</p>
    </div>
  );
}
