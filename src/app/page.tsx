import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Latest Posts
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to my blog where I share thoughts on software development, 
          particularly around Ruby, JavaScript, React, and Ruby on Rails.
        </p>
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-gray-200 pb-8">
            <header className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-gray-700 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <time className="text-gray-500 text-sm">
                {formatDate(post.date)}
              </time>
            </header>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="mt-4">
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts published yet.</p>
        </div>
      )}
    </div>
  );
}