import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, BlogFrontmatter } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  const postDirs = fs.readdirSync(postsDirectory);
  
  const posts = await Promise.all(
    postDirs.map(async (dir): Promise<BlogPost | null> => {
      const fullPath = path.join(postsDirectory, dir, 'index.md');
      
      if (!fs.existsSync(fullPath)) {
        return null;
      }
      
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const frontmatter = data as BlogFrontmatter;
      
      // Only return published posts
      if (!frontmatter.published) {
        return null;
      }
      
      const processedContent = await remark().use(html).process(content);
      const contentHtml = processedContent.toString();
      
      // Create excerpt (first 160 characters)
      const excerpt = content.replace(/^---[\s\S]*?---/, '').trim().substring(0, 160) + '...';
      
      const slug = dir;
      
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        published: frontmatter.published,
        featured: frontmatter.featured,
        content: contentHtml,
        excerpt,
      };
    })
  );
  
  // Filter out null posts and sort by date
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, slug, 'index.md');
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogFrontmatter;
  
  if (!frontmatter.published) {
    return null;
  }
  
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  
  const excerpt = content.replace(/^---[\s\S]*?---/, '').trim().substring(0, 160) + '...';
  
  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    published: frontmatter.published,
    featured: frontmatter.featured,
    content: contentHtml,
    excerpt,
  };
}

export function getAllPostSlugs(): string[] {
  const postDirs = fs.readdirSync(postsDirectory);
  return postDirs.filter(dir => {
    const fullPath = path.join(postsDirectory, dir, 'index.md');
    return fs.existsSync(fullPath);
  });
}

export async function getAdjacentPosts(currentSlug: string): Promise<{
  previous: BlogPost | null;
  next: BlogPost | null;
}> {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  // Since posts are sorted by date (newest first), 
  // previous is the newer post (lower index) and next is the older post (higher index)
  const previous = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  
  return { previous, next };
}