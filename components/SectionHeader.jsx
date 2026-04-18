export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <header className="mb-12 border-b border-line pb-10 pt-10">
      {eyebrow && (
        <p className="mb-3 font-mono text-[12px] text-muted">{eyebrow}</p>
      )}
      <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-[17px] leading-[1.5] text-muted">
          {description}
        </p>
      )}
    </header>
  );
}
