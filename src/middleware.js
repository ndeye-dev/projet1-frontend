import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token'); // Vérifie si un token est stocké dans les cookies

  const privateRoutes = ['/admin',  '/favoris', '/produits', '/paniers', '/profil',]; // Routes privées

  if (privateRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/auth/connexion', request.url)); // Redirige si pas de token
  }

  return NextResponse.next();
}

// Applique le middleware uniquement aux routes spécifiées
export const config = {
  matcher: ['/admin/:path*', '/favoris/:path*', '/produits/:path*', '/paniers/:path*', '/profil/:path*',], 
};
