import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';

export const locales = ['en', 'es', 'pt'];
export const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  if (!Array.isArray(languages)) {
    languages = [languages];
  }

  return matchLocale(languages, locales, defaultLocale);
}

function matchLocale(languages: string[], locales: string[], defaultLocale: string): string {
  for (const language of languages) {
    const locale = locales.find(l => language.toLowerCase().startsWith(l.toLowerCase()));
    if (locale) return locale;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
