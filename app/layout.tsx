import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'In Progress: Learning Out Loud',
    template: '%s | In Progress: Learning Out Loud',
  },
  description: 'Somewhere between SQL and self-growth.',
  openGraph: {
    type: 'website' as const,
    siteName: 'In Progress: Learning Out Loud',
    locale: 'en_US',
    description: 'Somewhere between SQL and self-growth.',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'In Progress: Learning Out Loud',
    description: 'Somewhere between SQL and self-growth.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white text-gray-900 antialiased">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200">
          <nav className="mx-auto max-w-3xl flex items-center justify-between p-4">
            <Link href="/" className="font-semibold tracking-tight hover:text-blue-600" aria-label="In Progress: Learning Out Loud">
              In Progress: Learning Out Loud
            </Link>
            <div className="flex gap-6">
              <Link href="/blog" className="font-medium hover:text-blue-600">Blog</Link>
              <Link href="/about" className="font-medium hover:text-blue-600">About</Link>
            </div>
          </nav>
        </header>
        <main className="grow mx-auto max-w-3xl w-full p-6 sm:p-8">{children}</main>
        <footer className="border-t border-gray-200 mt-8">
          <div className="mx-auto max-w-3xl p-6 sm:p-8 text-sm text-gray-500">
            {/* Updated footer text */}
            © Manali Vichare 2025. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}