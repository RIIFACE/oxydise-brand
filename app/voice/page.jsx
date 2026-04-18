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
        {brand.voice.principles.map((p, i) => (
          <article key={p.name} className="rounded-xl bg-panel p-8">
            <div className="flex items-start gap-6">
              <div className="w-10 shrink-0 font-mono text-[11px] text-muted">
                0{i + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-[22px] font-semibold tracking-[-0.015em] text-ink">
                  {p.name}
                </h2>
                <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] text-muted">
                  {p.description}
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <Example tone="do"   text={p.do} />
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
      className={`rounded-lg p-5 ${
        isDo ? 'bg-bg' : 'bg-accent/10'
      }`}
    >
      <p
        className={`mb-2 flex items-center gap-1.5 text-[12px] font-medium ${
          isDo ? 'text-primary' : 'text-accent'
        }`}
      >
        <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${isDo ? 'bg-primary/15' : 'bg-accent/15'}`}>
          {isDo ? '✓' : '×'}
        </span>
        {isDo ? 'Do' : "Don't"}
      </p>
      <p className="text-[16px] leading-[1.45] text-ink">{text}</p>
    </div>
  );
}
