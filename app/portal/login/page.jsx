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
        Enter the email and password Oxydise gave you.
      </p>
      <p className="mt-2 text-[14px] leading-[1.55] text-muted">
        New here? Sign in with your email — if it&apos;s recognised, an admin
        will see your request and send you a password. Otherwise reach
        us at <a href="mailto:hello@oxydise.co.uk" className="text-primary hover:underline">hello@oxydise.co.uk</a>.
      </p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
