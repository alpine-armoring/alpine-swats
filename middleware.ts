import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirects = new Map([['/index.html', '/']]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path should be noindexed (directory starts with or exact redirect match)
  const shouldNoindex =
    pathname.startsWith('/images') ||
    Array.from(redirects.keys()).some(
      (url) => pathname === url || pathname.startsWith(url + '/')
    );

  // Check for redirect
  const redirectTo = redirects.get(pathname);

  // If URL needs to be redirected
  if (redirectTo) {
    const response = NextResponse.redirect(new URL(redirectTo, request.url), {
      status: 301,
    });
    // Add noindex header if needed
    if (shouldNoindex) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return response;
  }

  // If URL only needs noindex
  if (shouldNoindex) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/images/:path*',
    '/vehicle-pages/:path*',
    '/pdf/:path*',
    '/:path*',
  ],
};
