import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost } from '@/app/components/BlogPostPage';

export async function getPostData(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const localeFolder = locale === 'en' ? 'blog' : `blog-${locale}`;
    const postsDirectory = path.join(process.cwd(), 'content', localeFolder);
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || 'Date not available',
      author: data.author && data.author !== 'DexKit Team' ? data.author : '',
      category: data.category || 'Uncategorized',
      imageUrl: data.imageUrl || '/imgs/dexkit_og.png',
      excerpt: data.excerpt || '',
      contentHtml,
    };
  } catch (error) {
    console.error(`Error fetching post data for slug ${slug} and locale ${locale}:`, error);
    return null;
  }
}
