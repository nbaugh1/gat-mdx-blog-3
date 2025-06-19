#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawn } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BLOG_DIR = path.join(__dirname, 'content', 'blog');

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function openInEditor(filePath) {
  const editor = process.env.EDITOR || 'vim';
  console.log(`\n🚀 Opening ${filePath} in ${editor}...`);
  
  const child = spawn(editor, [filePath], {
    stdio: 'inherit'
  });
  
  child.on('exit', (code) => {
    if (code === 0) {
      console.log('\n✅ Editor closed successfully!');
    } else {
      console.log('\n⚠️  Editor exited with code:', code);
    }
    rl.close();
  });
}

function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  
  return fs.readdirSync(BLOG_DIR)
    .filter(dir => {
      const fullPath = path.join(BLOG_DIR, dir);
      const indexPath = path.join(fullPath, 'index.md');
      return fs.statSync(fullPath).isDirectory() && fs.existsSync(indexPath);
    })
    .sort()
    .reverse(); // Most recent first
}

function interactiveSelect(posts) {
  return new Promise((resolve) => {
    let selectedIndex = 0;
    
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    
    function displayPosts() {
      console.clear();
      console.log('\n📝 Select a post to edit (use ↑↓ arrows, Enter to select, or type number):\n');
      
      posts.forEach((post, index) => {
        const title = post.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' ');
        const indicator = index === selectedIndex ? '→' : ' ';
        const highlight = index === selectedIndex ? '\x1b[36m' : '\x1b[0m'; // Cyan for selected
        console.log(`${highlight}${indicator} ${index + 1}. ${title}\x1b[0m`);
      });
      
      console.log('\nPress Enter to select, or type a number (1-' + posts.length + '):');
    }
    
    displayPosts();
    
    let numberInput = '';
    
    stdin.on('data', (key) => {
      if (key === '\u0003') { // Ctrl+C
        process.exit(0);
      }
      
      if (key === '\r' || key === '\n') { // Enter
        stdin.setRawMode(false);
        stdin.pause();
        
        if (numberInput) {
          const num = parseInt(numberInput) - 1;
          if (num >= 0 && num < posts.length) {
            resolve(posts[num]);
            return;
          }
        }
        
        resolve(posts[selectedIndex]);
        return;
      }
      
      if (key === '\u001b[A') { // Up arrow
        selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : posts.length - 1;
        numberInput = '';
        displayPosts();
      } else if (key === '\u001b[B') { // Down arrow
        selectedIndex = selectedIndex < posts.length - 1 ? selectedIndex + 1 : 0;
        numberInput = '';
        displayPosts();
      } else if (key >= '1' && key <= '9') {
        numberInput += key;
        const num = parseInt(numberInput) - 1;
        if (num >= 0 && num < posts.length) {
          selectedIndex = num;
          displayPosts();
        }
      } else if (key === '\u007f' || key === '\u0008') { // Backspace
        numberInput = numberInput.slice(0, -1);
        displayPosts();
      }
    });
  });
}

async function selectPost() {
  const posts = getAllPosts();
  
  if (posts.length === 0) {
    console.log('❌ No blog posts found!');
    process.exit(1);
  }
  
  return await interactiveSelect(posts);
}

async function editPost() {
  try {
    const selectedPost = await selectPost();
    const postPath = path.join(BLOG_DIR, selectedPost, 'index.md');
    
    console.log(`\n✅ Selected: ${selectedPost}`);
    openInEditor(postPath);
    
  } catch (error) {
    console.error('❌ Error editing post:', error.message);
    process.exit(1);
  }
}

async function createNewPost() {
  try {
    console.log('🚀 Creating a new blog post...\n');
    
    const title = await prompt('Post title: ');
    if (!title.trim()) {
      console.log('❌ Title is required');
      process.exit(1);
    }

    const today = new Date();
    const dateString = formatDate(today);
    const slug = slugify(title);
    const folderName = `${dateString}-${slug}`;
    const postDir = path.join(BLOG_DIR, folderName);
    
    if (fs.existsSync(postDir)) {
      console.log('❌ A post with this title already exists for today');
      process.exit(1);
    }

    fs.mkdirSync(postDir, { recursive: true });

    const frontmatter = `---
title: "${title}"
date: "${dateString}"
featured: 
published: false
---

Your post content goes here...
`;

    const indexPath = path.join(postDir, 'index.md');
    fs.writeFileSync(indexPath, frontmatter);

    console.log(`✅ New post created: ${folderName}`);
    console.log(`📁 Location: ${postDir}`);
    console.log(`📝 File: ${indexPath}`);
    console.log('\n💡 Remember to set published: true when ready to publish!');
    
    const openEditor = await prompt('\n📝 Open in editor? (y/N): ');
    if (openEditor.toLowerCase() === 'y' || openEditor.toLowerCase() === 'yes') {
      openInEditor(indexPath);
    } else {
      rl.close();
    }
    
  } catch (error) {
    console.error('❌ Error creating post:', error.message);
    process.exit(1);
  }
}

function showUsage() {
  console.log(`
📝 Blog Post Manager

Usage:
  blog-post [command]

Commands:
  new     Create a new blog post (default)
  edit    Edit an existing blog post

Examples:
  blog-post         # Create a new post
  blog-post new     # Create a new post
  blog-post edit    # Edit an existing post
`);
}

async function main() {
  const command = process.argv[2] || 'new';
  
  switch (command) {
    case 'new':
      await createNewPost();
      break;
    case 'edit':
      await editPost();
      break;
    case 'help':
    case '--help':
    case '-h':
      showUsage();
      process.exit(0);
      break;
    default:
      console.log(`❌ Unknown command: ${command}`);
      showUsage();
      process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});