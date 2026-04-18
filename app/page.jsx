import { brand } from '@/lib/brand.config';

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100dvh-4rem)] flex-col py-8 md:py-12">
      <div className="flex flex-1 items-center">
        <h1
          className="font-display font-medium text-ink"
          style={{
            fontSize: 'clamp(2.25rem, 10vw, 8.5rem)',
            lineHeight: '0.95',
            letterSpacing: '-0.04em',
          }}
        >
          The {brand.name}<br />
          brand, <span className="text-muted">documented.</span>
        </h1>
      </div>

      <p className="mt-10 max-w-md text-[16px] leading-[1.55] text-muted md:max-w-xl">
        {brand.tagline} A living reference for anyone building, writing, or designing with us.
      </p>
    </section>
  );
}
