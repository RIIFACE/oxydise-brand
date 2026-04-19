import Link from 'next/link';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function PortalDashboard() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Role check: is this user an admin on any client?
  const { data: adminRows } = await supabase
    .from('client_member')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .limit(1);
  const isAdmin = (adminRows?.length ?? 0) > 0;

  const { data: files } = await supabase
    .from('file')
    .select('id, display_name, size_bytes, mime_type, uploaded_at, client_id, client:client_id(name, slug)')
    .order('uploaded_at', { ascending: false });

  return (
    <>
      <header className="mb-12">
        <p className="text-[16px] text-muted">Your files</p>
        <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1] tracking-[-0.03em] text-ink">
          Everything we&apos;ve shared,<br />
          <span className="text-muted">in one place.</span>
        </h1>
      </header>

      {isAdmin && (
        <div className="mb-10">
          <Link
            href="/portal/admin"
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            Open admin
          </Link>
        </div>
      )}

      {files?.length ? (
        <ul className="space-y-4">
          {files.map((f) => (
            <li key={f.id}>
              <a
                href={`/api/portal/download/${f.id}`}
                className="group flex flex-col gap-4 rounded-[20px] bg-panel p-6 transition-colors hover:bg-surface md:flex-row md:items-center md:justify-between md:p-8"
              >
                <div className="min-w-0">
                  <p className="font-display text-[20px] font-medium text-ink md:text-[22px]">{f.display_name}</p>
                  <p className="mt-1 text-[14px] text-muted">
                    {f.client?.name ?? 'Shared'} · {formatBytes(f.size_bytes)} · {new Date(f.uploaded_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
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
      ) : (
        <div className="rounded-[20px] bg-panel p-10 text-center">
          <p className="font-display text-[22px] font-medium text-ink">No files yet.</p>
          <p className="mt-2 text-[16px] text-muted">Oxydise will add assets here as soon as they&apos;re ready.</p>
        </div>
      )}
    </>
  );
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
