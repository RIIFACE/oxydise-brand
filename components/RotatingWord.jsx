'use client';

import { useEffect, useState } from 'react';

const words = [
  'documented.',
  'considered.',
  'crafted.',
  'refined.',
  'distilled.',
  'defined.',
];

export default function RotatingWord({ className = '' }) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const listener = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className={`relative inline-grid align-baseline ${className}`}>
      {words.map((w, i) => {
        const active = i === index;
        return (
          <span
            key={w}
            aria-hidden={!active}
            style={{ gridArea: '1 / 1' }}
            className={`whitespace-nowrap transition-all duration-[600ms] ease-[cubic-bezier(0.2,0,0,1)] ${
              active
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-[0.15em] opacity-0'
            }`}
          >
            {w}
          </span>
        );
      })}
    </span>
  );
}
