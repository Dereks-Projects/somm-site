import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Countries to block (ISO country codes)
const BLOCKED_COUNTRIES = ['RU', 'CN']

export function proxy(request: NextRequest) {
  // Get country from Vercel's header
  const country = request.headers.get('x-vercel-ip-country') || ''

  // If blocked country, return 403 forbidden
  if (BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse('Access denied.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' }
    })
  }

  // Everyone else passes through
  return NextResponse.next()
}

// Apply to all routes except static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg).*)',
  ],
}