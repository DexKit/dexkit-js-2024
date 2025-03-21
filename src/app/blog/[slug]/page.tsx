import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  contentHtml: string;
  excerpt?: string;
}

async function getPostData(slug: string): Promise<BlogPost | null> {
  const postsDirectory = path.join(process.cwd(), 'content', 'blog');
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      category: data.category,
      imageUrl: data.imageUrl,
      contentHtml,
      excerpt: data.excerpt || content.slice(0, 160) + '...',
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostData(params.slug);
  if (!post) {
    return {
      title: 'Post not found',
      description: 'The requested blog post could not be found.',
    };
  }
  return {
    title: `${post.title} | DexKit Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imageUrl }],
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-6 md:py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-white">{post.title}</h1>
          
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm sm:text-base md:text-lg text-white mr-2">By:</span>
            <Image 
              src="/imgs/dexkit-logo-white-o-o.svg"
              alt="DexKit Logo" 
              width={60} 
              height={60} 
              className="mr-2"
            />
            <span className="text-sm sm:text-base md:text-lg text-white">
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
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}