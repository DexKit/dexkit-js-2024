'use client';

import ThemeWrapper from './components/ThemeWrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import { IntlProvider } from 'react-intl';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { locales, defaultLocale } from './i18n/config';

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

  if (Object.keys(messages).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"
        strategy="lazyOnload"
      />
      <ThemeWrapper>
        <Header />
        <main>{children}</main>
        <Footer />
      </ThemeWrapper>
    </IntlProvider>
  );
}