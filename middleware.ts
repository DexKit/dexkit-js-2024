import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, Locale } from './src/app/i18n/config';
import redirects from './redirects.json';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/auth') || pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  const publicFiles = ['robots.txt', 'sitemap.xml', 'favicon.ico'];
  if (publicFiles.some(file => pathname.endsWith(file))) {
    return NextResponse.next();
  }

  if (pathname in redirects) {
    const redirect = redirects[pathname as keyof typeof redirects];
    return NextResponse.redirect(new URL(redirect.destination, request.url), 
      redirect.permanent ? 308 : 307
    );
  }

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  if (pathname === '/roadmap/roadmap') {
    return NextResponse.redirect(new URL('/roadmap', request.url));
  }

  const userLanguage = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || defaultLocale;
  const locale = locales.includes(userLanguage as Locale) ? userLanguage : defaultLocale;

  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};