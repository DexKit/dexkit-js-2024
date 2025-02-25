'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '@/app/components/SearchBar';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

const DEFAULT_IMAGE = '/imgs/dexkit_og.png';

interface ClientBlogWrapperProps {
  initialPosts: BlogPost[];
}

export function ClientBlogWrapper({ initialPosts }: ClientBlogWrapperProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = initialPosts.filter(post => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <SearchBar 
        placeholder="Search articles..."
        onSearch={setSearchTerm}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPosts.map((post) => (
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
                  <span className="text-xs sm:text-sm bg-orange-400 text-white px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                <div className="flex items-center">
                  <Image 
                    src="/imgs/dexkit-logo-black-d.svg"
                    alt="DexKit Logo" 
                    width={24} 
                    height={24} 
                    className="mr-2"
                  />
                  <span className="text-sm sm:text-base text-gray-600">DexKit Team</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No articles found
        </div>
      )}
    </>
  );
}