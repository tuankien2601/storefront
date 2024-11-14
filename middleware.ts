import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/signin', '/signup'];
 
export default async function middleware(req: NextRequest) {
  return NextResponse.next()
}
 
export const config = {
  matcher: '/',
}