import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'My Personal Blog',
  description: 'A simple blog built with Next.js and MDX',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </header>
        <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1rem' }}>{children}</main>
        <footer style={{ padding: '2rem 1rem', borderTop: '1px solid #e5e7eb', marginTop: '2rem' }}>
          <p style={{ color: '#6b7280' }}>© {new Date().getFullYear()} My Personal Blog</p>
        </footer>
      </body>
    </html>
  );
}