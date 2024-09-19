import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'blog';

  const postsDirectory = path.join(process.cwd(), 'content', locale);
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);  

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || 'Date unavailable',
      author: data.author || 'DexKit Team',
      category: data.category || 'Uncategorized',
      imageUrl: data.imageUrl || '/imgs/dexkit_og.png',
    };
  });

  return NextResponse.json(posts);
}