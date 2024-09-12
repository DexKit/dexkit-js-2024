import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

const DEFAULT_IMAGE = '/imgs/default-blog-image.jpg';

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
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 text-white">The DexKit&apos;s Blog</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image 
                      src={post.imageUrl || DEFAULT_IMAGE}
                      alt={post.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-500">{post.date}</span>
                      <span className="text-xs sm:text-sm bg-orange-400 text-white px-2 py-1 rounded-full">{post.category}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                    <div className="flex items-center">
                      <Image 
                        src="/imgs/dexkit-logo-black-d.svg"
                        alt="DexKit Logo" 
                        width={24} 
                        height={24} 
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}