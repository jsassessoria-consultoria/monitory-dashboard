import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.method === 'POST') {
    return NextResponse.next();
  }

  const sessao = await getToken({
    req,
    cookieName: 'next-auth.session-token'
  });
  if (sessao === null) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'authentication failed'
      }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' }
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/device']
};
