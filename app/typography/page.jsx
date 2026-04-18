import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Typography — ${brand.name}` };

export default function TypographyPage() {
  const { display, sans, scale } = brand.typography;

  const families = [
    { role: 'Display', token: 'display', font: display, className: 'font-display', sample: 'Ship something worth keeping.' },
    { role: 'Body',    token: 'sans',    font: sans,    className: 'font-sans',    sample: 'The quick brown fox jumps over the lazy dog. Built with patience.' },
  ];

  return (
    <>
      <SectionHeader
        eyebrow="Typography"
        title="Type system."
        description={`Two families working together. ${display.family} sets the tone in display. ${sans.family} carries the reading load.`}
      />

      {/* Families */}
      <section className="mb-20 space-y-16">
        {families.map(({ role, font, className, sample }) => (
          <div key={role}>
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-medium text-muted">{role}</p>
              <p className="text-[16px] text-muted">
                {font.weights.join(' · ')}
              </p>
            </div>
            <p
              className={`mt-6 text-[72px] leading-none tracking-[-0.035em] text-ink ${className}`}
              style={{ fontWeight: font.defaultWeight }}
            >
              {font.family}
            </p>
            <p className={`mt-4 max-w-2xl text-[18px] leading-[1.5] text-ink/80 ${className}`}>
              {sample}
            </p>
            <p className="mt-6 text-[16px] text-muted">{font.usage}</p>
            <p className="mt-1 text-[16px] text-muted/80">
              default: {font.family} {font.defaultWeight}
            </p>
            <p className="mt-1 text-[16px] text-muted/80">
              fallback: {font.fallback}
            </p>
          </div>
        ))}
      </section>

      {/* Scale */}
      <section className="mb-14">
        <h2 className="mb-4 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Scale</h2>
        <div>
          {scale.map((step) => (
            <div key={step.name} className="flex items-baseline gap-6 py-5">
              <div className="w-24 shrink-0 text-[16px] text-muted">
                {step.name}
              </div>
              <div
                className={`flex-1 truncate text-ink ${step.family === 'display' ? 'font-display' : 'font-sans'}`}
                style={{
                  fontSize: step.size,
                  lineHeight: step.line,
                  letterSpacing: step.tracking,
                  fontWeight: step.weight,
                }}
              >
                The quick brown fox
              </div>
              <div className="hidden shrink-0 text-right text-[16px] text-muted md:block">
                <span className="text-ink">{sizeInPx(step.size)}</span>
                <span className="block text-muted/80">
                  {step.size} / {step.line}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample */}
      <section>
        <h2 className="mb-6 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">In context</h2>
        <p className="mb-2 text-[16px] font-medium text-primary">Sample</p>
        <h3 className="font-display text-[34px] font-medium leading-[1.15] tracking-[-0.025em] text-ink md:text-[40px]">
          We believe the most durable things are made slowly, from good materials,
          by people who care what happens after the handoff.
        </h3>
        <p className="mt-5 max-w-2xl font-sans text-[16px] leading-[1.55] text-muted">
          That belief shows up everywhere — from how we write a product description to
          the way a button animates under a cursor. This page is a record of the small
          decisions that, taken together, form the brand.
        </p>
      </section>
    </>
  );
}

function sizeInPx(size) {
  const rem = size.match(/^([\d.]+)rem$/);
  if (rem) return `${Math.round(parseFloat(rem[1]) * 16)}px`;
  const clamp = size.match(/clamp\(\s*([\d.]+)rem\s*,\s*[^,]+,\s*([\d.]+)rem\s*\)/);
  if (clamp) {
    return `${Math.round(parseFloat(clamp[1]) * 16)}–${Math.round(parseFloat(clamp[2]) * 16)}px`;
  }
  return size;
}
