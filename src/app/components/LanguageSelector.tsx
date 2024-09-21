'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { locales, localeNames, defaultLocale } from '../i18n/config';

type Locale = typeof locales[number];

const flagImages: Record<Locale, string> = {
  en: '/flags/en.png',
  es: '/flags/es.png',
  pt: '/flags/pt.png',
};

interface LanguageSelectorProps {
  textColor: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ textColor }) => {
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

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    const currentPath = pathname || '/';
    const pathParts = currentPath.split('/').filter(Boolean);
    
    let newPathname: string;

    if (pathParts.length > 0 && locales.includes(pathParts[0] as Locale)) {
      pathParts[0] = newLocale;
      newPathname = `/${pathParts.join('/')}`;
    } else {
      newPathname = `/${newLocale}${currentPath}`;
    }

    if (pathParts.length > 2 && pathParts[1] === 'blog') {
      newPathname = `/${newLocale}/blog`;
    }

    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center space-x-2 px-3 py-2 border rounded-md bg-transparent hover:bg-orange-500 transition-colors duration-200 w-full justify-between ${textColor}`}
      >
        <div className="flex items-center">
          <Image src={flagImages[currentLocale]} alt={localeNames[currentLocale]} width={20} height={15} className="rounded-sm mr-2" />
          <span className={`text-sm font-medium ${textColor}`}>{localeNames[currentLocale]}</span>
        </div>
        <svg className={`w-4 h-4 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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