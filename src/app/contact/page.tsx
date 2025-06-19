import Link from 'next/link';

export default function ContactPage() {
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
              <li><Link href="/contact" className="block text-green-400 hover:text-green-300">$ contact</Link></li>
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
        <div className="bg-gray-800 border border-gray-600 p-6">
          <div className="mb-6">
            <h1 className="text-green-400 text-xl font-bold mb-2">
              ~/contact $ whoami
            </h1>
            <p className="text-gray-400">
              Get in touch with nick
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-white text-lg mb-3">$ cat contact.info</h2>
              <div className="bg-gray-900 border border-gray-600 p-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 w-16">email:</span>
                  <a 
                    href="mailto:nbaugh1@gmail.com"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    nbaugh1@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 w-16">github:</span>
                  <a 
                    href="https://github.com/nbaugh1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    github.com/nbaugh1
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 w-16">linkedin:</span>
                  <a 
                    href="https://linkedin.com/in/nickbaughman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    linkedin.com/in/nickbaughman
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-white text-lg mb-3">$ ls -la ./interests</h2>
              <div className="bg-gray-900 border border-gray-600 p-4">
                <ul className="space-y-1 text-gray-300">
                  <li>├── ruby-on-rails/</li>
                  <li>├── javascript-react/</li>
                  <li>├── software-architecture/</li>
                  <li>├── web-development/</li>
                  <li>└── open-source/</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-white text-lg mb-3">$ echo $AVAILABILITY</h2>
              <div className="bg-gray-900 border border-gray-600 p-4">
                <p className="text-gray-300">
                  Always open to discussing interesting projects, collaboration opportunities, 
                  or just chatting about code. Feel free to reach out!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-l border-gray-700">
        <div className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[status]</h3>
            <ul className="space-y-1 text-xs">
              <li className="text-green-400">● online</li>
              <li className="text-gray-300">available</li>
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