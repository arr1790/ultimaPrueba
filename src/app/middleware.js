import { NextResponse } from "next/server";
import { getCookie, updateCookie } from "@/lib/cookies";

const LOGIN_URL = '/' // esta es la url

export async function middleware(request) {
  const cookie = await getCookie('session') //captura las cookies  (en las cabeceras del request le mandamos las cookies)
  console.log('MIDDLEWARE ', request.nextUrl.pathname); // nextUrl es una extension de request (que tiene muchas propiedades)


  if (cookie) {   //si existe alguna cookie con el nombre session lo que hacemos es renovar 
    // HAY SESIÓN
    // renovamos sesión ampliando tiempo de expiración de la cookie
    const newCookie = updateCookie('session', cookie) //si existe la cookie, la renovamos

    const response = NextResponse.next();
    response.cookies.set(newCookie)

    return response // todo esta if hace actuar el tiempo de la cookie 
  }

  // NO HAY SESIÓN (si no hay cookie)
  if (request.nextUrl.pathname != LOGIN_URL) {  // Si página distinta de LOGIN_URL (comprueba si es distinta de LOGIN_URL) 
 
    const loginUrl = new URL(LOGIN_URL, request.url) //se crea una url que van a tener una url nueva 
    
    // Colocamos en callbackUrl la dirección a la que volver tras login exitoso
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    //para comprobar podemos hacer con un console.log(request.url)

    return NextResponse.redirect(loginUrl)    // redirigimos a LOGIN_URL con callbackUrl
  }

}


export const config = {
  matcher: [
    /*
     * Todas las rutas excepto las que comienzan por:
     * - /api (API routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
