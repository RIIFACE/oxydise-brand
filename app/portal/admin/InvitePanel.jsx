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

      <p className="mt-3 rounded-[14px] bg-surface p-4 text-[13px] leading-[1.6] text-muted">
        <span className="font-medium text-ink">Tip:</span> you can skip
        the email entirely. Send them{' '}
        <code className="rounded bg-bg px-1.5 py-0.5 text-[12px] text-ink">
          /portal/login
        </code>
        , let them request a link with their own email, then approve
        them in the <span className="text-ink">Users</span> tab when
        they appear under Pending requests.
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

        {error && (
          <div className="text-[13px]" style={{ color: '#E5484D' }}>
            <p>{error}</p>
            {/rate limit/i.test(error) && (
              <p className="mt-2 text-muted">
                Supabase&apos;s built-in email is rate-limited (30/hr, 4/hr per
                address). Use the tip above instead — send them{' '}
                <code className="rounded bg-bg px-1.5 py-0.5 text-[12px] text-ink">
                  /portal/login
                </code>{' '}
                and approve them in Users when they appear.
              </p>
            )}
          </div>
        )}
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
