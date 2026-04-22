'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CATEGORIES, categoryLabel } from '@/lib/portal/groupFiles';
import FilePreview from './FilePreview';

export default function DashboardClient({ files, isAdmin }) {
  const hasInternal = files.some((f) => f.client?.is_internal);
  const [section, setSection] = useState(hasInternal ? 'internal' : 'client');
  const [category, setCategory] = useState('all');

  const sectionFiles = useMemo(
    () => files.filter((f) => (section === 'internal' ? f.client?.is_internal : !f.client?.is_internal)),
    [files, section],
  );

  const visibleFiles = useMemo(
    () => (category === 'all' ? sectionFiles : sectionFiles.filter((f) => f.category === category)),
    [sectionFiles, category],
  );

  const counts = useMemo(() => {
    const c = { all: sectionFiles.length };
    for (const cat of CATEGORIES) c[cat.value] = 0;
    for (const f of sectionFiles) {
      if (c[f.category] != null) c[f.category] += 1;
    }
    return c;
  }, [sectionFiles]);

  const availableCategories = CATEGORIES.filter((c) => counts[c.value] > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
      <aside className="lg:sticky lg:top-8 lg:self-start">
        {hasInternal && (
          <div className="mb-8">
            <p className="mb-3 text-[11px] uppercase tracking-[0.1em] text-muted">Section</p>
            <div className="flex gap-2 lg:flex-col">
              <SectionButton active={section === 'internal'} onClick={() => { setSection('internal'); setCategory('all'); }}>
                Internal
              </SectionButton>
              <SectionButton active={section === 'client'} onClick={() => { setSection('client'); setCategory('all'); }}>
                Client files
              </SectionButton>
            </div>
          </div>
        )}

        <p className="mb-3 text-[11px] uppercase tracking-[0.1em] text-muted">Browse</p>
        <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          <NavItem active={category === 'all'} onClick={() => setCategory('all')} count={counts.all}>
            All files
          </NavItem>
          {availableCategories.map((c) => (
            <NavItem
              key={c.value}
              active={category === c.value}
              onClick={() => setCategory(c.value)}
              count={counts[c.value]}
            >
              {c.label}
            </NavItem>
          ))}
        </nav>

        {isAdmin && (
          <div className="mt-10">
            <Link
              href="/portal/admin"
              className="inline-flex h-10 w-full items-center justify-center rounded-full bg-ink px-5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
            >
              Open admin
            </Link>
          </div>
        )}
      </aside>

      <section>
        <header className="mb-8">
          <p className="text-[13px] uppercase tracking-[0.08em] text-muted">
            {section === 'internal' ? 'Team only' : 'For your brand'}
          </p>
          <h1 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
            {category === 'all'
              ? section === 'internal' ? 'Internal files' : 'Your brand assets'
              : categoryLabel(category)}
          </h1>
          <p className="mt-2 text-[15px] text-muted">
            {visibleFiles.length} {visibleFiles.length === 1 ? 'file' : 'files'}
          </p>
        </header>

        {visibleFiles.length === 0 ? (
          <div className="rounded-[20px] bg-panel p-10 text-center">
            <p className="font-display text-[20px] font-medium text-ink">Nothing here yet.</p>
            <p className="mt-2 text-[15px] text-muted">
              {isAdmin ? 'Upload something from the admin panel.' : 'Oxydise will add assets here as soon as they’re ready.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleFiles.map((f) => (
              <FileCard key={f.id} file={f} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FileCard({ file }) {
  return (
    <a
      href={`/api/portal/download/${file.id}`}
      className="group block overflow-hidden rounded-[20px] bg-panel transition-colors hover:bg-surface"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <FilePreview file={file} />
      </div>
      <div className="flex items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="truncate font-display text-[16px] font-medium text-ink">{file.display_name}</p>
          <p className="mt-0.5 text-[13px] text-muted">
            {categoryLabel(file.category)} · {formatBytes(file.size_bytes)}
          </p>
        </div>
        <span className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium text-ink transition-colors group-hover:bg-ink group-hover:text-bg" style={{ border: '1.5px solid currentColor' }}>
          Download
          <DownloadIcon />
        </span>
      </div>
    </a>
  );
}

function SectionButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex h-10 items-center rounded-full px-4 text-[14px] font-medium transition-colors ' +
        (active ? 'bg-ink text-bg' : 'bg-panel text-ink hover:bg-surface')
      }
    >
      {children}
    </button>
  );
}

function NavItem({ active, onClick, count, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'flex items-center justify-between gap-4 rounded-full px-4 py-2 text-left text-[14px] transition-colors ' +
        (active ? 'bg-ink text-bg' : 'text-ink hover:bg-panel')
      }
    >
      <span className="truncate">{children}</span>
      <span className={'text-[12px] tabular-nums ' + (active ? 'text-bg/70' : 'text-muted')}>{count}</span>
    </button>
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
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2v9m0 0l-3-3m3 3l3-3M3 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
