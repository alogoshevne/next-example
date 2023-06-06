import { NextRequest, NextResponse } from 'next/server';

import { verifyEnvironment } from '@helpers/env';

export const config = {
  matcher: ['/', '/index'],
};

export function middleware(req: NextRequest) {
  const { isDevelopment } = verifyEnvironment();

  if (!isDevelopment) {
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (
        user === process.env.HTPASSW_USERNAME &&
        pwd === process.env.HTPASSW_PASS
      ) {
        return NextResponse.next();
      }
    }
    url.pathname = '/api/auth';

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
