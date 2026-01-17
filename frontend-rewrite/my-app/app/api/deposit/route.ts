import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        // 1. Get the data exactly as sent from page.tsx (camelCase)
        const body = await request.json();
        const { userAddress, privateKey, vaultAddress, amount } = body;

        // DEBUG LOG - Check your terminal running Next.js to see this!
        console.log("Next.js Proxy received:", body);

        // 2. Map camelCase (JS) to snake_case (Python Flask)
        const response = await fetch("http://127.0.0.1:5069/deposit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userAddress: userAddress,
            privateKey: privateKey,
            vaultAddress: vaultAddress,
            amount: amount
          })
        });

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(result, { status: response.status });
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error("NextJS Proxy Error:", error);
        return NextResponse.json({ error: "Internal Proxy Error" }, { status: 500 });
    }
}