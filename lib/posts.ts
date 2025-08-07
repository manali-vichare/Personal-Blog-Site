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

function stripMarkdownInline(text: string): string {
  // Remove code blocks
  const noCodeBlocks = text.replace(/```[\s\S]*?```/g, '');
  // Replace images ![alt](url) with alt
  const noImages = noCodeBlocks.replace(/!\[(.*?)\]\([^)]*\)/g, '$1');
  // Replace links [text](url) with text
  const noLinks = noImages.replace(/\[(.*?)\]\([^)]*\)/g, '$1');
  // Remove headings markers and blockquotes
  const noHashes = noLinks.replace(/^\s{0,3}#{1,6}\s+/gm, '').replace(/^>\s?/gm, '');
  // Remove emphasis markers
  const noEmphasis = noHashes.replace(/[*_`~]/g, '');
  // Collapse whitespace
  return noEmphasis.replace(/\s+/g, ' ').trim();
}

function createExcerpt(content: string, maxLength = 200): string {
  const paragraphs = content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const candidate = paragraphs[0] ?? '';
  const cleaned = stripMarkdownInline(candidate);
  if (cleaned.length <= maxLength) return cleaned;
  const truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trim() + '…';
}

export async function getAllPostsMeta(): Promise<Array<{ slug: string; title: string; date?: string; description?: string; excerpt?: string }>> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts
    .filter((p): p is Post => Boolean(p))
    .map((p) => {
      const description = p.frontmatter.description;
      const excerpt = description || p.frontmatter.excerpt || createExcerpt(p.content);
      return {
        slug: p.slug,
        title: p.frontmatter.title,
        date: p.frontmatter.date,
        description,
        excerpt,
      };
    })
    .sort((a, b) => {
      const aTime = a.date ? Date.parse(a.date) : 0;
      const bTime = b.date ? Date.parse(b.date) : 0;
      return bTime - aTime;
    });
}