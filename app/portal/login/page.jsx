import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-[40px] font-medium leading-[1] tracking-[-0.03em] text-ink md:text-[56px]">
        Sign in.
      </h1>
      <p className="mt-4 text-[16px] leading-[1.55] text-muted">
        Enter the email Oxydise invited you with. We'll send a one-time link — no password needed.
      </p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
