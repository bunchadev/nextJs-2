
import { NextResponse, NextRequest } from "next/server"
export async function GET(request: NextRequest, response: NextResponse) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const productName = searchParams.get("query")?.slice(0, -1)
    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Product/Search?query=${productName}`)

}