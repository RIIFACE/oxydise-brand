'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithPassword } from './_actions';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | pending | error
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();
  const next = params?.get('next') || '/portal';

  function onSubmit(e) {
    e.preventDefault();
    setError('');
    const fd = new FormData();
    fd.set('email', email);
    fd.set('password', password);
    startTransition(async () => {
      try {
        const result = await signInWithPassword(fd);
        if (!result?.ok) {
          setError(result?.error || 'Something went wrong. Try again.');
          setStatus('error');
          return;
        }
        if (result.status === 'pending') {
          setStatus('pending');
          return;
        }
        // Signed in — server set the session cookie. Navigate.
        router.replace(next);
        router.refresh();
      } catch (err) {
        setError(err?.message || 'Something went wrong. Try again.');
        setStatus('error');
      }
    });
  }

  if (status === 'pending') {
    return (
      <div className="mt-8 rounded-[20px] bg-panel p-6">
        <p className="font-display text-[20px] font-medium text-ink">Access request received.</p>
        <p className="mt-2 text-[16px] leading-[1.55] text-muted">
          Please check with an admin to accept your request. Once they approve{' '}
          <span className="text-ink">{email}</span>, they&apos;ll send you a password.
        </p>
        <p className="mt-3 text-[14px] leading-[1.55] text-muted">
          Need this sorted now? Email{' '}
          <a href="mailto:hello@oxydise.co.uk" className="text-primary hover:underline">
            hello@oxydise.co.uk
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <label className="block">
        <span className="mb-2 block text-[16px] font-medium text-ink">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@oxydise.co.uk"
          className="h-11 w-full rounded-full border border-line bg-bg px-5 text-[16px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[16px] font-medium text-ink">Password</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••••••"
          className="h-11 w-full rounded-full border border-line bg-bg px-5 text-[16px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
        />
      </label>
      {error && <p className="text-[14px]" style={{ color: '#E5484D' }}>{error}</p>}
      <button
        type="submit"
        disabled={isPending || !email || !password}
        className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[16px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
