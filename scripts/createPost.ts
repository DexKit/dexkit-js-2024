import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createPost(): Promise<void> {
  const title = await question('Enter the post title: ');
  const slug = await question('Enter the slug (URL-friendly version of the title): ');
  const author = await question('Enter the author name (or press enter for "DexKit"): ') || 'DexKit';
  const category = await question('Enter the category: ') || 'Uncategorized';
  const imageUrl = await question('Enter the image URL: ') || '/imgs/default-blog-image.jpg';

  const date = new Date().toISOString().split('T')[0];

  const content = `---
title: "${title}"
date: "${date}"
author: "${author}"
category: "${category}"
slug: "${slug}"
imageUrl: "${imageUrl}"
---

Write your post content here...
`;

  const fileName = `${slug}.md`;
  const filePath = path.join(process.cwd(), 'content', 'blog', fileName);

  fs.writeFileSync(filePath, content);

  console.log(`New post created at ${filePath}`);
  rl.close();
}

createPost().catch(console.error);