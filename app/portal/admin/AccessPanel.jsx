'use client';

import { useState, useTransition } from 'react';
import {
  addAllowedEmail,
  removeAllowedEmail,
  approveAccessRequest,
  rejectAccessRequest,
} from './_actions';
import CredentialsCard from './CredentialsCard';

export default function AccessPanel({ allowedEmails, accessRequests }) {
  return (
    <div className="space-y-12">
      <Section
        title="Pending requests"
        subtitle={
          accessRequests.length === 0
            ? "Nobody has tried to log in with an email that isn't allowed yet."
            : 'These emails tried to sign in but aren’t on the allowlist. Approve to add them, or reject to dismiss.'
        }
      >
        {accessRequests.length === 0 ? null : (
          <ul className="divide-y divide-line">
            {accessRequests.map((r) => (
              <RequestRow key={r.email} request={r} />
            ))}
          </ul>
        )}
      </Section>

      <Section
        title="Allowed emails"
        subtitle="People with these emails (plus anyone @oxydise.co.uk or @oxydisewellness.co.uk) can sign in. Everyone else gets the access-request screen."
      >
        <AddEmailForm />
        {allowedEmails.length === 0 ? (
          <p className="mt-6 text-[15px] text-muted">
            No client emails on the allowlist yet — only the Oxydise domains.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-line">
            {allowedEmails.map((e) => (
              <AllowedRow key={e.email} entry={e} />
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div>
      <header className="mb-5">
        <h2 className="font-display text-[20px] font-medium tracking-[-0.01em] text-ink">{title}</h2>
        {subtitle && <p className="mt-1 max-w-2xl text-[14px] leading-[1.55] text-muted">{subtitle}</p>}
      </header>
      {children}
    </div>
  );
}

function AddEmailForm() {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();

  function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const fd = new FormData();
    fd.set('email', email);
    if (note) fd.set('note', note);
    startTransition(async () => {
      const result = await addAllowedEmail(fd);
      if (result?.ok) {
        setSuccess(`${email} can now request a sign-in link.`);
        setEmail('');
        setNote('');
      } else {
        setError(result?.error || 'Could not add email');
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[20px] bg-panel p-6 md:p-8">
      <p className="text-[14px] text-muted">
        Add a client&apos;s email here, then send them{' '}
        <code className="rounded bg-bg px-1.5 py-0.5 text-[12px] text-ink">/portal/login</code>.
        They request a link with their own email and you approve their role in the Users tab.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-[2fr_1fr_auto]">
        <input
          type="email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="client@theircompany.com"
          className="h-11 w-full rounded-full border border-line bg-bg px-5 text-[15px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
        />
        <input
          type="text"
          value={note}
          onChange={(ev) => setNote(ev.target.value)}
          placeholder="Note (optional)"
          className="h-11 w-full rounded-full border border-line bg-bg px-5 text-[15px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={isPending || !email}
          className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[14px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Adding…' : 'Allow'}
        </button>
      </div>
      {error && <p className="mt-3 text-[13px]" style={{ color: '#E5484D' }}>{error}</p>}
      {success && <p className="mt-3 text-[13px] text-ink">{success}</p>}
    </form>
  );
}

function AllowedRow({ entry }) {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  function onRemove() {
    setError('');
    const fd = new FormData();
    fd.set('email', entry.email);
    startTransition(async () => {
      const result = await removeAllowedEmail(fd);
      if (!result?.ok) setError(result?.error || 'Could not remove');
    });
  }
  return (
    <li className="grid grid-cols-12 items-center gap-3 py-4">
      <div className="col-span-12 md:col-span-7">
        <p className="font-display text-[15px] font-medium text-ink">{entry.email}</p>
        {entry.note && <p className="mt-1 text-[13px] text-muted">{entry.note}</p>}
      </div>
      <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-5 md:justify-end">
        <span className="text-[13px] text-muted">
          Added {new Date(entry.added_at).toLocaleDateString('en-GB')}
        </span>
        <button
          type="button"
          onClick={onRemove}
          disabled={isPending}
          className="inline-flex h-8 items-center rounded-full border border-line px-3.5 text-[13px] font-medium text-muted transition-colors hover:border-[#E5484D]/40 hover:text-[#E5484D] disabled:opacity-50"
        >
          Remove
        </button>
      </div>
      {error && (
        <p className="col-span-12 text-[12px]" style={{ color: '#E5484D' }}>{error}</p>
      )}
    </li>
  );
}

function RequestRow({ request }) {
  const [error, setError] = useState('');
  const [creds, setCreds] = useState(null);
  const [isPending, startTransition] = useTransition();

  function approve() {
    setError('');
    const fd = new FormData();
    fd.set('email', request.email);
    startTransition(async () => {
      const result = await approveAccessRequest(fd);
      if (!result?.ok) {
        setError(result?.error || 'Action failed');
        return;
      }
      setCreds({ email: result.email, password: result.password });
    });
  }

  function reject() {
    setError('');
    const fd = new FormData();
    fd.set('email', request.email);
    startTransition(async () => {
      const result = await rejectAccessRequest(fd);
      if (!result?.ok) setError(result?.error || 'Action failed');
    });
  }

  return (
    <li className="grid grid-cols-12 items-center gap-3 py-4">
      <div className="col-span-12 md:col-span-7">
        <p className="font-display text-[15px] font-medium text-ink">{request.email}</p>
        <p className="mt-1 text-[13px] text-muted">
          Requested {new Date(request.requested_at).toLocaleString('en-GB')}
        </p>
      </div>
      <div className="col-span-12 flex flex-wrap items-center gap-2 md:col-span-5 md:justify-end">
        <button
          type="button"
          onClick={approve}
          disabled={isPending}
          className="inline-flex h-8 items-center rounded-full bg-ink px-3.5 text-[13px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Approve
        </button>
        <button
          type="button"
          onClick={reject}
          disabled={isPending}
          className="inline-flex h-8 items-center rounded-full border border-line px-3.5 text-[13px] font-medium text-muted transition-colors hover:border-[#E5484D]/40 hover:text-[#E5484D] disabled:opacity-50"
        >
          Reject
        </button>
      </div>
      {creds && (
        <div className="col-span-12">
          <CredentialsCard email={creds.email} password={creds.password} onDismiss={() => setCreds(null)} />
        </div>
      )}
      {error && (
        <p className="col-span-12 text-[12px]" style={{ color: '#E5484D' }}>{error}</p>
      )}
    </li>
  );
}
