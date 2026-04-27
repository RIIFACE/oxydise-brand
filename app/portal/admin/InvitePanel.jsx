'use client';

import { useState, useTransition } from 'react';
import { inviteMember } from './_actions';

export default function InvitePanel() {
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
        const result = await inviteMember(fd);
        if (result?.ok) {
          setSuccess(`Invite sent to ${email}.`);
        } else {
          setError(result?.error || 'Could not send invite');
        }
      } catch (e) {
        setError(e.message || 'Could not send invite');
      }
    });
  }

  return (
    <div className="max-w-[520px] rounded-[20px] bg-panel p-6 md:p-8">
      <h2 className="font-display text-[22px] font-medium tracking-[-0.02em] text-ink">Invite someone</h2>
      <p className="mt-1 text-[14px] text-muted">
        They&apos;ll get a magic-link email. Clients see the shared Clients folder. Internal members also see the Internal folder.
      </p>

      <form action={handleSubmit} className="mt-6 space-y-5">
        <div>
          <p className="mb-3 text-[13px] font-medium text-ink">Role</p>
          <div className="flex gap-2">
            <Pill active={audience === 'client'} onClick={() => setAudience('client')}>
              External client
            </Pill>
            <Pill active={audience === 'internal'} onClick={() => setAudience('internal')}>
              Oxydise team
            </Pill>
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

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex h-9 items-center rounded-full px-4 text-[14px] font-medium transition-colors ' +
        (active ? 'bg-ink text-bg' : 'border border-line text-ink hover:bg-surface')
      }
    >
      {children}
    </button>
  );
}
