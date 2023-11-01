import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set('Content-Type', 'application/json');
  // requestHeaders.set('Cookies', `token=${accessToken}`);
  // return NextResponse.next({
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });
  return null;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/category/:path*', '/', '/apis/search'],
};
