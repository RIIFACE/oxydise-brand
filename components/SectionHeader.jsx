export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
      {eyebrow && (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-5xl tracking-tightest md:text-6xl">{title}</h1>
      {description && (
        <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
      )}
    </div>
  );
}
