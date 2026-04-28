'use client';

import { useState } from 'react';

// Shown once after generating a password — admin must copy it now
// because we never store the plaintext anywhere we can re-read it.
export default function CredentialsCard({ email, password, onDismiss }) {
  const [copied, setCopied] = useState('');

  async function copy(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(''), 1500);
    } catch {
      // Clipboard can fail in non-secure contexts — admin can copy by hand.
    }
  }

  const block = `Email: ${email}\nPassword: ${password}\nSign in: https://brand.oxydise.com/portal/login`;

  return (
    <div className="mt-3 rounded-[16px] border border-line bg-bg p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-medium text-ink">
          Sign-in credentials — share with the user, then close this card.
        </p>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-[12px] text-muted hover:text-ink"
            aria-label="Dismiss credentials"
          >
            Done
          </button>
        )}
      </div>

      <dl className="mt-3 space-y-2 text-[13px]">
        <Row label="Email" value={email} onCopy={() => copy(email, 'email')} copied={copied === 'email'} />
        <Row label="Password" value={password} onCopy={() => copy(password, 'password')} copied={copied === 'password'} mono />
      </dl>

      <button
        type="button"
        onClick={() => copy(block, 'block')}
        className="mt-3 inline-flex h-8 items-center rounded-full border border-line px-3.5 text-[12px] font-medium text-ink transition-colors hover:bg-surface"
      >
        {copied === 'block' ? 'Copied ✓' : 'Copy email + password + URL'}
      </button>

      <p className="mt-3 text-[12px] leading-[1.5] text-muted">
        We won&apos;t show this password again. If it&apos;s lost, click <span className="text-ink">Reset password</span> next to the user in the Users tab to generate a new one.
      </p>
    </div>
  );
}

function Row({ label, value, onCopy, copied, mono }) {
  return (
    <div className="grid grid-cols-12 items-center gap-2">
      <dt className="col-span-3 text-muted">{label}</dt>
      <dd className={'col-span-7 truncate ' + (mono ? 'font-mono text-ink' : 'text-ink')} title={value}>
        {value}
      </dd>
      <button
        type="button"
        onClick={onCopy}
        className="col-span-2 inline-flex h-7 items-center justify-center rounded-full border border-line px-2 text-[11px] font-medium text-muted transition-colors hover:border-ink/30 hover:text-ink"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
