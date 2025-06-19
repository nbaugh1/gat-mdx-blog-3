import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export default async function SitemapPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex gap-3 w-full bg-gray-900 min-h-screen font-mono text-sm">
      {/* Left Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-r border-gray-700">
        <nav className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[nav]</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="block text-gray-300 hover:text-white">$ home</Link></li>
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
              ~/sitemap $ tree
            </h1>
            <p className="text-gray-400">
              Site structure and all available pages
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-white text-lg mb-2">Pages</h2>
              <ul className="space-y-1 text-sm text-gray-300 ml-4">
                <li>├── <Link href="/" className="text-green-400 hover:text-green-300">home</Link></li>
                <li>├── <Link href="/projects" className="text-blue-400 hover:text-blue-300">projects</Link></li>
                <li>├── <Link href="/about" className="text-blue-400 hover:text-blue-300">about</Link></li>
                <li>├── <Link href="/contact" className="text-blue-400 hover:text-blue-300">contact</Link></li>
                <li>├── <Link href="/archive" className="text-blue-400 hover:text-blue-300">archive</Link></li>
                <li>└── <Link href="/sitemap" className="text-yellow-400 hover:text-yellow-300">sitemap</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-lg mb-2">Blog Posts ({posts.length})</h2>
              <ul className="space-y-1 text-sm text-gray-300 ml-4">
                {posts.map((post, index) => (
                  <li key={post.slug}>
                    {index === posts.length - 1 ? '└──' : '├──'} 
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-gray-300 hover:text-white ml-1"
                    >
                      {post.title}
                    </Link>
                    <span className="text-gray-500 text-xs ml-2">({formatDate(post.date)})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-white text-lg mb-2">Tags</h2>
              <ul className="space-y-1 text-sm text-gray-300 ml-4">
                <li>├── <Link href="/tags/python" className="text-blue-400 hover:text-blue-300">#python</Link></li>
                <li>├── <Link href="/tags/javascript" className="text-yellow-400 hover:text-yellow-300">#javascript</Link></li>
                <li>├── <Link href="/tags/react" className="text-blue-400 hover:text-blue-300">#react</Link></li>
                <li>└── <Link href="/tags/ai" className="text-purple-400 hover:text-purple-300">#ai</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-l border-gray-700">
        <div className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[stats]</h3>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>{posts.length} posts</li>
              <li>4 tags</li>
              <li>6 pages</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[utils]</h3>
            <ul className="space-y-1 text-xs">
              <li><Link href="/rss" className="block text-gray-300 hover:text-white">rss.xml</Link></li>
              <li><Link href="/archive" className="block text-gray-300 hover:text-white">archive.sh</Link></li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}