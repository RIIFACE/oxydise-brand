import Poster from '@/components/Poster';
import ColorSwatch from '@/components/ColorSwatch';
import CopyButton from '@/components/CopyButton';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Colour — ${brand.name}` };

export default function ColorsPage() {
  const tokens = Object.entries(brand.colors);
  const surfaceTokens = tokens.filter(([, c]) => c.role === 'surface');
  const primary    = tokens.find(([, c]) => c.tier === 'primary');
  const secondary  = tokens.find(([, c]) => c.tier === 'secondary');

  return (
    <>
      <Poster
        eyebrow="Colour"
        headline={
          <>
            Signal leads.<br />
            <span className="text-muted">Deep Navy anchors.</span>
          </>
        }
        subcopy="One primary, one secondary. Signal carries emphasis; Deep Navy carries depth."
        mark={<PosterTile />}
      />

      {/* Primary + Secondary — hero pair */}
      <section className="grid grid-cols-12 gap-6 pt-10 md:pt-14">
        <header className="col-span-12 mb-4 md:mb-6">
          <h2 className="font-display text-[18px] font-medium tracking-tight text-ink">
            Brand
          </h2>
          <p className="mt-1 text-[16px] text-muted">Primary and secondary carry the identity.</p>
        </header>

        <HeroSwatch label="Primary"   token={primary[0]}   color={primary[1]} />
        <HeroSwatch label="Secondary" token={secondary[0]} color={secondary[1]} />
      </section>

      {/* Surfaces */}
      <ColorGroup
        title="Surfaces"
        subtitle="System tokens — flip between light and dark."
        count={surfaceTokens.length}
        tokens={surfaceTokens}
      />

      {/* Reference */}
      <section className="grid grid-cols-12 py-14 pb-24 md:py-20 md:pb-32">
        <header className="col-span-12 mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-[16px] font-medium tracking-tight text-ink">
            Reference
          </h2>
          <p className="text-[16px] text-muted">{tokens.length} tokens</p>
        </header>

        <div className="col-span-12 overflow-x-auto">
          <table className="w-full text-left text-[16px]">
            <thead>
              <tr>
                <th className="py-3 pr-5 text-[16px] font-medium text-muted">Token</th>
                <th className="py-3 pr-5 text-[16px] font-medium text-muted">Name</th>
                <th className="py-3 pr-5 text-[16px] font-medium text-muted">Tier</th>
                <th className="py-3 pr-5 text-[16px] font-medium text-muted">Light</th>
                <th className="py-3 pr-5 text-[16px] font-medium text-muted">Dark</th>
                <th className="py-3 text-[16px] font-medium text-muted">Usage</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(([token, color]) => (
                <tr key={token}>
                  <td className="py-4 pr-5 text-[16px] text-ink">{token}</td>
                  <td className="py-4 pr-5 font-display font-medium text-ink">{color.name}</td>
                  <td className="py-4 pr-5 text-[16px] text-muted">{color.tier ?? color.role}</td>
                  <td className="py-4 pr-5 text-[16px] text-muted">{color.hex}</td>
                  <td className="py-4 pr-5 text-[16px] text-muted">{color.dark}</td>
                  <td className="py-4 text-muted">{color.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function HeroSwatch({ label, token, color }) {
  const needsBorder = ['sky', 'panel', 'bg', 'surface', 'line'].includes(token);
  return (
    <article className="col-span-12 md:col-span-6">
      <div
        className={`flex aspect-[4/3] w-full overflow-hidden rounded-[20px] ${needsBorder ? 'border border-line' : ''}`}
        style={{ backgroundColor: color.hex }}
      />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-primary">{label}</p>
          <p className="mt-1 font-display text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-[32px]">
            {color.name}
          </p>
          <p className="mt-2 max-w-sm text-[16px] leading-[1.55] text-muted">
            {color.usage}
          </p>
        </div>
        <CopyButton value={color.hex} label={color.hex} />
      </div>
      <p className="mt-4 text-[16px] text-muted/80">
        {color.hex} · rgb({color.rgb.split(' ').join(', ')})
      </p>
    </article>
  );
}

function ColorGroup({ title, subtitle, count, tokens }) {
  return (
    <section className="grid grid-cols-12 pt-10 md:pt-14">
      <header className="col-span-12 mb-8 flex items-baseline justify-between md:mb-10">
        <div>
          <h2 className="font-display text-[18px] font-medium tracking-tight text-ink">{title}</h2>
          {subtitle && <p className="mt-1 text-[16px] text-muted">{subtitle}</p>}
        </div>
        <p className="text-[16px] text-muted">
          {count} {count === 1 ? 'token' : 'tokens'}
        </p>
      </header>

      <div className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-14 pb-14 md:gap-y-16 md:pb-20">
        {tokens.map(([token, color]) => (
          <div key={token} className="col-span-12 sm:col-span-6 lg:col-span-3">
            <ColorSwatch token={token} color={color} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PosterTile() {
  return (
    <div aria-hidden className="flex h-24 w-24 overflow-hidden rounded-[20px] md:h-32 md:w-32">
      <div className="flex-1 bg-primary" />
      <div className="flex-1 bg-navy" />
    </div>
  );
}
