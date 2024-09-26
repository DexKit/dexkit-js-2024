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

  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) {
    if (!pathname.startsWith('/en/') && pathname !== '/en') {
      return NextResponse.next();
    }
    const newPathname = pathname.replace(/^\/en/, '');
    return NextResponse.redirect(new URL(newPathname || '/', request.url));
  }

  if (pathname === '/roadmap/roadmap') {
    return NextResponse.redirect(new URL('/roadmap', request.url));
  }

  if (!redirects.hasOwnProperty(pathname) && pathname !== '/') {
    return NextResponse.redirect(new URL(`/404`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};