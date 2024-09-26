import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from './src/app/i18n/config';
import redirects from './redirects.json';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
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

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    if (!redirects.hasOwnProperty(pathname) && pathname !== '/roadmap/roadmap') {
      return NextResponse.redirect(new URL(`/${locales[0]}/404`, request.url));
    }

    if (pathname === '/roadmap/roadmap') {
      return NextResponse.redirect(new URL('/roadmap', request.url));
    }

    return NextResponse.redirect(new URL(`/${locales[0]}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};