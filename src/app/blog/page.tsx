import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  imageUrl: string | null;
  category: string;
  slug: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const filePath = path.join(process.cwd(), 'public', 'blog-posts.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen text-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold text-center mb-16">The DexKit Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                {post.imageUrl ? (
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-400">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}