import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from './src/app/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {

    if (pathname === '/roadmap/roadmap') {
      return NextResponse.redirect(new URL('/roadmap', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};