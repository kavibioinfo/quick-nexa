import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // 🎯 जर क्लायंटने onboard.ayushnexa.com उघडले तर त्याला थेट फॉर्मच्या पाथवर पाठवा
  if (hostname.includes('onboard.ayushnexa.com')) {
    if (url.pathname === '/') {
      url.pathname = '/onboard';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// Ensure the middleware executes on all basic routes
export const config = {
  matcher: ['/', '/onboard'],
};