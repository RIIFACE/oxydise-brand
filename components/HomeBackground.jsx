/**
 * Faint blueprint-sketchbook background for the homepage cover.
 * Two grids drift slowly in opposite directions; a thin construction circle
 * breathes in the corner. Respects prefers-reduced-motion.
 */
export default function HomeBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Fine grid */}
      <div
        className="absolute inset-0 motion-safe:animate-blueprint-fine"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(0 170 255 / 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(0 170 255 / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Coarse grid */}
      <div
        className="absolute inset-0 motion-safe:animate-blueprint-coarse"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(0 170 255 / 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(0 170 255 / 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '192px 192px',
        }}
      />
      {/* Construction marks */}
      <svg
        className="absolute right-[6%] top-[18%] h-40 w-40 text-primary/20 motion-safe:animate-blueprint-breathe md:h-64 md:w-64"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.4" />
        <path d="M2 50h96M50 2v96" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" />
      </svg>
      <svg
        className="absolute left-[4%] bottom-[22%] h-24 w-24 text-primary/15 motion-safe:animate-blueprint-breathe-slow md:h-40 md:w-40"
        viewBox="0 0 100 100"
        fill="none"
      >
        <rect x="6" y="6" width="88" height="88" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" />
        <path d="M6 6l88 88M94 6L6 94" stroke="currentColor" strokeWidth="0.3" />
      </svg>
    </div>
  );
}
