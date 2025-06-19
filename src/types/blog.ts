export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  published: boolean;
  featured?: string;
  content: string;
  excerpt: string;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  published: boolean;
  featured?: string;
}