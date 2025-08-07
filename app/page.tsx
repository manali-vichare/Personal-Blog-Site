import Link from 'next/link';
import { getAllPostsMeta } from '../lib/posts';

export default async function HomePage() {
  const posts = await getAllPostsMeta();

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <p>This is a minimal Next.js + MDX blog. Explore my latest posts below.</p>

      <h2>Latest Posts</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '1rem' }}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{post.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}