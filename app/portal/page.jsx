import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { listFolder, folderUrl } from '@/lib/drive/server';
import FolderBrowser from '@/components/FolderBrowser';

export const dynamic = 'force-dynamic';

const SECTION_FOLDER_ENV = {
  client: 'GOOGLE_DRIVE_FOLDER_CLIENTS',
  internal: 'GOOGLE_DRIVE_FOLDER_INTERNAL',
};

export default async function PortalDashboard({ searchParams }) {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: memberships } = await supabase
    .from('client_member')
    .select('role, client:client_id(slug, is_internal)')
    .eq('user_id', user.id);

  const isAdmin = (memberships ?? []).some((m) => m.role === 'admin');
  const hasInternal =
    isAdmin || (memberships ?? []).some((m) => m.client?.is_internal);

  const requestedSection = String(searchParams?.section ?? '');
  const section =
    requestedSection === 'internal' && hasInternal ? 'internal' : 'client';

  const rootId = process.env[SECTION_FOLDER_ENV[section]];
  const folderId = (searchParams?.folder && String(searchParams.folder)) || rootId;

  const result = rootId
    ? await listFolder(folderId, { mode: 'private' })
    : { ok: false, error: `${SECTION_FOLDER_ENV[section]} is not set — see DRIVE-SETUP.md.`, files: [] };

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-16">
      <aside className="lg:sticky lg:top-8 lg:self-start">
        {hasInternal && (
          <div className="mb-8">
            <p className="mb-3 text-[11px] tracking-[0.1em] text-muted">Section</p>
            <div className="flex gap-2 lg:flex-col">
              <SectionLink active={section === 'client'} href="/portal?section=client" label="Client files" />
              <SectionLink active={section === 'internal'} href="/portal?section=internal" label="Internal" />
            </div>
          </div>
        )}

        {isAdmin && (
          <Link
            href="/portal/admin"
            className="inline-flex h-9 items-center rounded-full border border-line px-4 text-[14px] font-medium text-muted transition-colors hover:border-ink/30 hover:text-ink"
          >
            Admin →
          </Link>
        )}
      </aside>

      <main>
        <header className="mb-8">
          <h1 className="font-display text-[28px] font-medium tracking-[-0.02em] text-ink md:text-[34px]">
            {section === 'internal' ? 'Internal' : 'Your brand assets'}
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] text-muted">
            {section === 'internal'
              ? 'Files for the Oxydise team. Manage them in Drive — changes appear here on next refresh.'
              : 'Logos, brochures, fonts and more. Pick a folder to browse, or open the source folder in Drive.'}
          </p>
        </header>

        {!result.ok ? (
          <EmptyState title="This section isn't configured yet." body={result.error} />
        ) : result.files.length === 0 ? (
          <EmptyState
            title="Nothing here yet."
            body={
              rootId ? (
                <>
                  Drop files into the source folder and they'll appear here.{' '}
                  <a href={folderUrl(rootId)} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    Open in Drive ↗
                  </a>
                </>
              ) : (
                'No source folder configured.'
              )
            }
          />
        ) : (
          <FolderBrowser
            rootId={rootId}
            currentId={folderId}
            files={result.files}
            basePath={`/portal?section=${section}`}
            mode="private"
          />
        )}
      </main>
    </div>
  );
}

function SectionLink({ href, active, label }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-10 items-center rounded-full px-4 text-[14px] font-medium transition-colors ${
        active
          ? 'bg-ink text-bg'
          : 'border border-line text-muted hover:border-ink/30 hover:text-ink'
      }`}
    >
      {label}
    </Link>
  );
}

function EmptyState({ title, body }) {
  return (
    <div className="rounded-[20px] bg-panel p-10 text-center">
      <p className="font-display text-[20px] font-medium text-ink">{title}</p>
      <p className="mt-2 text-[15px] text-muted">{body}</p>
    </div>
  );
}
