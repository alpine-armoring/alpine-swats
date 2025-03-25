import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const redirects = new Map([
  ['/index.html', '/'],
  ['/about.html', '/about-us'],
  ['/stock.html', '/swat-for-sale'],
  ['/ballistic-chart.html', '/ballistic-chart'],
  ['/contact.html', '/contact'],
  ['/pdf/Pit-Bull-VX.pdf', '/vehicles-we-build/armored-pit-bull-vx'],
  ['/pdf/UL-752.pdf', '/ballistic-chart'],
  ['/pdf/NIJ-Standards_0108_01.pdf', '/ballistic-chart'],
  ['/pdf/coming-soon.pdf', '/swat-for-sale'],
  ['/pdf/Cuda.pdf', '/vehicles-we-build/armored-cuda-apc-swat'],
  ['/pdf/European-Ballistic-Standards.pdf', '/ballistic-chart'],
  ['/vehicles/cuda.html', '/vehicles-we-build/armored-cuda-apc-swat'],
  ['/vehicles/vxt.html', '/vehicles-we-build/armored-pit-bull-vxt'],
  ['/vehicles/xl.html', '/vehicles-we-build/armored-pit-bull-vx'],
  [
    '/vehicles/pointer-gray.html',
    '/vehicles-we-build/armored-pointer-swat-van-transit',
  ],
  ['/vehicles/vx.html', '/vehicles-we-build/armored-pit-bull-vx'],
]);

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
    '/((?!_next/static|_next/image|favicon.ico|api|sitemap|robots|manifest|sw.js).*)',
  ],
};
