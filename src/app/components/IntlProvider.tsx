'use client';

import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { defaultLocale, locales } from '../i18n/config';
import en from '../i18n/messages/en';
import es from '../i18n/messages/es';
import pt from '../i18n/messages/pt';
import { Messages } from '../i18n/types';

const messages: Record<string, Messages> = { en, es, pt };

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeLocale, setActiveLocale] = useState<typeof locales[number]>(defaultLocale);

  useEffect(() => {
    const pathLocale = pathname?.split('/')[1] as typeof locales[number];
    if (locales.includes(pathLocale)) {
      setActiveLocale(pathLocale);
    } else {
      setActiveLocale(defaultLocale);
    }
  }, [pathname]);

  return (
    <ReactIntlProvider 
      messages={messages[activeLocale] ?? messages[defaultLocale]} 
      locale={activeLocale} 
      defaultLocale={defaultLocale}
    >
      {children}
    </ReactIntlProvider>
  );
}