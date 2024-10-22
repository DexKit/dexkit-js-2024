import { headers } from 'next/headers';
import messages from '@/app/i18n/messages';

export function getLocale() {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  if (pathname.startsWith('/es')) return 'es';
  if (pathname.startsWith('/pt')) return 'pt';
  return 'en';
}

export function getMessage(key: string, locale: string): string {
  const localeMessages = messages[locale as keyof typeof messages] || messages.en;
  return localeMessages[key as keyof typeof localeMessages] || key;
}