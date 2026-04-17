import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Typography — ${brand.name}` };

export default function TypographyPage() {
  const { display, sans, scale } = brand.typography;

  return (
    <>
      <SectionHeader
        eyebrow="03 Typography"
        title="Type system."
        description="Two families. One for editorial moments, one for everything else."
      />

      {/* Families */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          <FamilyCard family={display} role="Display" preview="Built with patience." />
          <FamilyCard family={sans}    role="Sans"    preview="Clear, direct, functional." sans />
        </div>
      </section>

      {/* Scale */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-6 font-display text-2xl">Scale</h2>
        <div className="divide-y divide-border rounded-xl border border-border bg-surface/60">
          {scale.map((step) => (
            <div key={step.name} className="flex items-baseline gap-6 px-6 py-5">
              <div className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted">
                {step.name}
              </div>
              <div
                className="flex-1 truncate font-display"
                style={{
                  fontSize: step.size,
                  lineHeight: step.line,
                  letterSpacing: step.tracking,
                  fontWeight: step.weight,
                }}
              >
                The quick brown fox
              </div>
              <div className="hidden shrink-0 font-mono text-[11px] text-muted md:block">
                {step.size} / {step.line}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample paragraph */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-6 font-display text-2xl">In context</h2>
        <div className="rounded-xl border border-border bg-surface p-8 md:p-12">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">Sample</p>
          <h3 className="font-display text-4xl leading-tight tracking-tightest">
            We believe the most durable things are made slowly, from good materials, by people
            who care what happens after the handoff.
          </h3>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            That belief shows up everywhere — from how we write a product description to the
            way a button animates under a cursor. This page is a record of the small decisions
            that, taken together, form the brand.
          </p>
        </div>
      </section>
    </>
  );
}

function FamilyCard({ family, role, preview, sans }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">{role}</p>
        <p className="font-mono text-[11px] text-muted">{family.weights.join(' · ')}</p>
      </div>
      <p
        className={`mt-6 text-5xl leading-none tracking-tight ${sans ? 'font-sans' : 'font-display'}`}
      >
        {family.family}
      </p>
      <p className={`mt-4 text-xl ${sans ? 'font-sans' : 'font-display'} text-text`}>
        {preview}
      </p>
      <p className="mt-4 text-sm text-muted">{family.usage}</p>
      <p className="mt-2 font-mono text-[11px] text-muted">
        fallback: {family.fallback}
      </p>
    </div>
  );
}
