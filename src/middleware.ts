import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const home = new URL('/', request.url)
  const dashboard = new URL('/dashboard', request.url)

  const { pathname } = request.nextUrl

  if (pathname.startsWith('/login')) {
    if (!token) {
      return NextResponse.next()
    }
    return NextResponse.redirect(dashboard)
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(home)
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/login'],
}
