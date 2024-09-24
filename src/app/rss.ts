import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  lang: string;
}

function parseDate(dateString: string, locale: string): Date {
  if (locale === 'en') {
    return new Date(dateString);
  }

  const months: { [key: string]: number } = locale === 'es' 
    ? {
        'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
        'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
      }
    : {
        'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3, 'maio': 4, 'junho': 5,
        'julho': 6, 'agosto': 7, 'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
      };

  const parts = dateString.split(' ');
  const day = parseInt(parts[0]);
  const month = parts[2].toLowerCase();
  const year = parseInt(parts[4]);
  return new Date(year, months[month], day);
}

function getBlogPosts(locale: string): BlogPost[] {
  const localeFolder = locale === 'en' ? 'blog' : `blog-${locale}`;
  const postsDirectory = path.join(process.cwd(), 'content', localeFolder);
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);  

    return {
      slug,
      title: data.title || (locale === 'en' ? 'Untitled' : locale === 'es' ? 'Sin título' : 'Sem título'),
      date: data.date || (locale === 'en' ? 'Date unavailable' : locale === 'es' ? 'Fecha no disponible' : 'Data não disponível'),
      author: data.author || (locale === 'en' ? 'DexKit Team' : locale === 'es' ? 'Equipo DexKit' : 'Equipe DexKit'),
      category: data.category || (locale === 'en' ? 'Uncategorized' : locale === 'es' ? 'Sin categoría' : 'Sem categoria'),
      imageUrl: data.imageUrl || '/imgs/dexkit_og.png',
      excerpt: data.excerpt || content.slice(0, 200),
      lang: locale,
    };
  });

  return posts.sort((a, b) => {
    try {
      const dateA = parseDate(a.date, locale);
      const dateB = parseDate(b.date, locale);
      return dateB.getTime() - dateA.getTime();
    } catch (error) {
      console.error(`Error parsing dates: ${a.date} or ${b.date}`);
      return 0; 
    }
  });
}

export default function generateRSS() {
  const feed = new RSS({
    title: 'DexKit Blog',
    description: 'Latest posts from DexKit Blog in English, Spanish, and Portuguese',
    feed_url: 'https://dexkit.com/rss.xml',
    site_url: 'https://dexkit.com',
    language: 'en',
  });

  const locales = ['en', 'es', 'pt'];
  const allPosts = locales.flatMap(locale => getBlogPosts(locale));

  allPosts.sort((a, b) => parseDate(b.date, b.lang).getTime() - parseDate(a.date, a.lang).getTime());

  allPosts.forEach(post => {
    const langPrefix = post.lang === 'en' ? '' : `/${post.lang}`;
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://dexkit.com${langPrefix}/blog/${post.slug}`,
      date: parseDate(post.date, post.lang),
      author: post.author,
      categories: [post.category],
      enclosure: { url: post.imageUrl },
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
}
