import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Voice — ${brand.name}` };

export default function VoicePage() {
  return (
    <>
      <SectionHeader
        eyebrow="04 Voice"
        title="How we sound."
        description="Three principles that shape every headline, button, and email."
      />

      <section className="mx-auto max-w-6xl space-y-4 px-6 pb-24">
        {brand.voice.principles.map((p, i) => (
          <article key={p.name} className="rounded-xl border border-border bg-surface p-8">
            <div className="flex items-start gap-6">
              <div className="w-10 shrink-0 font-mono text-xs text-muted">0{i + 1}</div>
              <div className="flex-1">
                <h2 className="font-display text-3xl">{p.name}</h2>
                <p className="mt-2 max-w-2xl text-muted">{p.description}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <Example tone="do" text={p.do} />
                  <Example tone="dont" text={p.dont} />
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
    <div
      className={`rounded-lg border p-5 ${
        isDo ? 'border-primary/40 bg-primary/5' : 'border-accent/40 bg-accent/5'
      }`}
    >
      <p
        className={`mb-2 font-mono text-[11px] uppercase tracking-widest ${
          isDo ? 'text-primary' : 'text-accent'
        }`}
      >
        {isDo ? '✓ Do' : '× Don\'t'}
      </p>
      <p className="font-display text-lg leading-snug">{text}</p>
    </div>
  );
}
