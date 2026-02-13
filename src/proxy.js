import { NextRequest, NextResponse } from "next/server";
export function proxy(request) {
    const token = request.cookies.get('authToken')?.value;

    console.log('authToken (middleware):', token);

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();

}

// Protected only specific paths
export const config = {
    matcher: [
        '/dashboard/:path*',

    ],
}
