"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const em = email.trim();
    if (!em || !password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: em, password }),
      });

      if (!res.ok) {
        // 서버가 JSON으로 줄 수도 있어서 우선 text로 받되, 너무 길면 잘라서 표시
        const t = await res.text().catch(() => "");
        throw new Error(t.slice(0, 300) || `Login failed: ${res.status}`);
      }

      window.location.href = "/pages/chat"; // 너 구조 기준
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-extrabold tracking-tight">로그인</h1>
        <p className="mt-2 text-sm text-zinc-600">
          이메일/비밀번호로 로그인하거나 소셜 로그인으로 시작하세요.
        </p>

        {/* 소셜 로그인(지금은 라우트가 없으면 제거/주석) */}
        {/* <div className="mt-6 grid grid-cols-1 gap-3">
          <a href="/api/auth/oauth/google" className="...">Google로 계속하기</a>
          <a href="/api/auth/oauth/kakao" className="...">Kakao로 계속하기</a>
        </div> */}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs text-zinc-500">또는</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-zinc-200 bg-white p-5"
        >
          <label className="block text-sm font-semibold text-zinc-800">
            이메일
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
            disabled={loading}
          />

          <label className="mt-4 block text-sm font-semibold text-zinc-800">
            비밀번호
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호"
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
            disabled={loading}
          />

          {error && (
            <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="mt-5 w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link
              href="/pages/auth/signup"
              className="text-zinc-700 hover:text-zinc-900"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
