import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    const res = NextResponse.json({ message: "ok", data: body });
    res.cookies.set('authToken', 'bhoopendrakumar', {
        httpOnly: true,
        secure: true,
        path: '/'
    });

    return res;
}
