import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'My Personal Blog',
    template: '%s | My Personal Blog',
  },
  description: 'A simple blog built with Next.js and MDX',
  openGraph: {
    type: 'website' as const,
    siteName: 'My Personal Blog',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image' as const,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white text-gray-900 antialiased">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200">
          <nav className="mx-auto max-w-3xl flex gap-6 p-4">
            <Link href="/" className="font-medium hover:text-blue-600">Home</Link>
            <Link href="/blog" className="font-medium hover:text-blue-600">Blog</Link>
            <Link href="/about" className="font-medium hover:text-blue-600">About</Link>
          </nav>
        </header>
        <main className="grow mx-auto max-w-3xl w-full p-6 sm:p-8">{children}</main>
        <footer className="border-t border-gray-200 mt-8">
          <div className="mx-auto max-w-3xl p-6 sm:p-8 text-sm text-gray-500">
            © {new Date().getFullYear()} My Personal Blog
          </div>
        </footer>
      </body>
    </html>
  );
}