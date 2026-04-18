/**
 * Visible 12-column construction grid, fixed to the viewport.
 * Mirrors the content grid math (max-w-[1440px], px-6 mobile / px-10 desktop)
 * so any element using col-start-N / col-span-M inside the main container
 * lines up exactly with these lines.
 */
export default function GridOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 print:hidden">
      <div className="mx-auto flex h-full max-w-[1440px] px-6 md:px-10">
        <div className="grid h-full w-full grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`border-l border-line/40 ${i === 11 ? 'border-r' : ''} ${i % 2 === 1 ? 'hidden sm:block' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
