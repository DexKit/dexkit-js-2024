'use client';

import { FormattedMessage } from 'react-intl';
import Image from 'next/image';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  contentHtml: string;
  excerpt?: string;
}

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-6 md:py-8">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">{post.title}</h1>
          
          <div className="flex items-center justify-center mb-4">
            <span className="text-sm md:text-base text-white mr-2">
              <FormattedMessage id="blog.post.by" defaultMessage="By:" />
            </span>
            <Image 
              src="/imgs/dexkit-logo-white-o-o.svg"
              alt="DexKit Logo" 
              width={60} 
              height={60} 
              className="mr-2"
            />
            <span className="text-sm md:text-base text-white">
              {post.author && `${post.author} `}
              <FormattedMessage id="blog.post.on" defaultMessage="on" /> {post.date}
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