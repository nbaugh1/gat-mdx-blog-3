import Link from 'next/link';

export default function NotFound() {
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
              <li><Link href="/tags/ruby" className="text-red-400 hover:text-red-300">#ruby</Link></li>
              <li><Link href="/tags/javascript" className="text-yellow-400 hover:text-yellow-300">#js</Link></li>
              <li><Link href="/tags/react" className="text-blue-400 hover:text-blue-300">#react</Link></li>
              <li><Link href="/tags/rails" className="text-red-400 hover:text-red-300">#rails</Link></li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 bg-black px-4 py-4">
        <div className="bg-gray-800 border border-gray-600 p-6 text-center">
          <h1 className="text-4xl font-bold text-red-400 mb-4">404</h1>
          <h2 className="text-xl text-white mb-4">command not found</h2>
          <p className="text-gray-300 mb-8 font-mono">
            bash: {typeof window !== 'undefined' ? window.location.pathname : 'page'}: No such file or directory
          </p>
          <Link 
            href="/"
            className="text-green-400 hover:text-green-300 border border-green-400 hover:border-green-300 px-4 py-2"
          >
            $ cd ~/
          </Link>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-l border-gray-700">
        <div className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[error]</h3>
            <ul className="space-y-1 text-xs text-red-400">
              <li>exit code: 1</li>
              <li>status: 404</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[utils]</h3>
            <ul className="space-y-1 text-xs">
              <li><Link href="/archive" className="block text-gray-300 hover:text-white">archive.sh</Link></li>
              <li><Link href="/rss" className="block text-gray-300 hover:text-white">rss.xml</Link></li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}