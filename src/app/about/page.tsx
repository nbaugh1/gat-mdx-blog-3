import Link from 'next/link';

export default function AboutPage() {
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
              <li><Link href="/about" className="block text-green-400 hover:text-green-300">$ about</Link></li>
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
        <div className="bg-gray-800 border border-gray-600 p-6">
          <div className="mb-6">
            <h1 className="text-green-400 text-xl font-bold mb-2">
              ~/about $ cat README.md
            </h1>
            <p className="text-gray-400">
              Software developer and tech enthusiast
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-white text-lg mb-3">$ whoami</h2>
              <div className="bg-gray-900 border border-gray-600 p-4">
                <p className="text-gray-300 mb-4">
                  Hi, I'm Nick Baughman, a software developer passionate about building tools that solve real problems. 
                  I focus on creating clean, maintainable code and exploring new technologies that push the boundaries 
                  of what's possible.
                </p>
                <p className="text-gray-300">
                  My journey in software development has taken me from web applications to AI-powered tools, 
                  always with an eye toward crafting solutions that make developers' lives easier.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-white text-lg mb-3">$ ls -la ./skills</h2>
              <div className="bg-gray-900 border border-gray-600 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Languages</h3>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Python</li>
                      <li>• JavaScript/TypeScript</li>
                      <li>• Ruby</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Technologies</h3>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• React/Next.js</li>
                      <li>• Ruby on Rails</li>
                      <li>• OpenAI APIs</li>
                      <li>• Node.js</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-white text-lg mb-3">$ cat current_focus.txt</h2>
              <div className="bg-gray-900 border border-gray-600 p-4">
                <p className="text-gray-300 mb-3">
                  Currently exploring the intersection of traditional software development and AI:
                </p>
                <ul className="space-y-1 text-gray-300 text-sm ml-4">
                  <li>• Building Python packages for AI-powered text processing</li>
                  <li>• Developing tools that integrate LLMs with structured data</li>
                  <li>• Creating developer-friendly interfaces for complex AI workflows</li>
                  <li>• Modernizing web applications with Next.js and TypeScript</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-white text-lg mb-3">$ echo $PHILOSOPHY</h2>
              <div className="bg-gray-900 border border-gray-600 p-4">
                <blockquote className="text-gray-300 italic">
                  "The best code is not just functional—it's readable, maintainable, and solves real problems. 
                  Whether building a simple CLI tool or integrating cutting-edge AI, the goal is always to create 
                  something that makes other developers' work more enjoyable and productive."
                </blockquote>
              </div>
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
              <li>developer</li>
              <li>python enthusiast</li>
              <li>ai explorer</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[links]</h3>
            <ul className="space-y-1 text-xs">
              <li><Link href="/projects" className="block text-gray-300 hover:text-white">projects/</Link></li>
              <li><Link href="/contact" className="block text-gray-300 hover:text-white">contact/</Link></li>
              <li><Link href="/sitemap" className="block text-gray-300 hover:text-white">sitemap/</Link></li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}