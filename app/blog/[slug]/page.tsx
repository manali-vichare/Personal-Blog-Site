import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { getPostSlugs, getPostBySlug } from '../../../lib/posts';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const { content, frontmatter } = post;

  const mdx = await compileMDX<{ [key: string]: unknown }>({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
      },
    },
  });

  return (
    <article>
      <h1 style={{ marginBottom: '0.25rem' }}>{frontmatter.title}</h1>
      {frontmatter.date && (
        <div style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{frontmatter.date}</div>
      )}
      <div style={{ lineHeight: 1.8 }}>
        {mdx.content}
      </div>
    </article>
  );
}