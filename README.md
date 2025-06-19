# NPB Dev Blog

A personal development blog built with Next.js, TypeScript, and Tailwind CSS. This blog covers software development topics including Ruby, JavaScript, React, and Ruby on Rails.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the blog.

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📝 Content Management

### Adding a New Blog Post

1. Create a new directory in `content/blog/` with the format: `YYYY-MM-DD-title/`
2. Add an `index.md` file with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: "2023-03-17"
published: true
featured: "images/featured.jpg" # optional
---

Your blog post content goes here...
```

### Frontmatter Fields

- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `published`: Boolean to control visibility (required)
- `featured`: Path to featured image (optional)

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Typography plugin
- **Content**: Markdown with gray-matter for frontmatter
- **Markdown Processing**: Remark with HTML output
- **Deployment**: Netlify with automatic deployments

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/[slug]/       # Dynamic blog post pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
├── lib/                   # Utility functions
│   ├── blog.ts            # Blog post processing
│   └── utils.ts           # General utilities
└── types/                 # TypeScript type definitions
    └── blog.ts            # Blog-related types

content/
└── blog/                  # Blog posts (Markdown files)
    └── YYYY-MM-DD-title/
        └── index.md
```

## 🚀 Deployment

This blog is configured for automatic deployment on Netlify:

1. Push changes to the main branch
2. Netlify automatically builds and deploys
3. New blog posts are published immediately when merged

### Netlify Configuration

The `netlify.toml` file configures:
- Build command: `npm run build`
- Publish directory: `.next`
- Next.js plugin for optimal deployment

## 🎨 Styling

The blog uses Tailwind CSS with:
- Inter font for clean typography
- Responsive design
- Typography plugin for markdown content styling
- Clean, minimal aesthetic

## 📱 Features

- ✅ Static site generation for fast loading
- ✅ SEO optimized with proper meta tags
- ✅ Responsive design
- ✅ TypeScript for type safety
- ✅ Automatic sitemap generation
- ✅ Clean URLs (`/blog/post-slug`)
- ✅ Markdown content with frontmatter
- ✅ Auto-deployment on git push

## 🔧 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📄 License

This project is licensed under the 0BSD License.