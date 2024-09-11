import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  category: string;
  slug: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const filePath = path.join(process.cwd(), 'public', 'blog-posts.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf8');
    const posts = JSON.parse(jsonData);
    return posts.filter((post: BlogPost) => 
      post.id && post.title && post.slug
    );
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 text-white">The DexKit&apos;s Blog</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image 
                      src={post.imageUrl || '/imgs/default-blog-image.jpg'} 
                      alt={post.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm text-gray-500">{post.date || 'Date not available'}</span>
                      <span className="text-xs sm:text-sm bg-orange-400 text-white px-2 py-1 rounded-full">{post.category || 'Uncategorized'}</span>
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
                      <span className="text-sm text-gray-600">DexKit</span>
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