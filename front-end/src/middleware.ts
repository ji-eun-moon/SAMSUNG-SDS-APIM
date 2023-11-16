import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // 로그인 페이지 접근 시, 이미 로그인 되어 있다면 홈페이지로 리다이렉트
  if (pathname === '/login') {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // 로그인 페이지는 보호되지 않은 경로이므로, accessToken이 없어도 접근 가능
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/',
    '/admin',
    '/admin/:path*',
    '/apis/search',
    '/apis/status',
    '/apis/:path*',
    '/apply/:path*',
    '/category/:path*',
    '/member/:path*',
    '/notice/:path*',
    '/statistics/:path*',
    '/loadtest',
    '/monitoring',
    '/mypage',
  ],
};
