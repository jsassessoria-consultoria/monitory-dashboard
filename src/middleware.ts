import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  /*const sessao = await getToken({
    req,
    cookieName: 'next-auth.session-token'
  });
  if (sessao === null) {
    const { origin } = new URL(req.url);
    return NextResponse.redirect(origin);
  }*/
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/device']
};
