import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return null;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/category/:path*', '/', '/apis/search'],
};
