import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';
import { getSupabaseAdminClient } from '@/lib/supabase/server';
import { CATEGORIES, categoryLabel } from '@/lib/portal/groupFiles';

export const metadata = { title: `Downloads — ${brand.name}` };
export const dynamic = 'force-dynamic';

const PUBLIC_BUCKET = 'brand-downloads';

export default async function DownloadsPage() {
  const admin = getSupabaseAdminClient();

  const { data: brandClient } = await admin
    .from('client')
    .select('id')
    .eq('slug', PUBLIC_BUCKET)
    .maybeSingle();

  const { data: files } = brandClient
    ? await admin
        .from('file')
        .select('id, display_name, size_bytes, category, storage_path, uploaded_at')
        .eq('client_id', brandClient.id)
        .order('uploaded_at', { ascending: false })
    : { data: [] };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const enriched = (files ?? []).map((f) => ({
    ...f,
    publicUrl: `${supabaseUrl}/storage/v1/object/public/${PUBLIC_BUCKET}/${f.storage_path}`,
  }));

  const grouped = groupByCategory(enriched);

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
        subcopy="Everything you need to put Oxydise out in the world. Logos, fonts, brochures — one click away."
      />

      {enriched.length === 0 ? (
        <section className="mb-24">
          <div className="rounded-[20px] bg-panel p-10 text-center">
            <p className="font-display text-[20px] font-medium text-ink">Nothing to download yet.</p>
            <p className="mt-2 text-[15px] text-muted">
              Check back soon — or contact us at{' '}
              <a href="mailto:hello@oxydise.co.uk" className="text-primary hover:underline">hello@oxydise.co.uk</a>.
            </p>
          </div>
        </section>
      ) : (
        <section className="mb-16 space-y-12">
          {grouped.map((group) => (
            <div key={group.value}>
              <h2 className="mb-4 font-display text-[18px] font-medium tracking-[-0.01em] text-ink">{group.label}</h2>
              <ul className="space-y-4">
                {group.files.map((f) => (
                  <li key={f.id}>
                    <a
                      href={f.publicUrl}
                      download={f.display_name}
                      className="group flex flex-col gap-4 rounded-[20px] bg-panel p-6 transition-colors hover:bg-surface md:flex-row md:items-center md:justify-between md:gap-6 md:p-8"
                    >
                      <div className="min-w-0">
                        <p className="font-display text-[20px] font-medium text-ink md:text-[22px]">{f.display_name}</p>
                        <p className="mt-1 text-[14px] text-muted">
                          {categoryLabel(f.category)} · {formatBytes(f.size_bytes)}
                        </p>
                      </div>
                      <span
                        className="inline-flex h-11 w-fit shrink-0 items-center gap-2 rounded-full bg-transparent px-6 text-[16px] font-medium text-ink transition-colors group-hover:bg-ink group-hover:text-bg"
                        style={{ border: '1.5px solid currentColor' }}
                      >
                        Download
                        <DownloadIcon />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <p className="mb-24 max-w-2xl text-[16px] leading-[1.55] text-muted md:mb-32">
        Internal teams can embed these assets directly in any doc by linking to{' '}
        <code className="rounded bg-surface px-1.5 py-0.5 text-[16px] text-ink">https://{brand.domain}/downloads</code>.
        External partners with sign-in access can also use the{' '}
        <a href="/portal" className="text-primary hover:underline">portal</a>.
      </p>
    </>
  );
}

function groupByCategory(files) {
  const buckets = new Map(CATEGORIES.map((c) => [c.value, []]));
  for (const f of files) {
    const key = buckets.has(f.category) ? f.category : 'other';
    buckets.get(key).push(f);
  }
  return CATEGORIES
    .map((c) => ({ value: c.value, label: c.label, files: buckets.get(c.value) }))
    .filter((g) => g.files.length > 0);
}

function formatBytes(n) {
  if (n == null) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
