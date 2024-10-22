'use client';

import { IntlProvider } from 'react-intl';
import { useParams, usePathname, notFound } from 'next/navigation';
import messages from '@/app/i18n/messages';

type ValidLocale = keyof typeof messages;

function isValidLocale(locale: string): locale is ValidLocale {
  return locale in messages;
}

export default function ClientLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const params = useParams();
  const pathname = usePathname();
  const localeParam = locale || params?.locale as string;
  
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    return <>{children}</>;
  }

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  return (
    <IntlProvider messages={messages[localeParam]} locale={localeParam} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}