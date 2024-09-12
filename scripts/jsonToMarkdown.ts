import fs from 'fs/promises';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl: string;
}

const turndownService = new TurndownService();

async function extractMarkdownFiles(): Promise<void> {
  try {
    const jsonData = await fs.readFile('public/blog-posts.json', 'utf-8');
    const blogPosts: BlogPost[] = JSON.parse(jsonData);

    const outputDir = path.join(process.cwd(), 'content', 'blog');
    await fs.mkdir(outputDir, { recursive: true });

    for (const post of blogPosts) {
      const { title, date, content, excerpt, slug, category, imageUrl } = post;

      const dom = new JSDOM(content);
      const cleanedHtml = dom.window.document.body.innerHTML;

      const markdown = turndownService.turndown(cleanedHtml);

      const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
excerpt: "${excerpt.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
category: "${category}"
slug: "${slug}"
imageUrl: "${imageUrl}"
---

`;

      const fullMarkdown = frontmatter + markdown;

      const safeSlug = slug.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      const fileName = `${safeSlug}.md`;

      await fs.writeFile(path.join(outputDir, fileName), fullMarkdown);

      console.log(`File created: ${fileName}`);
    }

    console.log('Markdown files extracted successfully.');
  } catch (error) {
    console.error('Error extracting markdown files:', error);
  }
}

extractMarkdownFiles().catch(console.error);