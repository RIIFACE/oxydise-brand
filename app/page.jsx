import { brand } from '@/lib/brand.config';

export default function HomePage() {
  const date = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <section className="relative flex h-[calc(100vh-4rem)] flex-col overflow-hidden py-8 md:py-12">
      <header className="flex items-center justify-between font-mono text-[12px] text-muted">
        <span className="flex items-center gap-2.5">
          <Mark />
          <span>Brand guidelines</span>
        </span>
        <span>v1.0 · {date}</span>
      </header>

      <div className="grid flex-1 grid-cols-12 items-center">
        <h1
          className="col-span-12 font-display font-medium text-ink md:col-span-11"
          style={{
            fontSize: 'clamp(2.75rem, 10vw, 8.5rem)',
            lineHeight: '0.95',
            letterSpacing: '-0.04em',
          }}
        >
          The {brand.name}<br />
          brand, <span className="text-muted">documented.</span>
        </h1>
      </div>

      <footer className="grid grid-cols-12 items-end gap-6">
        <p className="col-span-12 max-w-md text-[16px] leading-[1.55] text-muted md:col-span-6">
          {brand.tagline} A living reference for anyone building, writing, or designing with us.
        </p>
        <p className="col-span-12 font-mono text-[12px] text-muted md:col-span-5 md:col-start-8 md:text-right">
          {brand.domain}
        </p>
      </footer>
    </section>
  );
}

function Mark() {
  return (
    <span aria-hidden className="flex h-5 w-5 items-center justify-center rounded-full border border-muted/70 text-muted">
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2" fill="currentColor" />
      </svg>
    </span>
  );
}
