#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer').default;
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function findProjectRoot() {
  // First, check if BLOG_PROJECT_ROOT environment variable is set
  if (process.env.BLOG_PROJECT_ROOT) {
    const envPath = path.resolve(process.env.BLOG_PROJECT_ROOT);
    const contentBlogPath = path.join(envPath, 'content', 'blog');
    if (fs.existsSync(contentBlogPath)) {
      return envPath;
    } else {
      console.error(chalk.red(`Error: BLOG_PROJECT_ROOT environment variable points to invalid directory: ${envPath}`));
      console.error(chalk.yellow('The directory must contain a content/blog folder.'));
      process.exit(1);
    }
  }
  
  // Check for a global config file in user's home directory
  const homeDir = require('os').homedir();
  const configPath = path.join(homeDir, '.blog-config.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.projectRoot) {
        const configProjectRoot = path.resolve(config.projectRoot);
        const contentBlogPath = path.join(configProjectRoot, 'content', 'blog');
        if (fs.existsSync(contentBlogPath)) {
          return configProjectRoot;
        }
      }
    } catch (e) {
      console.error(chalk.yellow(`Warning: Could not parse config file at ${configPath}`));
    }
  }
  
  // Fall back to searching from current directory upward
  let currentDir = process.cwd();
  
  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    const contentBlogPath = path.join(currentDir, 'content', 'blog');
    
    if (fs.existsSync(packageJsonPath) && fs.existsSync(contentBlogPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        // Check for known blog project indicators
        if (packageJson.name === 'npb-dev-blog' || 
            (packageJson.bin && packageJson.bin.blog) ||
            (packageJson.scripts && packageJson.scripts.blog)) {
          return currentDir;
        }
      } catch (e) {
        // Continue searching
      }
    }
    
    currentDir = path.dirname(currentDir);
  }
  
  console.error(chalk.red('Error: Could not find blog project root directory.'));
  console.error(chalk.yellow('Solutions:'));
  console.error(chalk.yellow('1. Run the command from within your blog project directory'));
  console.error(chalk.yellow('2. Set BLOG_PROJECT_ROOT environment variable: export BLOG_PROJECT_ROOT=/path/to/your/blog'));
  console.error(chalk.yellow('3. Create ~/.blog-config.json with: {"projectRoot": "/path/to/your/blog"}'));
  process.exit(1);
}

const PROJECT_ROOT = findProjectRoot();
const BLOG_DIR = path.join(PROJECT_ROOT, 'content', 'blog');

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getAllPosts() {
  const posts = [];
  const dirs = fs.readdirSync(BLOG_DIR);
  
  for (const dir of dirs) {
    const postPath = path.join(BLOG_DIR, dir);
    const indexPath = path.join(postPath, 'index.md');
    
    if (fs.statSync(postPath).isDirectory() && fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const frontmatter = {};
        frontmatterMatch[1].split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
            frontmatter[key.trim()] = value;
          }
        });
        
        posts.push({
          dir,
          title: frontmatter.title || dir,
          date: frontmatter.date || '',
          published: frontmatter.published !== 'false',
          path: indexPath
        });
      }
    }
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function openInEditor(filePath) {
  const editor = process.env.EDITOR || 'code';
  
  const child = spawn(editor, [filePath], {
    stdio: 'inherit',
    detached: true
  });
  
  child.on('error', (error) => {
    console.error(chalk.red(`Failed to open editor: ${error.message}`));
    console.log(chalk.yellow(`Try setting the EDITOR environment variable or make sure '${editor}' is installed.`));
  });
}

async function createNewPost() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Post title:',
      validate: input => input.trim() ? true : 'Title is required'
    },
    {
      type: 'confirm',
      name: 'published',
      message: 'Published?',
      default: false
    }
  ]);

  const today = new Date();
  const dateStr = formatDate(today);
  const slug = slugify(answers.title);
  const dirName = `${dateStr}-${slug}`;
  const postDir = path.join(BLOG_DIR, dirName);
  const postPath = path.join(postDir, 'index.md');

  // Create directory
  fs.mkdirSync(postDir, { recursive: true });

  // Create post content
  const content = `---
title: "${answers.title}"
date: "${dateStr}"
featured: 
published: ${answers.published}
---

Your blog post content goes here...
`;

  fs.writeFileSync(postPath, content);
  
  console.log(chalk.green(`✓ Created new post: ${dirName}`));
  console.log(chalk.blue(`  Location: ${postPath}`));
  
  openInEditor(postPath);
}

async function editExistingPost() {
  const posts = getAllPosts();
  
  if (posts.length === 0) {
    console.log(chalk.yellow('No blog posts found.'));
    return;
  }

  const choices = posts.map((post, index) => ({
    name: `${chalk.cyan((index + 1).toString().padStart(2))} ${post.title} ${chalk.gray(`(${post.date})`)} ${post.published ? chalk.green('✓') : chalk.red('✗')}`,
    value: post,
    short: post.title
  }));

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'post',
      message: 'Select a post to edit:',
      choices,
      pageSize: 15
    }
  ]);

  console.log(chalk.green(`Opening: ${answer.post.title}`));
  openInEditor(answer.post.path);
}

async function setupGlobalConfig() {
  const currentDir = process.cwd();
  const contentBlogPath = path.join(currentDir, 'content', 'blog');
  
  if (!fs.existsSync(contentBlogPath)) {
    console.error(chalk.red('Error: Current directory does not appear to be a blog project.'));
    console.error(chalk.yellow('Make sure you run this command from your blog project root directory.'));
    process.exit(1);
  }

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'method',
      message: 'How would you like to configure global access?',
      choices: [
        { name: 'Environment variable (recommended)', value: 'env' },
        { name: 'Config file (~/.blog-config.json)', value: 'config' }
      ]
    }
  ]);

  if (answers.method === 'env') {
    console.log(chalk.green('\nAdd this to your shell profile (~/.bashrc, ~/.zshrc, etc.):'));
    console.log(chalk.cyan(`export BLOG_PROJECT_ROOT="${currentDir}"`));
    console.log(chalk.yellow('\nThen restart your terminal or run: source ~/.bashrc (or ~/.zshrc)'));
  } else {
    const homeDir = require('os').homedir();
    const configPath = path.join(homeDir, '.blog-config.json');
    const config = { projectRoot: currentDir };
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(chalk.green(`✓ Created config file: ${configPath}`));
    console.log(chalk.green(`✓ Blog project root set to: ${currentDir}`));
  }
  
  console.log(chalk.blue('\nYou can now use the "blog" command from anywhere!'));
}

program
  .name('blog')
  .description('CLI tool for managing blog posts')
  .version('1.0.0');

program
  .command('new')
  .description('Create a new blog post')
  .action(createNewPost);

program
  .command('edit')
  .description('Edit an existing blog post')
  .action(editExistingPost);

program
  .command('setup')
  .description('Setup global configuration for blog command')
  .action(setupGlobalConfig);

// Default action (new post)
program
  .action(createNewPost);

program.parse();