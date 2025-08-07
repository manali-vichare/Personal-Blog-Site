import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

export type PostFrontmatter = {
  title: string;
  date?: string;
  description?: string;
  excerpt?: string;
  tags?: string[];
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

const postsDir = path.join(process.cwd(), 'posts');

export async function getPostSlugs(): Promise<string[]> {
  const entries = await fs.readdir(postsDir, { withFileTypes: true });
  return entries
    .filter((ent) => ent.isFile() && ent.name.endsWith('.mdx'))
    .map((ent) => ent.name.replace(/\.mdx$/, ''));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(postsDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;
    return { slug, frontmatter, content };
  } catch {
    return null;
  }
}

export async function getAllPostsMeta(): Promise<Array<{ slug: string; title: string; date?: string; description?: string }>> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts
    .filter((p): p is Post => Boolean(p))
    .map((p) => ({
      slug: p.slug,
      title: p.frontmatter.title,
      date: p.frontmatter.date,
      description: p.frontmatter.description || p.frontmatter.excerpt,
    }))
    .sort((a, b) => {
      const aTime = a.date ? Date.parse(a.date) : 0;
      const bTime = b.date ? Date.parse(b.date) : 0;
      return bTime - aTime;
    });
}