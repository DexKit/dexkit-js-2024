import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'blog';

  const postsDirectory = path.join(process.cwd(), 'content', locale);
  
  try {
    const fileNames = await fs.readdir(postsDirectory);
  
    const posts = await Promise.all(fileNames.filter(fileName => fileName.endsWith('.md')).map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || 'No data available',
        author: data.author || 'DexKit Team',
        category: data.category || 'Uncategorized',
        imageUrl: data.imageUrl || '/imgs/dexkit_og.png',
        excerpt: data.excerpt || '',
      };
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return NextResponse.json({ error: 'Error reading blog posts' }, { status: 500 });
  }
}