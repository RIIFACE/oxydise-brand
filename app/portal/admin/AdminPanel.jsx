'use client';

import { useState } from 'react';
import { createClient, inviteMember, uploadFile, deleteFile } from './_actions';

export default function AdminPanel({ clients, files }) {
  return (
    <>
      <header className="mb-12">
        <p className="text-[16px] text-muted">Admin</p>
        <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1] tracking-[-0.03em] text-ink">
          Manage clients,<br />
          <span className="text-muted">files, access.</span>
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="New client">
          <ServerForm action={createClient}>
            <Field label="Name" name="name" placeholder="Acme Co" required />
            <Field label="Slug" name="slug" placeholder="acme" required hint="Lowercase, used for folder path" />
            <Submit>Create client</Submit>
          </ServerForm>
        </Card>

        <Card title="Invite user to a client">
          <ServerForm action={inviteMember}>
            <Field label="Email" name="email" type="email" placeholder="client@acme.com" required />
            <Select label="Client" name="clientId" options={clients.map((c) => ({ value: c.id, label: c.name }))} required />
            <Select label="Role" name="role" options={[{ value: 'client', label: 'Client' }, { value: 'admin', label: 'Admin' }]} defaultValue="client" />
            <Submit>Send invite</Submit>
          </ServerForm>
        </Card>

        <Card title="Upload file">
          <ServerForm action={uploadFile} encType="multipart/form-data">
            <Select label="Client" name="clientId" options={clients.map((c) => ({ value: c.id, label: c.name }))} required />
            <File label="File" name="file" required />
            <Submit>Upload</Submit>
          </ServerForm>
        </Card>

        <Card title="Clients">
          {clients.length === 0 ? (
            <p className="text-[14px] text-muted">No clients yet.</p>
          ) : (
            <ul className="divide-y divide-line/60">
              {clients.map((c) => (
                <li key={c.id} className="flex items-baseline justify-between py-3">
                  <span className="text-[16px] text-ink">{c.name}</span>
                  <span className="text-[13px] text-muted">{c.slug}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-[18px] font-medium tracking-[-0.01em] text-ink">All files</h2>
        {files.length === 0 ? (
          <p className="text-[14px] text-muted">No files yet.</p>
        ) : (
          <ul className="divide-y divide-line/60 rounded-[20px] bg-panel px-6 py-2 md:px-8">
            {files.map((f) => (
              <li key={f.id} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="truncate text-[16px] text-ink">{f.display_name}</p>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {f.client?.name} · {new Date(f.uploaded_at).toLocaleString('en-GB')}
                  </p>
                </div>
                <form action={deleteFile}>
                  <input type="hidden" name="fileId" value={f.id} />
                  <button
                    type="submit"
                    className="inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium text-[#E5484D] transition-colors hover:bg-[#E5484D]/10"
                    style={{ border: '1.5px solid currentColor' }}
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-[20px] bg-panel p-6 md:p-8">
      <h2 className="mb-5 font-display text-[18px] font-medium tracking-[-0.01em] text-ink">{title}</h2>
      {children}
    </section>
  );
}

function ServerForm({ action, children, encType }) {
  const [error, setError] = useState('');
  async function wrapped(fd) {
    setError('');
    try {
      await action(fd);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    }
  }
  return (
    <form action={wrapped} encType={encType} className="space-y-4">
      {children}
      {error && <p className="text-[13px] text-[#E5484D]">{error}</p>}
    </form>
  );
}

function Field({ label, hint, ...rest }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-medium text-ink">{label}</span>
      <input
        {...rest}
        className="h-11 w-full rounded-full border border-line bg-bg px-5 text-[16px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
      />
      {hint && <span className="mt-1 block text-[12px] text-muted">{hint}</span>}
    </label>
  );
}

function File({ label, ...rest }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-medium text-ink">{label}</span>
      <input
        type="file"
        {...rest}
        className="w-full text-[14px] text-ink file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-[14px] file:font-medium file:text-bg"
      />
    </label>
  );
}

function Select({ label, options, defaultValue, ...rest }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] font-medium text-ink">{label}</span>
      <select
        defaultValue={defaultValue}
        {...rest}
        className="h-11 w-full rounded-full border border-line bg-bg px-5 text-[16px] text-ink focus:border-primary focus:outline-none"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function Submit({ children }) {
  return (
    <button
      type="submit"
      className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[16px] font-medium text-bg transition-opacity hover:opacity-90"
    >
      {children}
    </button>
  );
}
