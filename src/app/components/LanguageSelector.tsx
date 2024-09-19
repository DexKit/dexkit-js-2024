'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { locales, localeNames, defaultLocale } from '../i18n/config';

type Locale = typeof locales[number];

const flagImages: Record<Locale, string> = {
  en: '/flags/en.png',
  es: '/flags/es.png',
  pt: '/flags/pt.png',
};

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  slug: string;
  imageUrl: string;
  content?: string;
}

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pathLocale = pathname?.split('/')[1] as Locale;
    if (locales.includes(pathLocale)) {
      setCurrentLocale(pathLocale);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = async (newLocale: Locale) => {
    const currentPath = pathname || '/';
    const pathParts = currentPath.split('/').filter(Boolean);
    
    if (locales.includes(pathParts[0] as Locale) && pathParts[1] === 'blog' && pathParts.length > 2) {
      const currentSlug = pathParts[2];
      
      const newFolder = newLocale === 'en' ? 'blog' : `blog-${newLocale}`;
      
      try {
        const response = await fetch(`/api/blogPosts?locale=${newFolder}`);
        if (response.ok) {
          const posts = await response.json() as BlogPost[];
          
          const newPost = posts.find((post: BlogPost) => {
            const currentSlugBase = currentSlug.replace(/^(conozca-a-|conheca-|meet-)/, '');
            const postSlugBase = post.slug.replace(/^(conozca-a-|conheca-|meet-)/, '');
            return currentSlugBase === postSlugBase;
          });

          if (newPost) {
            router.push(`/${newLocale}/blog/${newPost.slug}`);
          } else {
            router.push(`/${newLocale}/blog`);
          }
        } else {
          router.push(`/${newLocale}/blog`);
        }
      } catch (error) {
        console.error('Error al cambiar el idioma del post:', error);
        router.push(`/${newLocale}/blog`);
      }
    } else {
      pathParts[0] = newLocale;
      const newPathname = `/${pathParts.join('/')}`;
      router.push(newPathname);
    }
    
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center space-x-2 px-3 py-2 border rounded-md bg-transparent hover:bg-orange-500 transition-colors duration-200"
      >
        <Image src={flagImages[currentLocale]} alt={localeNames[currentLocale]} width={20} height={15} className="rounded-sm" />
        <span className="text-sm font-medium text-white">{localeNames[currentLocale]}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => changeLanguage(locale)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-500 hover:text-white transition-colors duration-200"
                role="menuitem"
              >
                <Image src={flagImages[locale]} alt={localeNames[locale]} width={20} height={15} className="mr-3 rounded-sm" />
                <span>{localeNames[locale]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;