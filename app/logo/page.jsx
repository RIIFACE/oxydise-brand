import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Logo — ${brand.name}` };

export default function LogoPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Logo"
        title="The mark."
        description="Our logo is the shortest possible expression of the brand. Use it confidently, and sparingly."
      />

      {/* Primary logotiles */}
      <section className="mb-14">
        <h2 className="mb-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">Primary</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <LogoTile label="On canvas" bg="#FFFFFF" invert />
          <LogoTile label="On ink"    bg="#1D1D1F" />
        </div>
      </section>

      {/* Clear space */}
      <section className="mb-14">
        <h2 className="mb-3 text-[15px] font-semibold tracking-[-0.01em] text-ink">Clear space</h2>
        <p className="mb-5 max-w-2xl text-[14px] leading-[1.55] text-muted">
          Maintain at least the width of the inner dot as clear space on all sides of the mark.
          Nothing lives inside that zone.
        </p>
        <div className="flex items-center justify-center rounded-xl border border-line bg-panel p-12">
          <ClearSpaceDiagram />
        </div>
      </section>

      {/* Misuse */}
      <section className="mb-4">
        <h2 className="mb-3 text-[15px] font-semibold tracking-[-0.01em] text-ink">Misuse</h2>
        <p className="mb-5 max-w-2xl text-[14px] leading-[1.55] text-muted">
          The logo is a system, not a sticker. Don&apos;t recolor, stretch, outline, or rotate.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Don't stretch", transform: 'scale(1.4, 0.8)' },
            { label: "Don't rotate",  transform: 'rotate(15deg)' },
            { label: "Don't recolor", recolor: true },
            { label: "Don't add effects", shadow: true },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-line bg-bg p-5">
              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-panel">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 32 32"
                  style={{
                    transform: m.transform,
                    filter: m.shadow ? 'drop-shadow(0 0 6px rgba(255,106,61,0.6))' : undefined,
                  }}
                >
                  <circle cx="16" cy="16" r="13" stroke={m.recolor ? '#FF00AA' : '#1D1D1F'} strokeWidth="1.5" fill="none" />
                  <circle cx="16" cy="16" r="3"  fill={m.recolor ? '#00DDAA' : '#1D1D1F'} />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent/15 text-[10px] font-semibold text-accent">
                  ×
                </span>
                <p className="text-[13.5px] text-ink">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function LogoTile({ label, bg, invert }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg">
      <div className="flex h-60 items-center justify-center" style={{ backgroundColor: bg }}>
        <WordMark invert={invert} />
      </div>
      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-[12px] text-muted">
        <span>{label}</span>
        <span className="font-mono text-[11px]">Placeholder · /public/logos</span>
      </div>
    </div>
  );
}

function WordMark({ invert }) {
  const color = invert ? '#1D1D1F' : '#FFFFFF';
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.5" />
        <circle cx="16" cy="16" r="3"  fill={color} />
      </svg>
      <span
        className="text-[28px] font-semibold tracking-[-0.025em]"
        style={{ color }}
      >
        Oxydise
      </span>
    </div>
  );
}

function ClearSpaceDiagram() {
  return (
    <svg width="280" height="200" viewBox="0 0 280 200">
      <defs>
        <pattern id="dash" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3h3" stroke="#C7C7CC" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="40" y="30" width="200" height="140" fill="none" stroke="url(#dash)" strokeWidth="1" />
      <g transform="translate(100, 60)">
        <circle cx="40" cy="40" r="36" stroke="#1D1D1F" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="40" r="8"  fill="#1D1D1F" />
      </g>
      <text x="140" y="190" textAnchor="middle" fill="#6E6E73" fontSize="11" fontFamily="ui-monospace, monospace">
        min clear space = inner dot
      </text>
    </svg>
  );
}
