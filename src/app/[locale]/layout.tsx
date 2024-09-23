'use client';

import { IntlProvider } from 'react-intl';
import { useParams } from 'next/navigation';
import messages from '@/app/i18n/messages';

// Definimos los locales válidos
type ValidLocale = keyof typeof messages;

// Función para verificar si un locale es válido
function isValidLocale(locale: string): locale is ValidLocale {
  return locale in messages;
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams();
  const localeParam = params?.locale as string;
  
  // Verificamos si el locale es válido, si no, usamos 'en'
  const locale = isValidLocale(localeParam) ? localeParam : 'en';

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}