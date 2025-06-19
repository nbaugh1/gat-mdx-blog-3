import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div className="flex gap-3 w-full bg-gray-900 min-h-screen font-mono text-sm">
      {/* Left Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-r border-gray-700">
        <nav className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[nav]</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="block text-green-400 hover:text-green-300">$ home</Link></li>
              <li><Link href="/projects" className="block text-gray-300 hover:text-white">$ projects</Link></li>
              <li><Link href="/about" className="block text-gray-300 hover:text-white">$ about</Link></li>
              <li><Link href="/contact" className="block text-gray-300 hover:text-white">$ contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[tags]</h3>
            <ul className="space-y-1">
              <li><Link href="/tags/python" className="text-blue-400 hover:text-blue-300">#python</Link></li>
              <li><Link href="/tags/javascript" className="text-yellow-400 hover:text-yellow-300">#js</Link></li>
              <li><Link href="/tags/react" className="text-blue-400 hover:text-blue-300">#react</Link></li>
              <li><Link href="/tags/ai" className="text-purple-400 hover:text-purple-300">#ai</Link></li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-black px-4 py-4">
        <div className="bg-gray-800 border border-gray-600 p-4">
          <div className="mb-4">
            <h1 className="text-green-400 text-xl font-bold mb-2">
              ~/blog $ ls -la
            </h1>
            <p className="text-gray-400">
              Software development notes and experiments
            </p>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-700 pb-3">
                <header className="mb-2">
                  <h2 className="text-lg font-semibold text-white mb-1">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="hover:text-green-400"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <time className="text-gray-400 text-xs">
                    {formatDate(post.date)}
                  </time>
                </header>
                <div className="mb-2">
                  <p className="text-gray-300 leading-normal">
                    {post.excerpt}
                  </p>
                </div>
                <div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-green-400 hover:text-green-300 text-sm"
                  >
                    [read]
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
      </main>

      {/* Right Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-l border-gray-700">
        <div className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[recent]</h3>
            <ul className="space-y-2 text-xs">
              {posts.slice(0, 4).map((post) => (
                <li key={post.slug}>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="block text-gray-300 hover:text-white line-clamp-2"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[utils]</h3>
            <ul className="space-y-1 text-xs">
              <li><Link href="/archive" className="block text-gray-300 hover:text-white">archive.sh</Link></li>
              <li><Link href="/rss" className="block text-gray-300 hover:text-white">rss.xml</Link></li>
              <li><Link href="/sitemap" className="block text-gray-300 hover:text-white">sitemap</Link></li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}