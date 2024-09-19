import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from './src/app/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};