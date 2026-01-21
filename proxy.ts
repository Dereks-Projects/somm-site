import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Countries to block
const BLOCKED_COUNTRIES = ['RU', 'CN', 'VN', 'IQ', 'KP', 'IR']

// Suspicious URL patterns (common bot probes)
const BLOCKED_PATHS = [
  '/wp-admin',
  '/wp-login',
  '/xmlrpc.php',
  '/.env',
  '/phpMyAdmin',
  '/admin.php',
  '/.git',
  '/config.php',
]

export function proxy(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country') || ''
  const userAgent = request.headers.get('user-agent') || ''
  const pathname = request.nextUrl.pathname.toLowerCase()

  // Block by country
  if (BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse('Access denied.', { status: 403 })
  }

  // Block empty or suspicious User-Agents
  if (!userAgent || userAgent.length < 10) {
    return new NextResponse('Access denied.', { status: 403 })
  }

  // Block suspicious paths
  if (BLOCKED_PATHS.some(path => pathname.startsWith(path))) {
    return new NextResponse('Not found.', { status: 404 })
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