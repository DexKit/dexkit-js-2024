'use client';

import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { defaultLocale, locales } from '../i18n/config';
import { Messages } from '../i18n/types';
import SkeletonLoader from './SkeletonLoader';

const messages: Record<string, Messages> = {};

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeLocale, setActiveLocale] = useState<typeof locales[number]>(defaultLocale);
  const [loadedMessages, setLoadedMessages] = useState<Messages | null>(null);

  useEffect(() => {
    const pathLocale = pathname?.split('/')[1] as typeof locales[number];
    const newLocale = locales.includes(pathLocale) ? pathLocale : defaultLocale;
    setActiveLocale(newLocale);

    if (!messages[newLocale]) {
      import(`../i18n/messages/${newLocale}.ts`)
        .then((module) => {
          messages[newLocale] = module.default;
          setLoadedMessages(module.default);
        })
        .catch((error) => {
          console.error(`Error loading messages for ${newLocale}:`, error);
          setLoadedMessages(messages[defaultLocale]);
        });
    } else {
      setLoadedMessages(messages[newLocale]);
    }
  }, [pathname]);

  if (!loadedMessages) {
    return <SkeletonLoader />;
  }

  return (
    <ReactIntlProvider 
      messages={loadedMessages} 
      locale={activeLocale} 
      defaultLocale={defaultLocale}
    >
      {children}
    </ReactIntlProvider>
  );
}