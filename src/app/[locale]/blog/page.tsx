'use client'

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { defaultLocale } from '../../i18n/config';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

const DEFAULT_IMAGE = '/imgs/dexkit_og.png';

function parseCustomDate(dateString: string, locale: string): Date {
  const months: { [key: string]: { [key: string]: number } } = {
    es: {
      'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
      'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
    },
    pt: {
      'janeiro': 0, 'fevereiro': 1, 'março': 2, 'abril': 3, 'maio': 4, 'junho': 5,
      'julho': 6, 'agosto': 7, 'setembro': 8, 'outubro': 9, 'novembro': 10, 'dezembro': 11
    },
    en: {
      'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
      'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
    }
  };

  const parts = dateString.split(' ');
  const day = parseInt(parts[0]);
  const month = parts[2].toLowerCase();
  const year = parseInt(parts[4]);

  const monthIndex = months[locale as keyof typeof months][month];

  if (monthIndex === undefined) {
    return new Date(dateString);
  }

  return new Date(year, monthIndex, day);
}

export default function BlogPage() {
  const params = useParams();
  const locale = (params?.locale as string) || defaultLocale;
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const localeFolder = locale === 'en' ? 'blog' : `blog-${locale}`;
      const response = await fetch(`/api/blogPosts?locale=${localeFolder}`);
      const data = await response.json();
      
      const sortedPosts = data.sort((a: BlogPost, b: BlogPost) => {
        const dateA = parseCustomDate(a.date, locale);
        const dateB = parseCustomDate(b.date, locale);
        return dateB.getTime() - dateA.getTime();
      });
      
      setPosts(sortedPosts);
    }
    fetchPosts();
  }, [locale]);

  const getBlogTitle = () => {
    switch(locale) {
      case 'es':
        return "El Blog de DexKit";
      case 'pt':
        return "O Blog da DexKit";
      default:
        return "DexKit's Blog";
    }
  }

  return (
    <div className="min-h-screen">
      <main>
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 text-white">
            {getBlogTitle()}
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image 
                      src={post.imageUrl || DEFAULT_IMAGE}
                      alt={post.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
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
                      <span className="text-sm text-gray-600">
                        {locale === 'en' ? 'DexKit Team' : 'Equipo DexKit'}
                      </span>
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