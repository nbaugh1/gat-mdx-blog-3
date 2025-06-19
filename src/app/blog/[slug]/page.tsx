import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs, getAdjacentPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = await getAdjacentPosts(params.slug);

  return (
    <article className="max-w-3xl mx-auto">
      <nav className="mb-6 text-sm text-gray-500">
        <div className="flex justify-between">
          {previous ? (
            <Link href={`/blog/${previous.slug}`} className="hover:text-gray-900">
              ← {previous.title}
            </Link>
          ) : <div></div>}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="hover:text-gray-900">
              {next.title} →
            </Link>
          ) : <div></div>}
        </div>
      </nav>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <time className="text-gray-500 text-sm">
          {formatDate(post.date)}
        </time>
      </header>

      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>
              Written by <strong>Nick Baughman</strong>, a software developer who works with Ruby and JavaScript.
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
}