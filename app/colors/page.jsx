import SectionHeader from '@/components/SectionHeader';
import ColorSwatch from '@/components/ColorSwatch';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Colors — ${brand.name}` };

export default function ColorsPage() {
  const tokens = Object.entries(brand.colors);

  return (
    <>
      <SectionHeader
        eyebrow="02 Colors"
        title="The palette."
        description="Seven tokens, each with a specific job. Click any value to copy it."
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokens.map(([token, color]) => (
            <ColorSwatch key={token} token={token} color={color} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-4 font-display text-2xl">Usage</h2>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted">Token</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted">Name</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted">Hex</th>
                <th className="px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted">Usage</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(([token, color]) => (
                <tr key={token} className="border-t border-border">
                  <td className="px-5 py-3 font-mono text-xs text-primary">{token}</td>
                  <td className="px-5 py-3">{color.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted">{color.hex}</td>
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
