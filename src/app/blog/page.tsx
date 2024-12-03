import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Metadata } from 'next';
import { ClientBlogWrapper } from './ClientBlogWrapper';

export const metadata: Metadata = {
  title: 'DexKit Blog | News and Articles about Web3 and DeFi',
  description: 'Explore the latest news, tutorials, and analysis on Web3, DeFi, and the blockchain ecosystem in the official DexKit blog.',
  openGraph: {
    title: 'DexKit Blog | News and Articles about Web3 and DeFi',
    description: 'Explore the latest news, tutorials, and analysis on Web3, DeFi, and the blockchain ecosystem in the official DexKit blog.',
    images: [{ url: '/imgs/dexkit_og.png' }],
  },
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

const DEFAULT_IMAGE = '/imgs/dexkit_og.png';

function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
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
      imageUrl: data.imageUrl || DEFAULT_IMAGE,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 text-white">
            The DexKit&apos;s Blog
          </h1>
          <ClientBlogWrapper initialPosts={posts} />
        </div>
      </main>
    </div>
  );
}