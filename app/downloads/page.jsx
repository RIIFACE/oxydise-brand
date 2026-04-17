import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Downloads — ${brand.name}` };

export default function DownloadsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="06 Downloads"
        title="Assets."
        description="Drop the real files into /public with matching paths, and these links light up."
      />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="overflow-hidden rounded-xl border border-border">
          {brand.downloads.map((d, i) => (
            <a
              key={d.href}
              href={d.href}
              className={`flex items-center justify-between gap-4 bg-surface px-6 py-5 transition-colors hover:bg-surface/70 ${
                i === 0 ? '' : 'border-t border-border'
              }`}
            >
              <div>
                <p className="font-display text-xl">{d.name}</p>
                <p className="mt-0.5 font-mono text-[11px] text-muted">
                  {d.href} · {d.note}
                </p>
              </div>
              <span className="flex h-9 items-center gap-2 rounded-md border border-border bg-bg px-3 text-sm text-text">
                Download
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted">
          Internal teams can embed these assets directly in any doc by linking to{' '}
          <code className="font-mono text-primary">https://{brand.domain}/downloads</code>.
          External partners should request updated files through brand@oxydise.com.
        </p>
      </section>
    </>
  );
}
