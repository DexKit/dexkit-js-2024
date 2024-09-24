'use client';

import { IntlProvider } from 'react-intl';
import { useParams, usePathname, notFound } from 'next/navigation';
import messages from '@/app/i18n/messages';

type ValidLocale = keyof typeof messages;

function isValidLocale(locale: string): locale is ValidLocale {
  return locale in messages;
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams();
  const pathname = usePathname();
  const localeParam = params?.locale as string;
  
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    return <>{children}</>;
  }

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}