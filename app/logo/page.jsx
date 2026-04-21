import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Logo — ${brand.name}` };

const tiles = [
  { label: 'Black on canvas',   src: '/logos/oxydise-black.svg',  bg: '#FFFFFF' },
  { label: 'White on black',    src: '/logos/oxydise-white.svg',  bg: '#000000' },
  { label: 'White on Signal',   src: '/logos/oxydise-white.svg',  bg: '#00AAFF' },
];

const misuses = [
  { label: "Don't stretch",     transform: 'scaleX(1.6) scaleY(0.7)' },
  { label: "Don't rotate",      transform: 'rotate(14deg)' },
  { label: "Don't recolour",    filter: 'brightness(0.4) sepia(1) saturate(8) hue-rotate(280deg)' },
  { label: "Don't add effects", filter: 'drop-shadow(0 0 10px rgba(0,170,255,0.9))' },
];

const mediaTiles = [
  {
    label: 'On dark imagery',
    caption: 'White logo, centred. Always white over photography.',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80&auto=format&fit=crop',
    logo: 'white',
    aspect: '4 / 3',
    anchor: 'items-center justify-center',
    padding: 'p-6 md:p-8',
  },
  {
    label: 'On light imagery',
    caption: 'Still white — even on bright scenes. Never black over a photo.',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80&auto=format&fit=crop',
    logo: 'white',
    aspect: '4 / 3',
    anchor: 'items-center justify-center',
    padding: 'p-6 md:p-8',
  },
  {
    label: 'Video / motion',
    caption: 'White, centred, with a subtle recording indicator.',
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80&auto=format&fit=crop',
    logo: 'white',
    aspect: '16 / 9',
    anchor: 'items-center justify-center',
    padding: 'p-6 md:p-10',
    video: true,
  },
  {
    label: 'Social / square',
    caption: 'Halo on navy for profile avatars, Instagram, LinkedIn.',
    bgStyle: 'radial-gradient(120% 120% at 0% 0%, #1a1f5c 0%, #001540 45%, #00081c 100%)',
    logo: 'halo-black',
    invertLogo: true,
    logoClass: 'h-[240px] w-[240px] md:h-[336px] md:w-[336px]',
    aspect: '1 / 1',
    anchor: 'items-center justify-center',
    padding: 'p-6',
  },
];

const mediaMisuses = [
  {
    label: "Don't skip clear space",
    caption: 'Pushed against an edge, the mark loses presence.',
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1400&q=80&auto=format&fit=crop',
    logo: 'white',
    aspect: '4 / 3',
    anchor: 'items-end justify-end',
    padding: 'p-0',
  },
  {
    label: "Don't use the black version on imagery",
    caption: 'Over any photo, it should always be the white version.',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80&auto=format&fit=crop',
    logo: 'black',
    aspect: '4 / 3',
    anchor: 'items-center justify-center',
    padding: 'p-6 md:p-8',
  },
];

export default function LogoPage() {
  return (
    <>
      <Poster
        eyebrow="Logo"
        headline={
          <>
            One mark,<br />
            <span className="text-muted">many forms.</span>
          </>
        }
        subcopy="The shortest expression of the brand. Use it confidently, sparingly, and always with enough air around it."
      />

      <section className="mb-14">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Primary</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          Mono only. Black on light. White on dark or any coloured surface. That&apos;s the
          whole system — no colour version.
        </p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t) => (
            <LogoTile key={t.label} {...t} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Halo</h2>
        <p className="mb-3 max-w-2xl text-[18px] font-medium text-ink">
          Only use the halo when space doesn&apos;t allow the full lockup.
        </p>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          Avatars, favicons, app icons, loading states, tight UI — nowhere else. The
          wordmark is always preferred when it fits. Same rule as the lockup: black on light,
          white on dark or coloured.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <HaloTile label="Black on canvas"   variant="black"  bg="#FFFFFF" />
          <HaloTile label="White on navy"     variant="white"  bg="#001540" />
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Over media</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          Over photography and video, the mark is always white and always centred — no
          exceptions, regardless of whether the scene is dark or bright. Never use the black
          version on imagery. Keep generous clear space so the mark breathes.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {mediaTiles.map((t) => (
            <MediaTile key={t.label} {...t} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Over media — misuse</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          A few common mistakes that break the rule above. Contrast, version and clear space
          matter as much on a photo as they do on a flat surface.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mediaMisuses.map((t) => (
            <MediaTile key={t.label} {...t} misuse />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-[16px] font-medium tracking-[-0.01em] text-ink">Clear space</h2>
        <p className="mb-5 max-w-2xl text-[16px] leading-[1.55] text-muted">
          Keep at least the height of the wordmark as clear space on every side. Nothing lives
          inside that zone — not type, not edges, not other marks.
        </p>
        <div className="flex items-center justify-center rounded-[20px] bg-panel p-10 md:p-16">
          <div
            className="flex items-center justify-center px-12 py-12 md:px-20 md:py-16"
            style={{ outline: '1px dashed rgb(var(--color-line))' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/oxydise-black.svg"
              alt=""
              aria-hidden
              className="block h-12 w-auto md:h-16 dark:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/oxydise-white.svg"
              alt=""
              aria-hidden
              className="hidden h-12 w-auto md:h-16 dark:block"
            />
          </div>
        </div>
      </section>

      <section className="mb-24 md:mb-32">
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
                  src="/logos/oxydise-black.svg"
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

function HaloTile({ label, variant, bg }) {
  const src = '/logos/oxydise-halo-black.svg';
  const style =
    variant === 'white' ? { filter: 'brightness(0) invert(1)' } :
    { filter: 'brightness(0)' };
  return (
    <div>
      <div
        className="flex aspect-square items-center justify-center rounded-[20px] p-6"
        style={{ backgroundColor: bg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" aria-hidden className="h-40 w-40 md:h-56 md:w-56" style={style} />
      </div>
      <div className="mt-3 flex items-center justify-between text-[16px] text-muted">
        <span>{label}</span>
        <span>{bg.toUpperCase()}</span>
      </div>
    </div>
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

function MediaTile({ label, caption, src, bgStyle, logo, aspect, anchor, padding, video, misuse, invertLogo, logoClass }) {
  return (
    <div>
      <div
        className="relative overflow-hidden rounded-[20px] bg-surface"
        style={{ aspectRatio: aspect, background: bgStyle }}
      >
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <div className={`absolute inset-0 flex ${anchor} ${padding}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/oxydise-${logo}.svg`}
            alt=""
            aria-hidden
            className={logoClass || 'h-[48px] w-auto md:h-[60px]'}
            style={invertLogo ? { filter: 'brightness(0) invert(1)' } : undefined}
          />
        </div>
        {video && (
          <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[13px] font-medium text-white backdrop-blur">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-[#E5484D]" />
            Video
          </div>
        )}
        {misuse && (
          <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-[#E5484D] px-3 py-1 text-[13px] font-medium text-white">
            <span aria-hidden className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/20">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            Don&apos;t
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
