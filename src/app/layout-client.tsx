'use client';

import { useEffect, useState, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import dynamic from 'next/dynamic';

import { locales, defaultLocale } from './i18n/config';
import SkeletonLoader from './components/SkeletonLoader';

const ThemeWrapper = dynamic(() => import('./components/ThemeWrapper'), { ssr: false });
const Header = dynamic(() => import('./components/Header'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

type Locale = typeof locales[number];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState({});
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname?.split('/') || [];
    const currentLocale = pathParts[1] as Locale;
    if (locales.includes(currentLocale)) {
      setLocale(currentLocale);
    } else {
      setLocale(defaultLocale);
    }
  }, [pathname]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messagesModule = await import(`./i18n/messages/${locale}.ts`);
        setMessages(messagesModule.default);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();
  }, [locale]);

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
        strategy="lazyOnload"
      />
      <Suspense fallback={<SkeletonLoader />}>
        <ThemeWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeWrapper>
      </Suspense>
    </IntlProvider>
  );
}