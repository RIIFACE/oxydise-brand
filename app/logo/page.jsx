import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Logo — ${brand.name}` };

const tiles = [
  { label: 'Colour on canvas',  src: '/logos/oxydise-colour.svg', bg: '#FFFFFF' },
  { label: 'Black on canvas',   src: '/logos/oxydise-black.svg',  bg: '#FFFFFF' },
  { label: 'White on black',    src: '/logos/oxydise-white.svg',  bg: '#000000' },
  { label: 'White on Signal',   src: '/logos/oxydise-white.svg',  bg: '#00AAFF' },
];

const misuses = [
  { label: "Don't stretch",     transform: 'scaleX(1.6) scaleY(0.7)' },
  { label: "Don't rotate",      transform: 'rotate(14deg)' },
  { label: "Don't recolor",     filter: 'hue-rotate(120deg) saturate(1.4)' },
  { label: "Don't add effects", filter: 'drop-shadow(0 0 10px rgba(0,170,255,0.9))' },
];

export default function LogoPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Logo"
        title="The mark."
        description="Our logo is the shortest possible expression of the brand. Use it confidently, and sparingly."
      />

      <section className="mb-14">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Primary</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          Use the colour version on white only. On any dark or blue surface — including
          black, navy, or Signal — use the white version. Never place the colour logo on
          a coloured background.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {tiles.map((t) => (
            <LogoTile key={t.label} {...t} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Clear space</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          Keep at least the height of the wordmark as clear space on every side. Nothing lives
          inside that zone — not type, not edges, not other marks.
        </p>
        <div className="flex items-center justify-center rounded-xl bg-panel p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/oxydise-black.svg"
            alt=""
            aria-hidden
            className="block h-16 w-auto dark:hidden"
            style={{ padding: '4rem 6rem', outline: '1px dashed #C7C7CC', outlineOffset: '0px' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/oxydise-white.svg"
            alt=""
            aria-hidden
            className="hidden h-16 w-auto dark:block"
            style={{ padding: '4rem 6rem', outline: '1px dashed #48484A', outlineOffset: '0px' }}
          />
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Misuse</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          The logo is a system, not a sticker. Don&apos;t recolor, stretch, outline, or rotate.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {misuses.map((m) => (
            <div key={m.label} className="rounded-xl bg-panel p-5">
              <div className="mb-4 flex h-28 items-center justify-center overflow-hidden rounded-lg bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/oxydise-colour.svg"
                  alt=""
                  aria-hidden
                  className="h-8 w-auto"
                  style={{ transform: m.transform, filter: m.filter }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-[16px] font-semibold text-accent">
                  ×
                </span>
                <p className="text-[16px] text-ink">{m.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function LogoTile({ label, src, bg }) {
  const isDark = isDarkHex(bg);
  return (
    <div className="overflow-hidden rounded-xl">
      <div
        className="flex h-60 items-center justify-center px-10"
        style={{ backgroundColor: bg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" aria-hidden className="h-12 w-auto md:h-14" />
      </div>
      <div className="flex items-center justify-between px-1 pt-3 text-[16px] text-muted">
        <span>{label}</span>
        <span>{bg.toUpperCase()}</span>
      </div>
    </div>
  );
}

function isDarkHex(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
