# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based personal development blog (NPB Dev Blog) built with TypeScript and Tailwind CSS. The blog focuses on software development topics covering Ruby, JavaScript, React, and Ruby on Rails.

## Development Commands

- `npm run dev` - Start development server (runs at http://localhost:3000)
- `npm run build` - Build the site for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code using Prettier

## Architecture

### Content Management
- Blog posts are stored as Markdown files in `content/blog/[YYYY-MM-DD-title]/index.md`
- Each post directory can contain images and other assets
- Site assets are in `content/assets/`
- Uses gray-matter for frontmatter parsing and remark for Markdown processing

### Key Next.js Files
- `next.config.js` - Next.js configuration
- `src/app/layout.tsx` - Root layout with SEO and styling
- `src/app/page.tsx` - Homepage listing all blog posts
- `src/app/blog/[slug]/page.tsx` - Dynamic blog post pages
- `tailwind.config.js` - Tailwind CSS configuration
- `netlify.toml` - Netlify deployment configuration

### Component Structure
- `src/app/layout.tsx` - Root layout with header/footer and metadata
- `src/app/page.tsx` - Homepage with blog post listing
- `src/app/blog/[slug]/page.tsx` - Individual blog post template
- `src/app/not-found.tsx` - 404 error page
- `src/lib/blog.ts` - Blog post processing utilities
- `src/lib/utils.ts` - General utility functions
- `src/types/blog.ts` - TypeScript type definitions

### Styling
- Uses Tailwind CSS for utility-first styling
- Typography plugin for markdown content styling
- Inter font for clean typography
- Responsive design with mobile-first approach

### Features
- Static Site Generation (SSG) for optimal performance
- SEO optimization with proper meta tags and OpenGraph
- TypeScript for type safety
- Automatic deployment via Netlify
- Clean URLs (`/blog/post-slug`)

## Content Structure

Blog posts should include frontmatter with:
- `title` - Post title (required)
- `date` - Publication date in YYYY-MM-DD format (required)
- `published` - Boolean to control visibility (required)
- `featured` - Path to featured image (optional)

## Deployment

The site is deployed to Netlify at https://npb-dev-blog.netlify.app/ with automatic deployments on main branch pushes.