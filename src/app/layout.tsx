import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <header className="border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    <a href="/" className="hover:text-gray-700">
                      NPB Dev Blog
                    </a>
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">
                    by Nick Baughman, a software developer who works with Ruby and JavaScript
                  </p>
                </div>
              </div>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-gray-200 mt-12">
            <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
              © {new Date().getFullYear()} Nick Baughman. Built with Next.js.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}