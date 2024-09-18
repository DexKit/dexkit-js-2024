import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import { defaultLocale, locales } from '../i18n/config';
import en from '../i18n/messages/en';
import es from '../i18n/messages/es';
import pt from '../i18n/messages/pt';
import { Messages } from '../i18n/types';

const messages: Record<string, Messages> = { en, es, pt };

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const { locale = defaultLocale } = useRouter();
  const activeLocale = locales.includes(locale as typeof locales[number]) ? locale as typeof locales[number] : defaultLocale;

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