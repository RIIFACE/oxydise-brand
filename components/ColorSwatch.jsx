import CopyButton from './CopyButton';

// Tokens whose swatches are light — needs a visible border so they don't
// vanish into the page.
const LIGHT_SWATCHES = new Set(['bg', 'panel', 'surface', 'line']);

export default function ColorSwatch({ token, color }) {
  const isLight = LIGHT_SWATCHES.has(token);
  return (
    <div className="group overflow-hidden rounded-xl border border-line bg-bg">
      <div
        className={`flex h-28 items-end p-4 ${isLight ? 'border-b border-line' : ''}`}
        style={{ backgroundColor: color.hex }}
      />
      <div className="space-y-3 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{color.name}</p>
            <p className="mt-0.5 font-mono text-[11px] text-muted">{token}</p>
          </div>
          <span className="font-mono text-[11px] text-muted">{color.hex}</span>
        </div>
        <p className="text-[12.5px] leading-[1.45] text-muted">{color.usage}</p>
        <div className="flex flex-wrap gap-1.5">
          <CopyButton value={color.hex} label={color.hex} />
          <CopyButton value={`rgb(${color.rgb.split(' ').join(', ')})`} label={`rgb`} />
        </div>
      </div>
    </div>
  );
}
