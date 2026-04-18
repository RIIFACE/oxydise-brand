import CopyButton from './CopyButton';

// Tokens whose swatches are near-white — they get a hairline so they
// don't vanish into the page.
const NEAR_WHITE = new Set(['bg', 'panel', 'surface', 'line', 'sky']);

export default function ColorSwatch({ token, color }) {
  const needsBorder = NEAR_WHITE.has(token);
  const flips = color.hex !== color.dark;

  return (
    <article className="flex flex-col">
      <div className="flex aspect-[4/3] w-full overflow-hidden rounded-[20px]">
        {flips ? (
          <>
            <div
              className={`flex-1 ${needsBorder ? 'border border-line' : ''}`}
              style={{ backgroundColor: color.hex }}
            />
            <div
              className="flex-1 border border-l-0 border-line/60"
              style={{ backgroundColor: color.dark }}
            />
          </>
        ) : (
          <div
            className={`flex-1 ${needsBorder ? 'border border-line' : ''}`}
            style={{ backgroundColor: color.hex }}
          />
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <p className="font-display text-[17px] font-medium tracking-tight text-ink">
            {color.name}
          </p>
          <p className="mt-0.5 text-[16px] text-muted">{token}</p>
        </div>
        <CopyButton value={color.hex} label={color.hex} />
      </div>

      <p className="mt-2 text-[16px] leading-[1.5] text-muted">{color.usage}</p>

      {flips ? (
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[16px] text-muted/80">
          <div className="flex justify-between">
            <dt className="text-muted/60">Light</dt>
            <dd>{color.hex}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted/60">Dark</dt>
            <dd>{color.dark}</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-3 text-[16px] text-muted/80">
          {color.hex} · rgb({color.rgb.split(' ').join(', ')})
        </p>
      )}
    </article>
  );
}
