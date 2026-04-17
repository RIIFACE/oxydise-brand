import Link from 'next/link';
import { brand } from '@/lib/brand.config';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 text-sm text-muted md:flex-row md:items-center">
        <div>
          <p className="font-display text-text">{brand.name}</p>
          <p>
            {brand.domain} · Last updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/logo" className="hover:text-text">Logo</Link>
          <Link href="/colors" className="hover:text-text">Colors</Link>
          <Link href="/typography" className="hover:text-text">Typography</Link>
          <Link href="/voice" className="hover:text-text">Voice</Link>
          <Link href="/components" className="hover:text-text">Components</Link>
          <Link href="/downloads" className="hover:text-text">Downloads</Link>
        </div>
      </div>
    </footer>
  );
}
