// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // ✅ 중요: await
  const accessToken = cookieStore.get("sb_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ ok: false, user: null }, { status: 401 });
  }

  const base = process.env.FASTAPI_BASE ?? "http://localhost:8000";
  const r = await fetch(`${base}/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  const text = await r.text();
  return new NextResponse(text, {
    status: r.status,
    headers: {
      "Content-Type": r.headers.get("content-type") ?? "application/json",
    },
  });
}
