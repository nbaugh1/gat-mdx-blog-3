import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="flex gap-3 w-full bg-gray-900 min-h-screen font-mono text-sm">
      {/* Left Sidebar */}
      <aside className="w-32 flex-shrink-0 bg-gray-800 border-r border-gray-700">
        <nav className="sticky top-4 p-3">
          <div className="mb-4">
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[nav]</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="block text-gray-300 hover:text-white">$ home</Link></li>
              <li><Link href="/projects" className="block text-green-400 hover:text-green-300">$ projects</Link></li>
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
        <div className="bg-gray-800 border border-gray-600 p-6">
          <div className="mb-6">
            <h1 className="text-green-400 text-xl font-bold mb-2">
              ~/projects $ ls -la
            </h1>
            <p className="text-gray-400">
              Software projects and open source contributions
            </p>
          </div>

          <div className="space-y-6">
            {/* LLuMmarizer Project */}
            <div className="bg-gray-900 border border-gray-600 p-4">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-white text-lg font-semibold">LLuMmarizer</h2>
                <div className="flex space-x-2">
                  <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">Python</span>
                  <span className="bg-purple-600 text-white px-2 py-1 text-xs rounded">OpenAI</span>
                  <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">GPT-4</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                A Python library that provides an interface to OpenAI's GPT-4 model for generating summaries from structured data. 
                Easily integrate AI-powered summarization capabilities into your applications.
              </p>
              
              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-2">$ cat features.txt</h3>
                <ul className="text-gray-300 text-sm space-y-1 ml-4">
                  <li>• Generate summaries from structured data (dictionaries/JSON)</li>
                  <li>• Customize summaries with additional context information</li>
                  <li>• Exclude specific keys from summarization process</li>
                  <li>• Multi-language support for output summaries</li>
                  <li>• Powered by OpenAI's GPT-4 model for high-quality results</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-2">$ pip install llummarizer</h3>
                <div className="bg-black border border-gray-600 p-2 text-xs">
                  <code className="text-green-400">
                    from llummarizer import LLMSummarizer<br/>
                    summarizer = LLMSummarizer()<br/>
                    summary = summarizer.create_summary(data, language="english")
                  </code>
                </div>
              </div>

              <div className="flex space-x-4 text-sm">
                <a 
                  href="https://pypi.org/project/llummarizer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>📦</span>
                  <span>PyPI</span>
                </a>
                <a 
                  href="https://github.com/nbaugh1/LLuMmarizer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>🔗</span>
                  <span>GitHub</span>
                </a>
                <span className="text-gray-500 text-xs">v0.0.1 • Requires Python 3.12+</span>
              </div>
            </div>

            {/* Blog Management CLI */}
            <div className="bg-gray-900 border border-gray-600 p-4">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-white text-lg font-semibold">Blog CLI Tool</h2>
                <div className="flex space-x-2">
                  <span className="bg-yellow-600 text-white px-2 py-1 text-xs rounded">Node.js</span>
                  <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">CLI</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                Custom command-line interface for managing blog posts with interactive features.
              </p>
              
              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-2">$ cat features.txt</h3>
                <ul className="text-gray-300 text-sm space-y-1 ml-4">
                  <li>• Interactive post creation and editing</li>
                  <li>• Global configuration support</li>
                  <li>• Smart project detection</li>
                  <li>• Editor integration</li>
                </ul>
              </div>

              <div className="flex space-x-4 text-sm">
                <span className="text-gray-500">📁 Part of this blog project</span>
              </div>
            </div>

            {/* NPB Dev Blog */}
            <div className="bg-gray-900 border border-gray-600 p-4">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-white text-lg font-semibold">NPB Dev Blog</h2>
                <div className="flex space-x-2">
                  <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">Next.js</span>
                  <span className="bg-purple-600 text-white px-2 py-1 text-xs rounded">TypeScript</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                Modern developer blog built with Next.js, featuring terminal-inspired design and custom tooling.
              </p>
              
              <div className="mb-4">
                <h3 className="text-gray-400 text-sm mb-2">$ cat features.txt</h3>
                <ul className="text-gray-300 text-sm space-y-1 ml-4">
                  <li>• Static site generation with Next.js</li>
                  <li>• Terminal-themed UI/UX</li>
                  <li>• Markdown content management</li>
                  <li>• Custom CLI tooling</li>
                </ul>
              </div>

              <div className="flex space-x-4 text-sm">
                <a 
                  href="https://npb-dev-blog.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>🌐</span>
                  <span>Live Site</span>
                </a>
                <span className="text-gray-500">📁 This project</span>
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
              <li>3 projects</li>
              <li>2 languages</li>
              <li>1 published</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-400 mb-2 text-xs uppercase">[tech]</h3>
            <ul className="space-y-1 text-xs">
              <li><span className="text-blue-400">#python</span></li>
              <li><span className="text-yellow-400">#nodejs</span></li>
              <li><span className="text-blue-400">#nextjs</span></li>
              <li><span className="text-purple-400">#typescript</span></li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}