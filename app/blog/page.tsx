import Link from 'next/link';
import { getAllPostsMeta } from '../../lib/posts';

export const metadata = {
  title: 'Blog',
};

export default async function BlogIndexPage() {
  const posts = await getAllPostsMeta();

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ margin: 0 }}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.description && (
              <p style={{ color: '#374151', margin: '0.25rem 0' }}>{post.description}</p>
            )}
            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{post.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}