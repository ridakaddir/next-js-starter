import { auth } from "@/lib/auth"

export default auth((req) => {
    console.log("Middleware");
    console.log(req.auth);
    // if (!req.auth && req.nextUrl.pathname !== "/api/auth/login") {
    //     const newUrl = new URL("/api/auth/login", req.nextUrl.origin)
    //     return Response.redirect(newUrl)
    // }
})


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//     console.log("Middleware");
//     return NextResponse.redirect(new URL('/home', request.url))
// }