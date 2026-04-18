/**
 * Near-viewport-height hero composition anchored to the 12-col grid.
 * Content below the fold lives in a separate grid container on the page.
 */
export default function Poster({ eyebrow, headline, subcopy, mark }) {
  return (
    <section className="relative grid min-h-[calc(100vh-4rem)] grid-cols-12 grid-rows-[auto_1fr_auto] gap-y-8 py-10 md:py-16">
      {eyebrow && (
        <p className="col-span-12 row-start-1 text-[16px] text-muted">
          {eyebrow}
        </p>
      )}

      <h1
        className="col-span-12 row-start-2 self-center font-display font-medium text-ink md:col-span-11"
        style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: '0.95', letterSpacing: '-0.04em' }}
      >
        {headline}
      </h1>

      {subcopy && (
        <p className="col-span-12 row-start-3 self-end text-[16px] leading-[1.55] text-muted md:col-span-6 lg:col-span-5">
          {subcopy}
        </p>
      )}

      {mark && (
        <div className="col-span-12 row-start-3 self-end md:col-span-3 md:col-start-10 md:justify-self-end">
          {mark}
        </div>
      )}
    </section>
  );
}
