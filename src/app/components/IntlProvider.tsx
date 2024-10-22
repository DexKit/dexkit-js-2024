'use client';

import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { useEffect, useState } from 'react';
import { defaultLocale, Locale } from '../i18n/config';
import { Messages } from '../i18n/types';
import SkeletonLoader from './SkeletonLoader';

const messages: Record<string, Messages> = {};

export function IntlProvider({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const [loadedMessages, setLoadedMessages] = useState<Messages | null>(null);

  useEffect(() => {
    if (!messages[locale]) {
      import(`../i18n/messages/${locale}.ts`)
        .then((module) => {
          messages[locale] = module.default;
          setLoadedMessages(module.default);
        })
        .catch((error) => {
          console.error(`Error loading messages for ${locale}:`, error);
          setLoadedMessages(messages[defaultLocale]);
        });
    } else {
      setLoadedMessages(messages[locale]);
    }
  }, [locale]);

  if (!loadedMessages) {
    return <SkeletonLoader />;
  }

  return (
    <ReactIntlProvider 
      messages={loadedMessages} 
      locale={locale} 
      defaultLocale={defaultLocale}
    >
      {children}
    </ReactIntlProvider>
  );
}