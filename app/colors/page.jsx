import Poster from '@/components/Poster';
import ColorSwatch from '@/components/ColorSwatch';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Color — ${brand.name}` };

export default function ColorsPage() {
  const tokens = Object.entries(brand.colors);

  return (
    <>
      <Poster
        eyebrow="02 — Color"
        headline={
          <>
            Color is a<br />
            commitment.
          </>
        }
        subcopy="Eight tokens. Each with one job. Every swatch shows its light and dark value side by side — click any to copy it."
        mark={<PosterTile />}
      />

      <section className="grid grid-cols-12 gap-x-6 gap-y-14 border-t border-line pt-14 md:gap-y-16 md:pt-20">
        {tokens.map(([token, color]) => (
          <div key={token} className="col-span-12 sm:col-span-6 lg:col-span-3">
            <ColorSwatch token={token} color={color} />
          </div>
        ))}
      </section>

      <section className="grid grid-cols-12 border-t border-line py-14 md:py-20">
        <header className="col-span-12 mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-[14px] font-medium uppercase tracking-[0.12em] text-muted">
            Reference
          </h2>
          <p className="font-mono text-[11px] text-muted">{tokens.length} tokens</p>
        </header>

        <div className="col-span-12 overflow-x-auto">
          <table className="w-full text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-line">
                <th className="py-3 pr-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted">Token</th>
                <th className="py-3 pr-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted">Name</th>
                <th className="py-3 pr-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted">Light</th>
                <th className="py-3 pr-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted">Dark</th>
                <th className="py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted">Usage</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(([token, color]) => (
                <tr key={token} className="border-b border-line/70">
                  <td className="py-4 pr-5 font-mono text-[12px] text-ink">{token}</td>
                  <td className="py-4 pr-5 font-display font-medium text-ink">{color.name}</td>
                  <td className="py-4 pr-5 font-mono text-[12px] text-muted">{color.hex}</td>
                  <td className="py-4 pr-5 font-mono text-[12px] text-muted">{color.dark}</td>
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

function PosterTile() {
  return (
    <div aria-hidden className="flex h-24 w-24 md:h-32 md:w-32">
      <div className="flex-1 bg-ink" />
      <div className="flex-1 border border-l-0 border-line bg-bg" />
    </div>
  );
}
