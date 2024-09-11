import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  category: string;
  slug: string;
  content: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(process.cwd(), 'public', 'blog-posts.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const posts: BlogPost[] = JSON.parse(jsonData);
  return posts.find(post => post.slug === slug) || null;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white">{post.title}</h1>
          
          <div className="flex items-center justify-center mb-8">
            <Image 
              src="/imgs/dexkit-logo-white.svg"
              alt="DexKit Logo" 
              width={40} 
              height={40} 
              className="mr-4"
            />
            <span className="text-xl text-white">{post.date}</span>
          </div>

          <div className="relative w-full h-[50vh] mb-8">
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="w-full bg-white shadow-lg">
          <div className="container mx-auto">
            <div 
              className="prose prose-lg max-w-none py-16 px-4 md:px-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}