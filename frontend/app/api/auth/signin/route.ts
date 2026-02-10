import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const base = process.env.FASTAPI_BASE ?? "http://localhost:8000";
  const r = await fetch(`${base}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await r.text();

  const data = JSON.parse(text);
  const accessToken = data?.session?.access_token;
  const refreshToken = data?.session?.refresh_token;

  const res = NextResponse.json({ ok: true, user: data.user }, { status: 200 });

  const isProd = process.env.NODE_ENV === "production";
  res.cookies.set("sb_access_token", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    // expires_in(초)이 있으면 maxAge로
    maxAge: Number(data?.session?.expires_in ?? 60 * 60),
  });

  res.cookies.set("sb_refresh_token", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    // refresh는 길게(예: 7일)
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
