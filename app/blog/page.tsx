import Link from 'next/link';
import { getAllPostsMeta } from '../../lib/posts';

export const metadata = {
  title: 'Blog',
};

export default async function BlogIndexPage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="space-y-6">
      <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
        {posts.map((post) => (
          <li key={post.slug} className="p-4">
            <h2 className="m-0 text-lg font-semibold">
              <Link href={`/blog/${post.slug}`} className="text-blue-700 hover:underline">
                {post.title}
              </Link>
            </h2>
            {post.description && (
              <p className="text-gray-700 mt-1">{post.description}</p>
            )}
            {post.date && (
              <div className="text-xs text-gray-500 mt-2">{String(post.date)}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}