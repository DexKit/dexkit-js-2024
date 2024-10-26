import { useRouter } from 'next/router';
import { defaultLocale, Locale } from './config';

export function useLocale() {
  const router = useRouter();
  const locale = (router.locale || defaultLocale) as Locale;
  return { locale };
}