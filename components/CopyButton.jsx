'use client';

import { useState } from 'react';

export default function CopyButton({ value, label, className = '' }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1 font-mono text-[11px] text-muted transition-colors hover:border-primary hover:text-text ${className}`}
      aria-label={`Copy ${label || value}`}
    >
      <span>{copied ? 'Copied' : label || value}</span>
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
        {copied ? (
          <path d="M3 8l3 3 7-7" stroke="#4FA69C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <>
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M3 11V3a1 1 0 011-1h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  );
}
