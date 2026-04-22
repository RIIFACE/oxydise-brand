'use client';

import Link from 'next/link';
import { useRef, useState, useTransition } from 'react';
import { inviteMember, uploadFile, deleteFile } from './_actions';
import { CATEGORIES, categoryLabel } from '@/lib/portal/groupFiles';

const TABS = [
  { value: 'upload', label: 'Upload' },
  { value: 'invite', label: 'Invite' },
  { value: 'files', label: 'All files' },
];

export default function AdminPanel({ files }) {
  const [tab, setTab] = useState('upload');

  return (
    <>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[16px] text-muted">Admin</p>
          <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
            Upload, share,<br />
            <span className="text-muted">organise.</span>
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

      <div className="mb-8 flex gap-2 rounded-full bg-panel p-1 w-fit">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            className={
              'inline-flex h-9 items-center rounded-full px-5 text-[14px] font-medium transition-colors ' +
              (tab === t.value ? 'bg-ink text-bg' : 'text-ink hover:bg-surface')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'upload' && <UploadTab />}
      {tab === 'invite' && <InviteTab />}
      {tab === 'files' && <FilesTab files={files} />}
    </>
  );
}

// ---------- Upload tab ----------

function UploadTab() {
  const [audience, setAudience] = useState('client');
  const [category, setCategory] = useState('logo');
  const [queue, setQueue] = useState([]); // [{ id, file, status: 'pending'|'uploading'|'done'|'error', error? }]
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [isPending, startTransition] = useTransition();

  function addFiles(fileList) {
    const next = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: 'pending',
    }));
    if (next.length) setQueue((q) => [...q, ...next]);
  }

  function removeItem(id) {
    setQueue((q) => q.filter((item) => item.id !== id));
  }

  async function uploadAll() {
    startTransition(async () => {
      for (const item of queue) {
        if (item.status === 'done') continue;
        setQueue((q) => q.map((x) => (x.id === item.id ? { ...x, status: 'uploading' } : x)));
        try {
          const fd = new FormData();
          fd.append('audience', audience);
          fd.append('category', category);
          fd.append('file', item.file);
          await uploadFile(fd);
          setQueue((q) => q.map((x) => (x.id === item.id ? { ...x, status: 'done' } : x)));
        } catch (e) {
          setQueue((q) =>
            q.map((x) => (x.id === item.id ? { ...x, status: 'error', error: e.message || 'Upload failed' } : x)),
          );
        }
      }
    });
  }

  const pendingCount = queue.filter((x) => x.status !== 'done').length;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
          className={
            'flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border-2 border-dashed p-10 text-center transition-colors ' +
            (dragOver ? 'border-ink bg-surface' : 'border-line bg-panel hover:bg-surface')
          }
        >
          <UploadIcon />
          <p className="font-display text-[20px] font-medium text-ink">Drop files here</p>
          <p className="text-[14px] text-muted">or click to browse · you can drop multiple</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        {queue.length > 0 && (
          <ul className="mt-6 divide-y divide-line/60 rounded-[20px] bg-panel px-5 py-1">
            {queue.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-[15px] text-ink">{item.file.name}</p>
                  <p className="mt-0.5 text-[12px] text-muted">
                    {formatBytes(item.file.size)} ·{' '}
                    <StatusLabel status={item.status} error={item.error} />
                  </p>
                </div>
                {item.status !== 'uploading' && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-[13px] text-muted hover:text-ink"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <aside className="space-y-6 rounded-[20px] bg-panel p-6 md:p-7">
        <div>
          <p className="mb-3 text-[13px] font-medium text-ink">Audience</p>
          <div className="flex gap-2">
            <AudiencePill active={audience === 'client'} onClick={() => setAudience('client')}>
              Client files
            </AudiencePill>
            <AudiencePill active={audience === 'internal'} onClick={() => setAudience('internal')}>
              Internal
            </AudiencePill>
          </div>
          <p className="mt-2 text-[12px] text-muted">
            {audience === 'client'
              ? 'Visible to all invited external clients.'
              : 'Visible only to the Oxydise team.'}
          </p>
        </div>

        <div>
          <p className="mb-3 text-[13px] font-medium text-ink">Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c.value}
                active={category === c.value}
                onClick={() => setCategory(c.value)}
              >
                {c.label}
              </CategoryChip>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={pendingCount === 0 || isPending}
          onClick={uploadAll}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-ink text-[15px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {isPending
            ? 'Uploading…'
            : pendingCount > 0
              ? `Upload ${pendingCount} file${pendingCount === 1 ? '' : 's'}`
              : 'Nothing to upload'}
        </button>
      </aside>
    </div>
  );
}

function StatusLabel({ status, error }) {
  if (status === 'pending') return <span>Ready</span>;
  if (status === 'uploading') return <span>Uploading…</span>;
  if (status === 'done') return <span className="text-ink">Uploaded</span>;
  if (status === 'error') return <span style={{ color: '#E5484D' }}>Error — {error}</span>;
  return null;
}

// ---------- Invite tab ----------

function InviteTab() {
  const [audience, setAudience] = useState('client');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(fd) {
    setError('');
    setSuccess('');
    fd.set('audience', audience);
    const email = fd.get('email');
    startTransition(async () => {
      try {
        await inviteMember(fd);
        setSuccess(`Invite sent to ${email}.`);
      } catch (e) {
        setError(e.message || 'Could not send invite');
      }
    });
  }

  return (
    <div className="max-w-[520px] rounded-[20px] bg-panel p-6 md:p-8">
      <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] text-ink">Invite someone</h2>
      <p className="mt-1 text-[14px] text-muted">
        They&apos;ll get a magic-link email. Clients see only the shared client files. Internal members see everything.
      </p>

      <form action={handleSubmit} className="mt-6 space-y-5">
        <div>
          <p className="mb-3 text-[13px] font-medium text-ink">Role</p>
          <div className="flex gap-2">
            <AudiencePill active={audience === 'client'} onClick={() => setAudience('client')}>
              External client
            </AudiencePill>
            <AudiencePill active={audience === 'internal'} onClick={() => setAudience('internal')}>
              Oxydise team
            </AudiencePill>
          </div>
        </div>

        <label className="block">
          <span className="mb-2 block text-[13px] font-medium text-ink">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="name@example.com"
            className="h-11 w-full rounded-full border border-line bg-bg px-5 text-[16px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Sending…' : 'Send invite'}
        </button>

        {error && <p className="text-[13px]" style={{ color: '#E5484D' }}>{error}</p>}
        {success && <p className="text-[13px] text-ink">{success}</p>}
      </form>
    </div>
  );
}

// ---------- Files tab ----------

function FilesTab({ files }) {
  const internal = files.filter((f) => f.client?.is_internal);
  const shared = files.filter((f) => !f.client?.is_internal);

  return (
    <div className="space-y-10">
      <FilesBucket title="Internal" subtitle="Team only" files={internal} />
      <FilesBucket title="Client files" subtitle="Visible to all invited clients" files={shared} />
    </div>
  );
}

function FilesBucket({ title, subtitle, files }) {
  const grouped = new Map(CATEGORIES.map((c) => [c.value, []]));
  for (const f of files) {
    const key = grouped.has(f.category) ? f.category : 'other';
    grouped.get(key).push(f);
  }
  const nonEmpty = CATEGORIES.filter((c) => grouped.get(c.value).length > 0);

  return (
    <section>
      <header className="mb-4">
        <p className="text-[12px] uppercase tracking-[0.1em] text-muted">{subtitle}</p>
        <h2 className="mt-1 font-display text-[22px] font-medium tracking-[-0.02em] text-ink">{title}</h2>
      </header>

      {files.length === 0 ? (
        <p className="rounded-[20px] bg-panel p-6 text-[14px] text-muted">No files yet.</p>
      ) : (
        <div className="rounded-[20px] bg-panel px-6 py-6 md:px-8">
          {nonEmpty.map((c, i) => (
            <div key={c.value} className={i > 0 ? 'mt-5' : ''}>
              <p className="mb-2 text-[12px] uppercase tracking-[0.08em] text-muted">{c.label}</p>
              <ul className="divide-y divide-line/60">
                {grouped.get(c.value).map((f) => (
                  <FileRow key={f.id} file={f} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function FileRow({ file }) {
  return (
    <li className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-[15px] text-ink">{file.display_name}</p>
        <p className="mt-0.5 text-[12px] text-muted">
          {categoryLabel(file.category)} · {formatBytes(file.size_bytes)} ·{' '}
          {new Date(file.uploaded_at).toLocaleString('en-GB')}
        </p>
      </div>
      <form action={deleteFile}>
        <input type="hidden" name="fileId" value={file.id} />
        <button
          type="submit"
          className="inline-flex h-8 items-center rounded-full px-3 text-[12px] font-medium transition-colors"
          style={{ color: '#E5484D', border: '1.5px solid currentColor' }}
        >
          Delete
        </button>
      </form>
    </li>
  );
}

// ---------- Shared UI bits ----------

function AudiencePill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium transition-colors ' +
        (active ? 'bg-ink text-bg' : 'bg-bg text-ink hover:bg-surface')
      }
      style={active ? {} : { border: '1.5px solid rgb(229 229 234)' }}
    >
      {children}
    </button>
  );
}

function CategoryChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex h-8 items-center rounded-full px-3 text-[12px] font-medium transition-colors ' +
        (active ? 'bg-ink text-bg' : 'bg-bg text-ink hover:bg-surface')
      }
      style={active ? {} : { border: '1.5px solid rgb(229 229 234)' }}
    >
      {children}
    </button>
  );
}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatBytes(n) {
  if (n == null) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
