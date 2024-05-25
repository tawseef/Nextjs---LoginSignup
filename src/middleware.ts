import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === "/" || path === "/signup" || path==="/login";
    const token = cookies().get("token")?.value || "";
    
    // console.log(isPublicPath);

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    // if(token){
    //     return NextResponse.redirect(new URL('/profile', request.url))
    // }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/profile",
    // "/signup"
    ],
}









