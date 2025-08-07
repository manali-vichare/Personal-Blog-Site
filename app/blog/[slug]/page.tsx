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
    <article className="prose prose-slate max-w-none">
      <h1 className="mb-1">{frontmatter.title}</h1>
      {frontmatter.date && (
        <div className="text-sm text-gray-500 mb-6">{String(frontmatter.date)}</div>
      )}
      <div>
        {mdx.content}
      </div>
    </article>
  );
}