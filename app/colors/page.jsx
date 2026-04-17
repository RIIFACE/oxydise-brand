import SectionHeader from '@/components/SectionHeader';
import ColorSwatch from '@/components/ColorSwatch';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Colors — ${brand.name}` };

export default function ColorsPage() {
  const tokens = Object.entries(brand.colors);

  return (
    <>
      <SectionHeader
        eyebrow="02 · Colors"
        title="The palette."
        description="Eight tokens, each with a specific job. Click any value to copy it."
      />

      <section className="mb-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokens.map(([token, color]) => (
            <ColorSwatch key={token} token={token} color={color} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">Usage</h2>
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-[13.5px]">
            <thead className="bg-panel">
              <tr>
                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Token</th>
                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Name</th>
                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Hex</th>
                <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">Usage</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(([token, color]) => (
                <tr key={token} className="border-t border-line">
                  <td className="px-5 py-3 font-mono text-[12px] text-ink">{token}</td>
                  <td className="px-5 py-3 text-ink">{color.name}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-muted">{color.hex}</td>
                  <td className="px-5 py-3 text-muted">{color.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
