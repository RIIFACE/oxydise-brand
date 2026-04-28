'use client';

import { useState, useTransition } from 'react';
import {
  grantAccess,
  revokeAccess,
  setAdminRole,
  setManagerRole,
  deletePortalUser,
  resetUserPassword,
} from './_actions';
import CredentialsCard from './CredentialsCard';

export default function UsersPanel({ users, currentUserId, callerRole }) {
  const pending = users.filter((u) => u.memberships.length === 0);
  const active = users.filter((u) => u.memberships.length > 0);
  const isAdmin = callerRole === 'admin';

  return (
    <div className="space-y-12">
      <Section
        title="Pending requests"
        subtitle={
          pending.length === 0
            ? 'Nobody is waiting for access right now.'
            : 'These people signed in but haven’t been granted access to any files yet.'
        }
      >
        {pending.length === 0 ? null : (
          <ul className="divide-y divide-line">
            {pending.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                currentUserId={currentUserId}
                callerIsAdmin={isAdmin}
                variant="pending"
              />
            ))}
          </ul>
        )}
      </Section>

      <Section
        title="Members"
        subtitle={
          isAdmin
            ? 'Everyone with portal access. Promote, demote, revoke, or delete.'
            : 'Everyone with portal access. Promote-to-admin and delete are admin-only.'
        }
      >
        {active.length === 0 ? (
          <p className="text-[15px] text-muted">No active members yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {active.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                currentUserId={currentUserId}
                callerIsAdmin={isAdmin}
                variant="active"
              />
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
        {subtitle && <p className="mt-1 text-[14px] text-muted">{subtitle}</p>}
      </header>
      {children}
    </div>
  );
}

function UserRow({ user, currentUserId, callerIsAdmin, variant }) {
  const [error, setError] = useState('');
  const [creds, setCreds] = useState(null);
  const [isPending, startTransition] = useTransition();
  const isSelf = user.id === currentUserId;

  function run(action, fields) {
    setError('');
    startTransition(async () => {
      const fd = new FormData();
      fd.set('userId', user.id);
      for (const [k, v] of Object.entries(fields ?? {})) fd.set(k, v);
      const result = await action(fd);
      if (!result?.ok) setError(result?.error || 'Action failed');
    });
  }

  function resetPassword() {
    setError('');
    startTransition(async () => {
      const fd = new FormData();
      fd.set('userId', user.id);
      const result = await resetUserPassword(fd);
      if (!result?.ok) {
        setError(result?.error || 'Could not reset password');
        return;
      }
      setCreds({ email: result.email || user.email, password: result.password });
    });
  }

  return (
    <li className="grid grid-cols-12 items-center gap-3 py-4">
      <div className="col-span-12 md:col-span-5">
        <p className="font-display text-[16px] font-medium text-ink">
          {user.email || '(no email)'}
          {isSelf && <span className="ml-2 text-[12px] font-medium text-muted">(you)</span>}
        </p>
        <p className="mt-1 text-[13px] text-muted">{userSummary(user)}</p>
      </div>

      <div className="col-span-12 flex flex-wrap items-center gap-2 md:col-span-7 md:justify-end">
        {variant === 'pending' && (
          <>
            <Btn onClick={() => run(grantAccess, { audience: 'client' })} disabled={isPending}>
              Grant — Client
            </Btn>
            <Btn onClick={() => run(grantAccess, { audience: 'internal' })} disabled={isPending}>
              Grant — Internal
            </Btn>
            {callerIsAdmin && (
              <Btn variant="danger" onClick={() => run(deletePortalUser)} disabled={isPending || isSelf}>
                Reject
              </Btn>
            )}
          </>
        )}

        {variant === 'active' && (
          <>
            {!user.hasClientAccess && (
              <Btn onClick={() => run(grantAccess, { audience: 'client' })} disabled={isPending}>
                + Client
              </Btn>
            )}
            {!user.isInternal && (
              <Btn onClick={() => run(grantAccess, { audience: 'internal' })} disabled={isPending}>
                + Internal
              </Btn>
            )}

            {/* Manager toggle — admin only */}
            {callerIsAdmin && !user.isAdmin && (
              user.isManager ? (
                <Btn
                  onClick={() => run(setManagerRole, { promote: '0' })}
                  disabled={isPending || isSelf}
                  title={isSelf ? "You can't demote yourself." : undefined}
                >
                  Remove manager
                </Btn>
              ) : (
                <Btn onClick={() => run(setManagerRole, { promote: '1' })} disabled={isPending}>
                  Make manager
                </Btn>
              )
            )}

            {/* Admin toggle — admin only */}
            {callerIsAdmin && (
              user.isAdmin ? (
                <Btn
                  onClick={() => run(setAdminRole, { promote: '0' })}
                  disabled={isPending || isSelf}
                  title={isSelf ? "You can't demote yourself." : undefined}
                >
                  Remove admin
                </Btn>
              ) : (
                <Btn onClick={() => run(setAdminRole, { promote: '1' })} disabled={isPending}>
                  Make admin
                </Btn>
              )
            )}

            <Btn onClick={resetPassword} disabled={isPending}>
              Reset password
            </Btn>

            <Btn
              variant="danger"
              onClick={() => run(revokeAccess)}
              disabled={isPending || isSelf}
            >
              Revoke
            </Btn>
          </>
        )}
      </div>

      {creds && (
        <div className="col-span-12">
          <CredentialsCard email={creds.email} password={creds.password} onDismiss={() => setCreds(null)} />
        </div>
      )}
      {error && (
        <p className="col-span-12 text-[12px]" style={{ color: '#E5484D' }}>
          {error}
        </p>
      )}
    </li>
  );
}

function userSummary(u) {
  if (u.memberships.length === 0) {
    const first = u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-GB') : null;
    return first ? `Signed in first on ${first} · No access yet` : 'No access yet';
  }
  const labels = [];
  if (u.isAdmin) labels.push('Admin');
  else if (u.isManager) labels.push('Manager');
  if (u.isInternal) labels.push('Internal');
  if (u.hasClientAccess) labels.push('Client');
  return labels.join(' · ');
}

function Btn({ onClick, children, disabled, variant, title }) {
  const base =
    'inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-medium transition-colors disabled:opacity-50';
  const tone =
    variant === 'danger'
      ? 'border border-line text-muted hover:border-[#E5484D]/40 hover:text-[#E5484D]'
      : 'border border-line text-ink hover:bg-surface';
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title} className={`${base} ${tone}`}>
      {children}
    </button>
  );
}
