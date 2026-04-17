import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Logo — ${brand.name}` };

export default function LogoPage() {
  return (
    <>
      <SectionHeader
        eyebrow="01 Logo"
        title="The mark."
        description="Our logo is the shortest possible expression of the brand. Use it confidently, and sparingly."
      />

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-4 lg:grid-cols-2">
          <LogoTile label="Primary · on charcoal" bg="#0E0D0C" />
          <LogoTile label="Primary · on parchment" bg="#F3EBDD" invert />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="mb-4 font-display text-2xl">Clear space</h2>
        <p className="mb-6 max-w-2xl text-muted">
          Maintain at least the width of the inner ring as clear space on all sides of the mark.
          Nothing lives inside that zone.
        </p>
        <div className="flex items-center justify-center rounded-xl border border-border bg-surface p-12">
          <ClearSpaceDiagram />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-4 font-display text-2xl">Misuse</h2>
        <p className="mb-6 max-w-2xl text-muted">
          The logo is a system, not a sticker. Don't recolor, stretch, outline, or rotate.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Don\'t stretch',     transform: 'scale(1.4, 0.8)' },
            { label: 'Don\'t rotate',      transform: 'rotate(20deg)' },
            { label: 'Don\'t recolor',     recolor: true },
            { label: 'Don\'t add effects', shadow: true },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-surface p-6">
              <div className="mb-3 flex h-24 items-center justify-center">
                <svg width="56" height="56" viewBox="0 0 32 32" style={{ transform: m.transform, filter: m.shadow ? 'drop-shadow(0 0 8px #C24A1E)' : undefined }}>
                  <circle cx="16" cy="16" r="14" stroke={m.recolor ? '#FF00AA' : '#C24A1E'} strokeWidth="1.5" fill="none" />
                  <circle cx="16" cy="16" r="8"  stroke={m.recolor ? '#00FF88' : '#4FA69C'} strokeWidth="1.5" fill="none" />
                  <circle cx="16" cy="16" r="2"  fill={m.recolor ? '#FFFF00' : '#F3EBDD'} />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-bg">×</span>
                <p className="text-sm">{m.label}</p>
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
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex h-64 items-center justify-center" style={{ backgroundColor: bg }}>
        <WordMark invert={invert} />
      </div>
      <div className="flex items-center justify-between px-5 py-3 text-xs text-muted">
        <span>{label}</span>
        <span className="font-mono">Placeholder · swap in /public/logos</span>
      </div>
    </div>
  );
}

function WordMark({ invert }) {
  const text = invert ? '#0E0D0C' : '#F3EBDD';
  return (
    <div className="flex items-center gap-3">
      <svg width="44" height="44" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="14" stroke="#C24A1E" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="8"  stroke="#4FA69C" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2"  fill={text} />
      </svg>
      <span className="font-display text-3xl tracking-tight" style={{ color: text }}>
        Oxydise
      </span>
    </div>
  );
}

function ClearSpaceDiagram() {
  return (
    <svg width="260" height="180" viewBox="0 0 260 180">
      <defs>
        <pattern id="dash" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3h3" stroke="#4FA69C" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="30" y="20" width="200" height="140" fill="none" stroke="url(#dash)" strokeWidth="1" />
      <g transform="translate(90, 50)">
        <circle cx="40" cy="40" r="38" stroke="#C24A1E" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="40" r="22" stroke="#4FA69C" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="40" r="5"  fill="#F3EBDD" />
      </g>
      <text x="130" y="175" textAnchor="middle" fill="#9C9288" fontSize="10" fontFamily="monospace">
        min clear space = inner ring
      </text>
    </svg>
  );
}
