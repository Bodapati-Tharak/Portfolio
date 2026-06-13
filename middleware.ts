import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isApiAdminRoute = req.nextUrl.pathname.startsWith('/api/admin');
    const isLoginPage = req.nextUrl.pathname === '/admin/login';

    // Allow login page
    if (isLoginPage) {
      // If already authenticated, redirect to dashboard
      if (token) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return NextResponse.next();
    }

    // Protect admin routes
    if ((isAdminRoute || isApiAdminRoute) && !token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isLoginPage = req.nextUrl.pathname === '/admin/login';
        if (isLoginPage) return true;
        // For protected routes, require token
        if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
