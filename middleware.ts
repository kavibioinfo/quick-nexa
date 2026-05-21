import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // 🎯 STRICT RULE: जर युझरने onboard.ayushnexa.com हे डोमेन उघडले असेल
  if (hostname.includes('onboard.ayushnexa.com')) {
    // जर तो होमपेजवर ('/') असेल, तर त्याला चोरून बॅकग्राउंडला /onboard वर पाठवा
    if (pathname === '/') {
      const onboardUrl = new URL('/onboard', request.url);
      return NextResponse.rewrite(onboardUrl);
    }
  }

  return NextResponse.next();
}

// Secure matching array matrix configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};