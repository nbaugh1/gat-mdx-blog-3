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
    <div className="flex gap-3 w-full bg-gray-900 min-h-screen font-mono text-sm">
      {/* Left Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-r border-gray-700">
        <nav className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[nav]</h3>
            <ul className="space-y-1">
              <li><a href="/" className="block text-gray-300 hover:text-white">$ home</a></li>
              <li><a href="/projects" className="block text-gray-300 hover:text-white">$ projects</a></li>
              <li><a href="/about" className="block text-gray-300 hover:text-white">$ about</a></li>
              <li><a href="/contact" className="block text-gray-300 hover:text-white">$ contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[tags]</h3>
            <ul className="space-y-1">
              <li><a href="/tags/python" className="text-blue-400 hover:text-blue-300">#python</a></li>
              <li><a href="/tags/javascript" className="text-yellow-400 hover:text-yellow-300">#js</a></li>
              <li><a href="/tags/react" className="text-blue-400 hover:text-blue-300">#react</a></li>
              <li><a href="/tags/ai" className="text-purple-400 hover:text-purple-300">#ai</a></li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-black px-4 py-4">
        <article className="bg-gray-800 border border-gray-600 p-6">
          <header className="mb-6 border-b border-gray-700 pb-4">
            <h1 className="text-2xl font-bold text-white mb-2">
              {post.title}
            </h1>
            <time className="text-gray-400 text-sm">
              $ cat {formatDate(post.date)}
            </time>
          </header>

          <div className="prose prose-invert max-w-none text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <footer className="mt-8 pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              <p>
                // written by nick
              </p>
            </div>
          </footer>
        </article>
      </main>

      {/* Right Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-l border-gray-700">
        <div className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[actions]</h3>
            <ul className="space-y-1 text-xs">
              <li><a href="/" className="block text-gray-300 hover:text-white">← back</a></li>
              <li><a href="#" className="block text-gray-300 hover:text-white">print</a></li>
              <li><a href="#" className="block text-gray-300 hover:text-white">share</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[utils]</h3>
            <ul className="space-y-1 text-xs">
              <li><a href="/archive" className="block text-gray-300 hover:text-white">archive.sh</a></li>
              <li><a href="/rss" className="block text-gray-300 hover:text-white">rss.xml</a></li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}