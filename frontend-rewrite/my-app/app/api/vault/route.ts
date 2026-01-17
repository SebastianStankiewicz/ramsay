import { NextRequest, NextResponse } from 'next/server';

// FOR GETTING ALL VAULT INFO - EG HOLDINGS AND CURRENT PNL
export async function GET(request: NextRequest) {
    try {
        const response = await fetch("http://127.0.0.1:5069/getVaults", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(errorText, { status: response.status });
        }

        const result = await response.json();

        const setCookieHeader = response.headers.get("set-cookie");

        const nextResponse = new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

        if (setCookieHeader) {
            console.log("Cookie:", setCookieHeader); 
            nextResponse.headers.set("Set-Cookie", setCookieHeader);
        }

        return nextResponse;

    } catch (error) {
        console.error("NextJS Proxy Error:", error);
        return new Response(JSON.stringify({ error: "Internal Proxy Error" }), { 
            status: 500, 
            headers: { "Content-Type": "application/json" }
        });
    }
}