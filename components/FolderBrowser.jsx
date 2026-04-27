// Server component — renders a Drive folder's contents as a grid of
// folders + files. Navigation is via ?folder=<id> query params so the
// page is fully cacheable and shareable.
//
// Used by /downloads (public), /portal (private), /portal/admin (private).

import Link from 'next/link';
import { folderUrl } from '@/lib/drive/server';

export default function FolderBrowser({ rootId, currentId, files, basePath, mode = 'private' }) {
  const folders = files.filter((f) => f.isFolder);
  const docs = files.filter((f) => !f.isFolder);
  const isAtRoot = !currentId || currentId === rootId;
  const sep = basePath.includes('?') ? '&' : '?';
  const folderHref = (id) => `${basePath}${sep}folder=${id}`;

  return (
    <section className="mb-16 space-y-10">
      {/* Breadcrumb / nav row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="text-[14px] text-muted">
          {isAtRoot ? (
            <span className="text-ink">All files</span>
          ) : (
            <>
              <Link href={basePath} className="hover:text-ink">All files</Link>
              <span className="mx-2 text-muted/60">/</span>
              <span className="text-ink">In this folder</span>
            </>
          )}
        </nav>
        <div className="flex items-center gap-3 text-[14px] text-muted">
          <span>
            {folders.length} {folders.length === 1 ? 'folder' : 'folders'} ·{' '}
            {docs.length} {docs.length === 1 ? 'file' : 'files'}
          </span>
          {currentId && (
            <a
              href={folderUrl(currentId)}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink hover:underline"
            >
              Open in Drive ↗
            </a>
          )}
        </div>
      </div>

      {folders.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-[16px] font-medium tracking-[-0.01em] text-muted">Folders</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {folders.map((f) => (
              <li key={f.id}>
                <Link
                  href={folderHref(f.id)}
                  className="flex items-center gap-4 rounded-[20px] bg-panel p-6 transition-colors hover:bg-surface"
                >
                  <FolderIcon />
                  <span className="min-w-0 truncate font-display text-[18px] font-medium text-ink">
                    {f.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {docs.length > 0 && (
        <div>
          <h2 className="mb-4 font-display text-[16px] font-medium tracking-[-0.01em] text-muted">Files</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((f) => (
              <li key={f.id}>
                <FileCard file={f} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {folders.length === 0 && docs.length === 0 && (
        <div className="rounded-[20px] bg-panel p-10 text-center">
          <p className="font-display text-[18px] font-medium text-ink">This folder is empty.</p>
          <p className="mt-2 text-[15px] text-muted">Drop files into it in Drive and they'll appear here.</p>
        </div>
      )}
    </section>
  );
}

function FileCard({ file }) {
  const isImage = file.mimeType?.startsWith('image/') ?? false;

  return (
    <article className="overflow-hidden rounded-[20px] bg-panel transition-colors hover:bg-surface">
      <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface">
        {file.thumbnailLink ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={file.thumbnailLink}
            alt=""
            referrerPolicy="no-referrer"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <FileIcon mime={file.mimeType} />
        )}
      </div>
      <div className="p-5">
        <p className="truncate font-display text-[18px] font-medium text-ink" title={file.name}>
          {file.name}
        </p>
        <p className="mt-1 text-[13px] text-muted">
          {labelForMime(file.mimeType)}
          {file.size != null && <> · {formatBytes(file.size)}</>}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <a
            href={file.downloadUrl}
            download={file.name}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
          >
            Download
          </a>
          {isImage && (
            <a
              href={file.previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-[14px] font-medium text-muted transition-colors hover:border-ink/30 hover:text-ink"
            >
              Preview
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function FolderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-muted">
      <path
        d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FileIcon({ mime }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted/60">
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function labelForMime(mime) {
  if (!mime) return 'File';
  if (mime.startsWith('image/')) return mime.slice(6).toUpperCase();
  if (mime.startsWith('video/')) return 'Video';
  if (mime.startsWith('audio/')) return 'Audio';
  if (mime === 'application/pdf') return 'PDF';
  if (mime.includes('font')) return 'Font';
  if (mime.includes('zip')) return 'ZIP';
  const slash = mime.lastIndexOf('/');
  return slash >= 0 ? mime.slice(slash + 1).toUpperCase() : mime;
}

function formatBytes(n) {
  if (n == null) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
