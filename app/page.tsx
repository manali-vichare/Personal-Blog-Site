import Link from 'next/link';
import { getAllPostsMeta } from '../lib/posts';

export default async function HomePage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">In Progress: Learning Out Loud</h1>
        <p className="text-gray-600">Somewhere between SQL and self-growth.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest Posts</h2>
        <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
          {posts.map((post) => (
            <li key={post.slug} className="p-4 hover:bg-gray-50 transition-colors">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="font-medium text-blue-700 hover:underline">{post.title}</div>
                {post.description && (
                  <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                )}
                {post.date && (
                  <div className="text-xs text-gray-500 mt-2">{String(post.date)}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}