import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Typography — ${brand.name}` };

export default function TypographyPage() {
  const { sans, scale } = brand.typography;

  return (
    <>
      <SectionHeader
        eyebrow="03 · Typography"
        title="Type system."
        description="One family. Inter, set in the Apple-style system stack as a fallback. Clear, direct, functional."
      />

      {/* Family */}
      <section className="mb-14">
        <div className="rounded-xl border border-line bg-bg p-8">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Sans</p>
            <p className="font-mono text-[11px] text-muted">
              {sans.weights.join(' · ')}
            </p>
          </div>
          <p className="mt-6 text-[72px] font-semibold leading-none tracking-[-0.035em] text-ink">
            {sans.family}
          </p>
          <p className="mt-4 max-w-2xl text-[18px] leading-[1.5] text-ink/80">
            The quick brown fox jumps over the lazy dog. Built with patience.
          </p>
          <p className="mt-6 text-[13.5px] text-muted">{sans.usage}</p>
          <p className="mt-1 font-mono text-[11.5px] text-muted/80">
            fallback: {sans.fallback}
          </p>
        </div>
      </section>

      {/* Scale */}
      <section className="mb-14">
        <h2 className="mb-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">Scale</h2>
        <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-bg">
          {scale.map((step) => (
            <div key={step.name} className="flex items-baseline gap-6 px-6 py-5">
              <div className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                {step.name}
              </div>
              <div
                className="flex-1 truncate text-ink"
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

      {/* Sample */}
      <section>
        <h2 className="mb-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">In context</h2>
        <div className="rounded-xl border border-line bg-panel p-8 md:p-12">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-primary">Sample</p>
          <h3 className="text-[34px] font-semibold leading-[1.15] tracking-[-0.025em] text-ink md:text-[40px]">
            We believe the most durable things are made slowly, from good materials,
            by people who care what happens after the handoff.
          </h3>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
            That belief shows up everywhere — from how we write a product description to
            the way a button animates under a cursor. This page is a record of the small
            decisions that, taken together, form the brand.
          </p>
        </div>
      </section>
    </>
  );
}
