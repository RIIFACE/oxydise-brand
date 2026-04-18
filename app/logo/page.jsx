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
  { label: "Don't recolour",     filter: 'hue-rotate(120deg) saturate(1.4)' },
  { label: "Don't add effects", filter: 'drop-shadow(0 0 10px rgba(0,170,255,0.9))' },
];

const mediaTiles = [
  {
    label: 'On dark imagery',
    caption: 'White version. Anchor bottom-left with generous clear space.',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80&auto=format&fit=crop',
    logo: 'white',
    aspect: '4 / 3',
    anchor: 'items-end justify-start',
    padding: 'p-6 md:p-8',
  },
  {
    label: 'On light imagery',
    caption: 'Black version only when the scene is clean and bright.',
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80&auto=format&fit=crop',
    logo: 'black',
    aspect: '4 / 3',
    anchor: 'items-start justify-end',
    padding: 'p-6 md:p-8',
  },
  {
    label: 'Video / motion',
    caption: 'Hold for the full duration, bottom-left, with subtle play indicator.',
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80&auto=format&fit=crop',
    logo: 'white',
    aspect: '16 / 9',
    anchor: 'items-end justify-start',
    padding: 'p-6 md:p-10',
    video: true,
  },
  {
    label: 'Social / square',
    caption: 'Centered on square formats (Instagram, LinkedIn).',
    src: 'https://images.unsplash.com/photo-1557682233-43e671455dfa?w=1200&q=80&auto=format&fit=crop',
    logo: 'white',
    aspect: '1 / 1',
    anchor: 'items-center justify-center',
    padding: 'p-6',
  },
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
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Over media</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          When the logo sits on a photo or video, contrast is everything. Default to the
          white version on busy or dark imagery. Use the black version only on bright,
          uncluttered scenes. Keep clear space — the logo is never pushed against an edge.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {mediaTiles.map((t) => (
            <MediaTile key={t.label} {...t} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Clear space</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          Keep at least the height of the wordmark as clear space on every side. Nothing lives
          inside that zone — not type, not edges, not other marks.
        </p>
        <div className="flex items-center justify-center rounded-[20px] bg-panel p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/oxydise-black.svg"
            alt=""
            aria-hidden
            className="block h-16 w-auto dark:hidden"
            style={{ padding: '4rem 6rem', outline: '1px dashed rgb(var(--color-line))' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/oxydise-white.svg"
            alt=""
            aria-hidden
            className="hidden h-16 w-auto dark:block"
            style={{ padding: '4rem 6rem', outline: '1px dashed rgb(var(--color-line))' }}
          />
        </div>
      </section>

      <section className="mb-4">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Misuse</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          The logo is a system, not a sticker. Don&apos;t recolour, stretch, outline, or rotate.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {misuses.map((m) => (
            <div key={m.label} className="rounded-[20px] bg-panel p-6">
              <div className="flex h-28 items-center justify-center overflow-hidden rounded-[14px] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/oxydise-colour.svg"
                  alt=""
                  aria-hidden
                  className="h-8 w-auto"
                  style={{ transform: m.transform, filter: m.filter }}
                />
              </div>
              <p className="mt-4 text-[16px] text-ink">{m.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function LogoTile({ label, src, bg }) {
  return (
    <div>
      <div
        className="flex h-60 items-center justify-center rounded-[20px] px-10"
        style={{ backgroundColor: bg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" aria-hidden className="h-12 w-auto md:h-14" />
      </div>
      <div className="mt-3 flex items-center justify-between text-[16px] text-muted">
        <span>{label}</span>
        <span>{bg.toUpperCase()}</span>
      </div>
    </div>
  );
}

function MediaTile({ label, caption, src, logo, aspect, anchor, padding, video }) {
  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-[20px] bg-surface`}
        style={{ aspectRatio: aspect }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className={`absolute inset-0 flex ${anchor} ${padding}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/oxydise-${logo}.svg`}
            alt=""
            aria-hidden
            className="h-6 w-auto md:h-8"
          />
        </div>
        {video && (
          <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[13px] font-medium text-white backdrop-blur">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-[#E5484D]" />
            Video
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-[16px] text-ink">{label}</p>
        <p className="mt-0.5 max-w-md text-[16px] text-muted">{caption}</p>
      </div>
    </div>
  );
}
