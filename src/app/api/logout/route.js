import { cookies } from 'next/headers';

export async function POST(request) {
    const cookieStore = await cookies();

    // Delete the authentication cookie
    cookieStore.delete('authToken');

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}