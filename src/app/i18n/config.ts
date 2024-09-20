export const defaultLocale = 'en' as const;
export const locales = ['en', 'es', 'pt'] as const;

export type Locale = typeof locales[number];

export const localeNames: { [key in Locale]: string } = {
  en: 'English',
  es: 'Español',
  pt: 'Português'
};

export async function loadMessages(locale: Locale) {
  const messages = await import(`./messages/${locale}.ts`);
  return messages.default;
}