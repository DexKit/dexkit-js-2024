import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  author: string;
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
        <div className="container mx-auto px-4 py-6 md:py-8">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">{post.title}</h1>
          
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm md:text-base text-white mr-2">By:</span>
            <Image 
              src="/imgs/dexkit-logo-white-o-o.svg"
              alt="DexKit Logo" 
              width={60} 
              height={60} 
              className="mr-2"
            />
            <span className="text-sm md:text-base text-white">
              {post.author} <span className="mx-1">on</span> {post.date}
            </span>
          </div>

          <div className="relative w-full max-w-3xl mx-auto aspect-[1200/630] mb-6 md:mb-8">
            <Image 
              src={post.imageUrl} 
              alt={post.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 768px"
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div 
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none py-4 md:py-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}