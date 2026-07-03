import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import matter from 'gray-matter';

export interface RssBlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  lang: string;
}

const LOCALES = ['en', 'es', 'pt'] as const;
const BASE_URL = 'https://dexkit.com';

export function parseBlogDate(dateString: string, locale: string): Date {
  if (locale === 'en') {
    return new Date(dateString);
  }

  const months: Record<string, number> =
    locale === 'es'
      ? {
          enero: 0,
          febrero: 1,
          marzo: 2,
          abril: 3,
          mayo: 4,
          junio: 5,
          julio: 6,
          agosto: 7,
          septiembre: 8,
          octubre: 9,
          noviembre: 10,
          diciembre: 11,
        }
      : {
          janeiro: 0,
          fevereiro: 1,
          março: 2,
          abril: 3,
          maio: 4,
          junho: 5,
          julho: 6,
          agosto: 7,
          setembro: 8,
          outubro: 9,
          novembro: 10,
          dezembro: 11,
        };

  const parts = dateString.split(' ');
  const day = parseInt(parts[0], 10);
  const month = parts[2].toLowerCase();
  const year = parseInt(parts[4], 10);
  return new Date(year, months[month], day);
}

export function getBlogPosts(locale: string): RssBlogPost[] {
  const localeFolder = locale === 'en' ? 'blog' : `blog-${locale}`;
  const postsDirectory = path.join(process.cwd(), 'content', localeFolder);
  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith('.md'));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title:
        data.title ||
        (locale === 'en' ? 'Untitled' : locale === 'es' ? 'Sin título' : 'Sem título'),
      date:
        data.date ||
        (locale === 'en'
          ? 'Date unavailable'
          : locale === 'es'
            ? 'Fecha no disponible'
            : 'Data não disponível'),
      author:
        data.author ||
        (locale === 'en' ? 'DexKit Team' : locale === 'es' ? 'Equipo DexKit' : 'Equipe DexKit'),
      category:
        data.category ||
        (locale === 'en' ? 'Uncategorized' : locale === 'es' ? 'Sin categoría' : 'Sem categoria'),
      imageUrl: data.imageUrl || '/imgs/dexkit_og.png',
      excerpt: data.excerpt || content.slice(0, 200),
      lang: locale,
    };
  });

  return posts.sort((a, b) => {
    try {
      return parseBlogDate(b.date, locale).getTime() - parseBlogDate(a.date, locale).getTime();
    } catch {
      console.error(`Error parsing dates: ${a.date} or ${b.date}`);
      return 0;
    }
  });
}

export function getAllBlogPosts(): RssBlogPost[] {
  const allPosts = LOCALES.flatMap((locale) => getBlogPosts(locale));

  return allPosts.sort(
    (a, b) => parseBlogDate(b.date, b.lang).getTime() - parseBlogDate(a.date, a.lang).getTime(),
  );
}

export function getNewestBlogPost(): RssBlogPost {
  const posts = getAllBlogPosts();
  if (posts.length === 0) {
    throw new Error('No blog posts found for RSS feed generation.');
  }
  return posts[0];
}

export function buildRssXml(): string {
  const feed = new RSS({
    title: 'DexKit Blog',
    description: 'Latest posts from DexKit Blog in English, Spanish, and Portuguese',
    feed_url: `${BASE_URL}/rss.xml`,
    site_url: BASE_URL,
    language: 'en',
  });

  getAllBlogPosts().forEach((post) => {
    const langPrefix = post.lang === 'en' ? '' : `/${post.lang}`;
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}${langPrefix}/blog/${post.slug}`,
      date: parseBlogDate(post.date, post.lang),
      author: post.author,
      categories: [post.category],
      enclosure: { url: post.imageUrl },
    });
  });

  return feed.xml({ indent: true });
}

export function writeRssFile(outputPath?: string): string {
  const rss = buildRssXml();
  const targetPath = outputPath ?? path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(targetPath, rss);
  return rss;
}
