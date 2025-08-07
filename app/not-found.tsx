import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight">404 – Page not found</h1>
      <p className="mt-3 text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-6">
        <Link href="/" className="text-blue-700 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}