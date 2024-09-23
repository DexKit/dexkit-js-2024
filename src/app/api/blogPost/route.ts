import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') || 'blog';

  if (!slug) {
    return NextResponse.json({ error: 'Slug not provided' }, { status: 400 });
  }

  const postsDirectory = path.join(process.cwd(), 'content', locale);
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    const post = {
      slug,
      title: data.title || 'Untitled',
      date: data.date || 'Date not available',
      author: data.author && data.author !== 'DexKit Team' ? data.author : '',
      category: data.category || 'Uncategorized',
      imageUrl: data.imageUrl || '/imgs/dexkit_og.png',
      excerpt: data.excerpt || '',
      contentHtml,
    };

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error reading blog post:', error);
    return NextResponse.json({ error: 'Error fetching blog post' }, { status: 500 });
  }
}