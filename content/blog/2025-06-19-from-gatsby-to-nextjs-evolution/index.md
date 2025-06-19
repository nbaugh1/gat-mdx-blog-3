---
title: "From Gatsby to Next.js: Evolution of NPB Dev Blog"
date: "2025-06-19"
featured: 
published: true
---

After years of running this blog on Gatsby, I recently made the leap to Next.js. This migration wasn't just a simple framework swap—it represented a complete modernization of the blog's architecture, tooling, and user experience. Here's a deep dive into what changed and why.

## The Migration Foundation

The migration itself was substantial, moving from Gatsby's static site generation approach to Next.js 13+ with the App Router. This wasn't just about swapping one React framework for another; it involved rethinking how content is processed, how pages are generated, and how the overall developer experience works.

### Key Architectural Changes

**Content Processing**: The blog moved from Gatsby's GraphQL-based content layer to a more direct approach using `gray-matter` for frontmatter parsing and custom utilities in `src/lib/blog.ts`. This simplified the content pipeline while maintaining all the flexibility needed for a developer blog.

**Routing**: Transitioned from Gatsby's automatic page generation to Next.js App Router with dynamic routes at `src/app/blog/[slug]/page.tsx`. This provides better control over how individual blog posts are rendered and cached.

**Static Generation**: Maintained the benefits of static site generation but with Next.js's more modern approach, ensuring fast loading times while getting better developer tooling.

## Post-Migration Enhancements

Since the initial migration, the blog has seen several significant improvements that showcase the flexibility of the new architecture:

### 1. Modern Terminal-Inspired Design

The most visible change has been a complete design overhaul. The new look embraces a terminal/code editor aesthetic with:

- **Dark theme throughout** with gray-900 backgrounds and syntax-highlighted colors
- **Monospace typography** using a clean, readable font stack
- **Terminal-style navigation** with commands like `$ home`, `$ contact`, etc.
- **Sidebar layouts** that mimic code editor interfaces with navigation and utility panels

This design isn't just aesthetic—it reflects the technical nature of the content and creates a cohesive experience for developers reading the blog.

### 2. Enhanced Page Structure

The blog now includes several new pages that weren't part of the original Gatsby setup:

**Contact Page** (`src/app/contact/page.tsx`): A terminal-themed contact interface that presents information in a developer-friendly format with commands like `$ cat contact.info` and `$ ls -la ./interests`.

**Sitemap Page** (`src/app/sitemap/page.tsx`): A comprehensive site map that displays all posts, pages, and tags in a tree-like structure reminiscent of the Unix `tree` command.

### 3. Advanced Content Management Tooling

One of the most significant additions is the custom blog management CLI tool (`scripts/blog.js`). This Node.js script provides:

- **Post Creation**: Interactive post creation with title input and publication status
- **Post Editing**: Browse and select from existing posts to edit
- **Global Configuration**: Setup for running the blog command from anywhere on the system
- **Smart Project Detection**: Automatically finds the blog project root using multiple strategies

The CLI tool demonstrates sophisticated project management features:
- Environment variable support (`BLOG_PROJECT_ROOT`)
- Home directory config file (`~/.blog-config.json`)
- Automatic project root detection by scanning for `package.json` and the `content/blog` directory
- Integration with system editors via the `EDITOR` environment variable

### 4. Improved Navigation and User Experience

The new architecture supports enhanced navigation features:

**Adjacent Post Links**: Blog posts now include navigation to previous and next posts, implemented with utility functions in `src/lib/blog.ts` that calculate post relationships.

**Better Typography**: The typography has been completely overhauled with proper spacing, readable font sizes, and consistent styling throughout.

**Responsive Design**: While maintaining the terminal aesthetic, the design works well across different screen sizes with appropriate sidebar behavior.

## Technical Improvements Under the Hood

Beyond the visible changes, several technical improvements make the blog more maintainable and performant:

### Type Safety
The migration introduced comprehensive TypeScript definitions in `src/types/blog.ts`, ensuring type safety throughout the content processing pipeline.

### Modern Build Pipeline
Next.js provides a more modern build system with better optimization, automatic code splitting, and improved development experience.

### Simplified Deployment
The blog maintains its Netlify deployment setup but benefits from Next.js's optimized build output and better caching strategies.

## Lessons Learned

This migration highlighted several important considerations for static site modernization:

1. **Framework Choice Matters**: While Gatsby served well initially, Next.js's App Router provides more flexibility for custom content management and better alignment with modern React patterns.

2. **Design and Function Integration**: The terminal-themed design isn't just visual—it creates opportunities for creative technical content presentation that aligns with the blog's developer audience.

3. **Tooling Investment**: The custom CLI tool significantly improves the content creation workflow, demonstrating how investing in developer experience pays dividends in productivity.

4. **Incremental Enhancement**: The ability to enhance the blog post-migration with new pages, improved styling, and better tooling shows the value of choosing a flexible foundation.

## Looking Forward

The migration to Next.js has positioned the blog for future enhancements. The modern architecture makes it easier to:

- Add new interactive features
- Integrate with external APIs or services
- Implement advanced content features like search or filtering
- Experiment with new design patterns

This evolution from Gatsby to Next.js represents more than a technical migration—it's a complete modernization that improves both the developer experience and the reader experience. The terminal-inspired design, custom tooling, and enhanced navigation create a cohesive platform that better serves its purpose as a developer-focused blog.

The journey from a simple Gatsby blog to this modern Next.js-powered platform demonstrates how thoughtful technical decisions can enable creative expression while maintaining excellent performance and maintainability.