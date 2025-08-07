import type { ReactNode } from 'react';
import Link from 'next/link';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h1>Blog</h1>
        <Link href="/">← Back to home</Link>
      </div>
      <div style={{ marginTop: '1.5rem' }}>{children}</div>
    </section>
  );
}