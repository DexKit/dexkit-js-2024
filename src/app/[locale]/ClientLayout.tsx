'use client';

import { IntlProvider } from 'react-intl';
import { Locale, loadMessages } from '../i18n/config';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ClientLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  return (
    <IntlProvider messages={messages} locale={locale}>
      <Header />
      <main>{children}</main>
      <Footer />
    </IntlProvider>
  );
}