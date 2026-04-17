import CopyButton from './CopyButton';

export default function ColorSwatch({ token, color }) {
  const isLight = ['text'].includes(token);
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-surface">
      <div
        className="flex h-40 items-end p-4"
        style={{ backgroundColor: color.hex }}
      >
        <span
          className={`font-mono text-[11px] uppercase tracking-widest ${
            isLight ? 'text-bg' : 'text-text/80'
          }`}
        >
          {token}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="font-display text-lg">{color.name}</p>
          <p className="text-xs text-muted">{color.usage}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton value={color.hex} label={color.hex} />
          <CopyButton value={`rgb(${color.rgb.split(' ').join(', ')})`} label={`rgb ${color.rgb}`} />
        </div>
      </div>
    </div>
  );
}
