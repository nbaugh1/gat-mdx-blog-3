import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import { Metadata } from 'next'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'NPB Dev Blog',
    template: '%s | NPB Dev Blog',
  },
  description: 'A blog for things that I find interesting and useful for coding',
  authors: [{ name: 'Nick Baughman', url: 'https://npb-dev-blog.netlify.app' }],
  creator: 'Nick Baughman',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://npb-dev-blog.netlify.app',
    siteName: 'NPB Dev Blog',
    description: 'A blog for things that I find interesting and useful for coding',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nbaugh1',
    creator: '@nbaugh1',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.className} bg-gray-900 text-gray-300`}>
        <div className="min-h-screen">
          <header className="border-b border-gray-700 bg-gray-800">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-green-400">
                    <a href="/" className="hover:text-green-300">
                      ~/npb-dev-blog $
                    </a>
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    nick:~$ whoami
                  </p>
                </div>
              </div>
            </div>
          </header>
          <main className="w-full">
            {children}
          </main>
          <footer className="border-t border-gray-700 bg-gray-800">
            <div className="px-4 py-4 text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} nick | built with next.js
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}