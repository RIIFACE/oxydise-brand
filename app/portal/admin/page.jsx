import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { listFolder, folderUrl } from '@/lib/drive/server';
import FolderBrowser from '@/components/FolderBrowser';
import UsersPanel from './UsersPanel';
import AccessPanel from './AccessPanel';
import {
  listPortalUsers,
  listAllowedEmails,
  listAccessRequests,
} from './_actions';

export const dynamic = 'force-dynamic';

const TABS = [
  { value: 'public',   label: 'Public',   env: 'GOOGLE_DRIVE_FOLDER_PUBLIC',   mode: 'public' },
  { value: 'internal', label: 'Internal', env: 'GOOGLE_DRIVE_FOLDER_INTERNAL', mode: 'private' },
  { value: 'clients',  label: 'Clients',  env: 'GOOGLE_DRIVE_FOLDER_CLIENTS',  mode: 'private' },
  { value: 'users',    label: 'Users' },
  { value: 'access',   label: 'Access' },
];

export default async function AdminPage({ searchParams }) {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: roleRows } = await supabase
    .from('client_member')
    .select('role')
    .eq('user_id', user.id)
    .in('role', ['manager', 'admin']);
  let callerRole = null;
  for (const r of roleRows ?? []) {
    if (r.role === 'admin') { callerRole = 'admin'; break; }
    if (r.role === 'manager') callerRole = 'manager';
  }
  if (!callerRole) redirect('/portal');

  const requestedTab = String(searchParams?.tab ?? 'public');
  const tab = TABS.find((t) => t.value === requestedTab) ? requestedTab : 'public';

  return (
    <>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[16px] text-muted">
            Admin
            {callerRole === 'manager' && (
              <span className="ml-2 inline-flex h-5 items-center rounded-full bg-surface px-2 text-[11px] font-medium text-ink">
                Manager
              </span>
            )}
          </p>
          <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
            Drop files in Drive,<br />
            <span className="text-muted">they appear here.</span>
          </h1>
        </div>
        <Link
          href="/portal"
          className="inline-flex h-10 items-center rounded-full px-5 text-[14px] font-medium text-ink transition-colors hover:bg-panel"
          style={{ border: '1.5px solid currentColor' }}
        >
          ← Back to portal
        </Link>
      </header>

      <nav className="mb-8 flex w-fit gap-2 rounded-full bg-panel p-1">
        {TABS.map((t) => (
          <Link
            key={t.value}
            href={`/portal/admin?tab=${t.value}`}
            className={
              'inline-flex h-9 items-center rounded-full px-5 text-[14px] font-medium transition-colors ' +
              (tab === t.value ? 'bg-ink text-bg' : 'text-ink hover:bg-surface')
            }
          >
            {t.label}
          </Link>
        ))}
      </nav>

      {tab === 'access' ? (
        <AccessTab />
      ) : tab === 'users' ? (
        <UsersTab currentUserId={user.id} callerRole={callerRole} />
      ) : (
        <DriveTab tab={tab} searchParams={searchParams} />
      )}
    </>
  );
}

async function UsersTab({ currentUserId, callerRole }) {
  const result = await listPortalUsers();
  if (!result.ok) {
    return (
      <div className="rounded-[20px] bg-panel p-10 text-center">
        <p className="font-display text-[20px] font-medium text-ink">Couldn’t load users.</p>
        <p className="mt-2 text-[15px] text-muted">{result.error}</p>
      </div>
    );
  }
  return <UsersPanel users={result.users} currentUserId={currentUserId} callerRole={callerRole} />;
}

async function AccessTab() {
  const [allowed, requests] = await Promise.all([listAllowedEmails(), listAccessRequests()]);
  return (
    <AccessPanel
      allowedEmails={allowed.ok ? allowed.emails : []}
      accessRequests={requests.ok ? requests.requests : []}
    />
  );
}

async function DriveTab({ tab, searchParams }) {
  const def = TABS.find((t) => t.value === tab);
  const rootId = process.env[def.env];
  const folderId = (searchParams?.folder && String(searchParams.folder)) || rootId;

  const result = rootId
    ? await listFolder(folderId, { mode: def.mode })
    : { ok: false, error: `${def.env} is not set — see DRIVE-SETUP.md.`, files: [] };

  if (!result.ok) {
    return (
      <div className="rounded-[20px] bg-panel p-10 text-center">
        <p className="font-display text-[20px] font-medium text-ink">Folder not configured.</p>
        <p className="mt-2 text-[15px] text-muted">{result.error}</p>
      </div>
    );
  }

  if (result.files.length === 0) {
    return (
      <div className="rounded-[20px] bg-panel p-10 text-center">
        <p className="font-display text-[20px] font-medium text-ink">This folder is empty.</p>
        <p className="mt-2 text-[15px] text-muted">
          Drop files into the source folder in Drive and they&apos;ll appear here.{' '}
          {rootId && (
            <a href={folderUrl(rootId)} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              Open in Drive ↗
            </a>
          )}
        </p>
      </div>
    );
  }

  return (
    <FolderBrowser
      rootId={rootId}
      currentId={folderId}
      files={result.files}
      basePath={`/portal/admin?tab=${tab}`}
      mode={def.mode}
    />
  );
}
