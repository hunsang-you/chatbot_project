import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const base = process.env.FASTAPI_BASE ?? "http://localhost:8000"; // fallback
  const url = `${base}/api/chat`;

  const fastapiRes = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await fastapiRes.text();
  // FastAPI 응답이 JSON이라고 가정
  return new NextResponse(text, {
    status: fastapiRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
