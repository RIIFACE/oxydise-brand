import Poster from '@/components/Poster';
import ColorSwatch from '@/components/ColorSwatch';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Colour — ${brand.name}` };

export default function ColorsPage() {
  const tokens = Object.entries(brand.colors);
  const brandTokens   = tokens.filter(([, c]) => c.role === 'brand');
  const surfaceTokens = tokens.filter(([, c]) => c.role === 'surface');

  return (
    <>
      <Poster
        eyebrow="Colour"
        headline={
          <>
            Five brand colours.<br />
            <span className="text-muted">Six surface tokens.</span>
          </>
        }
        subcopy="Brand colours are constants. Surfaces flip between light and dark. Every swatch is copyable."
        mark={<PosterTile />}
      />

      <ColorGroup
        title="Brand"
        count={brandTokens.length}
        tokens={brandTokens}
      />

      <ColorGroup
        title="Surfaces"
        count={surfaceTokens.length}
        tokens={surfaceTokens}
      />

      <section className="grid grid-cols-12 py-14 md:py-20">
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
                <th className="py-3 pr-5 text-[16px] font-medium text-muted">Role</th>
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
                  <td className="py-4 pr-5 text-[16px] text-muted">{color.role}</td>
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

function ColorGroup({ title, count, tokens }) {
  return (
    <section className="grid grid-cols-12 pt-10 md:pt-14">
      <header className="col-span-12 mb-8 flex items-baseline justify-between md:mb-10">
        <h2 className="font-display text-[18px] font-medium tracking-tight text-ink">
          {title}
        </h2>
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
