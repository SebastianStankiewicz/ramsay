import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userAddress = searchParams.get('userAddress');

        if (!userAddress) {
            return NextResponse.json(
                { status: 'error', message: 'Missing userAddress parameter' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `http://127.0.0.1:5069/getUserBalance?userAddress=${encodeURIComponent(userAddress)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(result, { status: response.status });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Balance API Error:', error);
        return NextResponse.json(
            { error: 'Internal Proxy Error' },
            { status: 500 }
        );
    }
}
