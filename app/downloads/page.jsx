import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Downloads — ${brand.name}` };

export default function DownloadsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Downloads"
        title="Assets."
        description="Drop the real files into /public with matching paths, and these links light up."
      />

      <section className="mb-10">
        <div>
          {brand.downloads.map((d) => (
            <a
              key={d.href}
              href={d.href}
              className="flex items-center justify-between gap-4 px-0 py-5 transition-colors hover:text-ink"
            >
              <div className="min-w-0">
                <p className="font-display text-[20px] font-medium text-ink">{d.name}</p>
                <p className="mt-0.5 truncate font-mono text-[11.5px] text-muted">
                  {d.href} · {d.note}
                </p>
              </div>
              <span className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-line bg-bg px-4 text-[16px] text-ink">
                Download
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      <p className="max-w-2xl text-[16px] leading-[1.55] text-muted">
        Internal teams can embed these assets directly in any doc by linking to{' '}
        <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12px] text-ink">
          https://{brand.domain}/downloads
        </code>
        . External partners should request updated files through{' '}
        <a href="mailto:brand@oxydise.com" className="text-primary hover:underline">
          brand@oxydise.com
        </a>
        .
      </p>
    </>
  );
}
