'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { locales, localeNames, defaultLocale } from '../i18n/config';

type Locale = typeof locales[number];

const flagImages: Record<Locale, string> = {
  en: '/flags/en.png',
  es: '/flags/es.png',
  pt: '/flags/pt.png',
};

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultLocale);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const pathLocale = pathname?.split('/')[1] as Locale;
    if (locales.includes(pathLocale)) {
      setCurrentLocale(pathLocale);
    }
  }, [pathname]);

  const changeLanguage = (newLocale: Locale) => {
    const currentPath = pathname || '/';
    const pathParts = currentPath.split('/').filter(Boolean);
    
    if (locales.includes(pathParts[0] as Locale)) {
      pathParts[0] = newLocale;
    } else {
      pathParts.unshift(newLocale);
    }

    const newPathname = `/${pathParts.join('/')}`;
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="languageSelector">
      <button onClick={() => setIsOpen(!isOpen)} className="currentFlag">
        <Image src={flagImages[currentLocale]} alt={localeNames[currentLocale]} width={30} height={20} />
      </button>
      {isOpen && (
        <div className="dropdown">
          {locales.map((locale) => (
            <button key={locale} onClick={() => changeLanguage(locale)} className="option">
              <Image src={flagImages[locale]} alt={localeNames[locale]} width={30} height={20} />
              <span>{localeNames[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;