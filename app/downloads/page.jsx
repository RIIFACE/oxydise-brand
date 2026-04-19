import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Downloads — ${brand.name}` };

export default function DownloadsPage() {
  return (
    <>
      <Poster
        eyebrow="Downloads"
        headline={
          <>
            Get the<br />
            <span className="text-muted">kit.</span>
          </>
        }
        subcopy="Everything you need to put Oxydise out in the world. Logos, fonts, templates — one click away."
      />

      <section className="mb-10">
        <ul className="space-y-4">
          {brand.downloads.map((d) => (
            <li key={d.href}>
              <a
                href={d.href}
                className="group flex flex-col gap-4 rounded-[20px] bg-panel p-6 transition-colors hover:bg-surface md:flex-row md:items-center md:justify-between md:gap-6 md:p-8"
              >
                <div className="min-w-0">
                  <p className="font-display text-[20px] font-medium text-ink md:text-[22px]">
                    {d.name}
                  </p>
                  <p className="mt-1 break-all text-[16px] leading-[1.5] text-muted md:truncate">
                    {d.href} · {d.note}
                  </p>
                </div>
                <span
                  className="inline-flex h-11 w-fit shrink-0 items-center gap-2 rounded-full bg-transparent px-6 text-[16px] font-medium text-ink transition-colors group-hover:bg-ink group-hover:text-bg"
                  style={{ border: '1.5px solid currentColor' }}
                >
                  Download
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mb-24 max-w-2xl text-[16px] leading-[1.55] text-muted md:mb-32">
        Internal teams can embed these assets directly in any doc by linking to{' '}
        <code className="rounded bg-surface px-1.5 py-0.5 text-[16px] text-ink">
          https://{brand.domain}/downloads
        </code>
        . External partners should request updated files through{' '}
        <a href="mailto:hello@oxydise.co.uk" className="text-primary hover:underline">
          hello@oxydise.co.uk
        </a>
        .
      </p>
    </>
  );
}
