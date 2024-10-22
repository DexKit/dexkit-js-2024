import messages, { Messages } from './messages';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'es', 'pt'] as const;

export type Locale = typeof locales[number];

export const localeNames: { [key in Locale]: string } = {
  en: 'English',
  es: 'Espa\u00F1ol',
  pt: 'Portugu\u00EAs'
};

export async function loadMessages(locale: Locale): Promise<Messages> {
  return messages[locale];
}