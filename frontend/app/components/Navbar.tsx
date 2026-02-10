// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MeResponse =
  | { ok: true; user: { id: string; email?: string; nickname?: string } }
  | { ok: false; user: null };

export default function Navbar() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const displayName = useMemo(() => {
    if (!me || !("ok" in me) || !me.ok || !me.user) return "";
    return me.user.nickname?.trim() || me.user.email?.trim() || "";
  }, [me]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const r = await fetch("/api/auth/me", { method: "GET" });
        if (!alive) return;
        console.log(r);
        if (!r.ok) {
          setMe({ ok: false, user: null });
          return;
        }

        const data = (await r.json()) as MeResponse;
        setMe(data);
      } catch {
        setMe({ ok: false, user: null });
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const onLogout = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } finally {
      // 로그아웃 후 인트로로
      window.location.href = "/";
    }
  };

  const isAuthed = !!me && "ok" in me && me.ok && !!me.user;

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-extrabold tracking-tight">
            Stock Chatbot
          </Link>

          <nav className="hidden items-center gap-3 text-sm text-zinc-700 md:flex">
            <Link href="/pages/chat" className="hover:text-zinc-900">
              Chat
            </Link>
            <a href="#features" className="hover:text-zinc-900">
              Features
            </a>
            <a href="#how" className="hover:text-zinc-900">
              How it works
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-9 w-40 animate-pulse rounded-xl bg-zinc-100" />
          ) : isAuthed ? (
            <>
              <div className="hidden max-w-[220px] truncate text-sm text-zinc-700 sm:block">
                {displayName}
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="rounded-xl bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/pages/auth/signup"
                className="hidden rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 sm:inline-flex"
              >
                회원가입
              </Link>
              <Link
                href="/pages/auth/signin"
                className="rounded-xl bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800"
              >
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
