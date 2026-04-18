import { brand } from '@/lib/brand.config';
import RotatingWord from '@/components/RotatingWord';

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-8 md:min-h-dvh md:py-12">
      <h1
        className="font-display font-medium text-ink"
        style={{
          fontSize: 'clamp(2.25rem, 10vw, 8.5rem)',
          lineHeight: '0.95',
          letterSpacing: '-0.04em',
        }}
      >
        {brand.name} brand,<br />
        <RotatingWord className="text-muted" />
      </h1>

      <p className="mt-6 max-w-md text-[16px] leading-[1.55] text-muted md:mt-8 md:max-w-xl md:text-[18px]">
        {brand.tagline} A living reference for anyone building, writing, or designing with us.
      </p>
    </section>
  );
}
