import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const path = request.nextUrl.pathname

  // Protection espace client
  const protectedPaths = ['/espace-client/tableau-de-bord', '/espace-client/reparations', '/espace-client/commandes', '/espace-client/profil']
  if (protectedPaths.some(p => path.startsWith(p)) && !session) {
    return NextResponse.redirect(new URL('/espace-client/connexion', request.url))
  }

  // Redirection si déjà connecté
  if ((path === '/espace-client/connexion' || path === '/espace-client/inscription') && session) {
    return NextResponse.redirect(new URL('/espace-client/tableau-de-bord', request.url))
  }

  return response
}

export const config = {
  matcher: ['/espace-client/:path*', '/admin/:path*'],
}
