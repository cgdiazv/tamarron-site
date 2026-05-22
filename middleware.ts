import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // 👈 CORREGIDO: Ahora viene de 'next/server'

export function middleware(request: NextRequest) {
  // 1. Extraemos la cookie de autenticación
  const sessionToken = request.cookies.get('admin_session')?.value;

  const { pathname } = request.nextUrl;

  // 2. Si el usuario intenta entrar al dashboard pero NO tiene el token, lo redirigimos al login
  if (pathname.startsWith('/admin/dashboard') && !sessionToken) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // 3. Si ya está logueado e intenta entrar a /admin (login), lo mandamos directo al dashboard
  if (pathname === '/admin' && sessionToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// 🎯 El Matcher para indicar a qué rutas aplica este Middleware
export const config = {
  matcher: ['/admin', '/admin/dashboard/:path*'],
};