import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import * as cheerio from 'cheerio';

async function downloadImage(url: string, filepath: string): Promise<void> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  await fs.writeFile(filepath, Buffer.from(buffer));
}

function normalizeHeaders(content: string): string {
  const $ = cheerio.load(content);
  
  $('form').remove();

  $(':contains("Share with your friends")').closest('div').remove();
  $(':contains("Your Name")').closest('div').remove();
  $(':contains("Your Email")').closest('div').remove();
  $(':contains("Recipient Email")').closest('div').remove();
  $(':contains("Enter a Message")').closest('div').remove();
  $(':contains("Captcha")').closest('div').remove();
  $(':contains("Submit")').closest('div').remove();

  $('script').remove();
  $('style').remove();
  $('[style]').removeAttr('style');

  $('img').each((i, elem) => {
    const $img = $(elem);
    if (!$img.parent().is('figure')) {
      $img.wrap('<figure style="text-align: center;"></figure>');
    } else {
      $img.parent().css('text-align', 'center');
    }
  });

  $('figure').css('text-align', 'center');

  return $.html();
}

interface WPPost {
  id: number;
  title: { rendered: string };
  date: string;
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  _embedded: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term': Array<Array<{ name: string }>>;
  };
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl: string | null;
}

async function fetchPosts(): Promise<BlogPost[]> {
  const response = await fetch('https://dexkit.com/wp-json/wp/v2/posts?_embed&per_page=100');
  const posts = await response.json() as WPPost[];
  return Promise.all(posts.map(async post => {
    let imageUrl = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : null;
    if (imageUrl) {
      const filename = path.basename(imageUrl);
      const filepath = path.join(process.cwd(), 'public', 'blog-images', filename);
      await downloadImage(imageUrl, filepath);
      imageUrl = `/blog-images/${filename}`;
    }
    return {
      id: post.id,
      title: post.title.rendered.replace(/&#8217;/g, "'"),
      date: new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      content: normalizeHeaders(post.content.rendered),
      excerpt: post.excerpt.rendered,
      slug: post.slug,
      category: post._embedded['wp:term'][0][0].name,
      imageUrl: imageUrl
    };
  }));
}

async function savePosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile('public/blog-posts.json', JSON.stringify(posts, null, 2));
}

async function migrate(): Promise<void> {
  await fs.mkdir(path.join(process.cwd(), 'public', 'blog-images'), { recursive: true });
  const posts = await fetchPosts();
  await savePosts(posts);
  console.log('Migration completed successfully!');
}

migrate().catch(console.error);