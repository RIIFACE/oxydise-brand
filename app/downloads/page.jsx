import Poster from '@/components/Poster';
import { brand } from '@/lib/brand.config';
import { listFolder, folderUrl } from '@/lib/drive/server';
import FolderBrowser from '@/components/FolderBrowser';

export const metadata = { title: `Downloads — ${brand.name}` };
export const revalidate = 30;

export default async function DownloadsPage({ searchParams }) {
  const rootId = process.env.GOOGLE_DRIVE_FOLDER_PUBLIC;
  const folderId = (searchParams?.folder && String(searchParams.folder)) || rootId;

  const result = rootId
    ? await listFolder(folderId, { mode: 'public' })
    : { ok: false, error: 'GOOGLE_DRIVE_FOLDER_PUBLIC is not set — see DRIVE-SETUP.md.', files: [] };

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

      {!result.ok ? (
        <EmptyState title="Downloads aren't configured yet." body={result.error} />
      ) : result.files.length === 0 ? (
        <EmptyState
          title="Nothing to download yet."
          body={
            <>
              Check back soon — or contact us at{' '}
              <a href="mailto:hello@oxydise.co.uk" className="text-primary hover:underline">
                hello@oxydise.co.uk
              </a>
              .
            </>
          }
        />
      ) : (
        <FolderBrowser
          rootId={rootId}
          currentId={folderId}
          files={result.files}
          basePath="/downloads"
          mode="public"
        />
      )}

      <p className="mb-24 max-w-2xl text-[16px] leading-[1.55] text-muted md:mb-32">
        Internal teams can embed these assets directly in any doc by linking to{' '}
        <code className="rounded bg-surface px-1.5 py-0.5 text-[16px] text-ink">
          https://{brand.domain}/downloads
        </code>
        . External partners with sign-in access can also use the{' '}
        <a href="/portal" className="text-primary hover:underline">portal</a>.
      </p>

      {rootId && (
        <p className="mb-24 text-[14px] text-muted">
          <a href={folderUrl(rootId)} target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">
            View source folder in Google Drive ↗
          </a>
        </p>
      )}
    </>
  );
}

function EmptyState({ title, body }) {
  return (
    <section className="mb-24">
      <div className="rounded-[20px] bg-panel p-10 text-center">
        <p className="font-display text-[20px] font-medium text-ink">{title}</p>
        <p className="mt-2 text-[15px] text-muted">{body}</p>
      </div>
    </section>
  );
}
