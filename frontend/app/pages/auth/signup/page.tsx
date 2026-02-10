// app/signup/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const emailOk = useMemo(() => {
    const v = email.trim();
    return v.length > 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const nicknameOk = useMemo(() => nickname.trim().length >= 2, [nickname]);
  const passwordOk = useMemo(() => password.length >= 8, [password]);
  const matchOk = useMemo(
    () => password.length > 0 && password === password2,
    [password, password2],
  );

  const canSubmit = emailOk && nicknameOk && passwordOk && matchOk;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: email.trim(),
      password,
      nickname: nickname.trim(),
    };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      alert(t || `Sign up failed: ${res.status}`);
      return;
    }

    // 가입 성공 시 로그인 페이지로 이동
    window.location.href = "/pages/auth/signin";
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-extrabold tracking-tight">회원가입</h1>
        <p className="mt-2 text-sm text-zinc-600">
          이메일, 닉네임, 비밀번호를 설정해 계정을 생성하세요.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5"
        >
          {/* Email + 중복확인 버튼(기능 없이 UI만) */}
          <label className="block text-sm font-semibold text-zinc-800">
            이메일
          </label>
          <div className="mt-2 flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
            />
            <button
              type="button"
              className="shrink-0 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-zinc-50"
              onClick={() => {
                // TODO: 추후 Supabase로 이메일 중복확인 연결
                alert("이메일 중복확인 기능은 추후 연결 예정입니다.");
              }}
            >
              중복확인
            </button>
          </div>
          <p
            className={`mt-2 text-xs ${
              email.length === 0
                ? "text-zinc-500"
                : emailOk
                  ? "text-emerald-700"
                  : "text-red-700"
            }`}
          >
            {email.length === 0
              ? "이메일 형식으로 입력하세요."
              : emailOk
                ? "사용 가능한 형식입니다."
                : "이메일 형식이 올바르지 않습니다."}
          </p>

          {/* Nickname */}
          <label className="mt-5 block text-sm font-semibold text-zinc-800">
            닉네임
          </label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            type="text"
            autoComplete="nickname"
            placeholder="닉네임(2자 이상)"
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
          />
          <p
            className={`mt-2 text-xs ${
              nickname.length === 0
                ? "text-zinc-500"
                : nicknameOk
                  ? "text-emerald-700"
                  : "text-red-700"
            }`}
          >
            {nickname.length === 0
              ? "서비스에 표시될 이름입니다."
              : nicknameOk
                ? "좋습니다."
                : "닉네임은 2자 이상 입력하세요."}
          </p>

          {/* Password */}
          <label className="mt-5 block text-sm font-semibold text-zinc-800">
            비밀번호
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호(8자 이상)"
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
          />
          <p
            className={`mt-2 text-xs ${
              password.length === 0
                ? "text-zinc-500"
                : passwordOk
                  ? "text-emerald-700"
                  : "text-red-700"
            }`}
          >
            {password.length === 0
              ? "최소 8자 이상을 권장합니다."
              : passwordOk
                ? "사용 가능한 길이입니다."
                : "비밀번호는 8자 이상이어야 합니다."}
          </p>

          {/* Password Confirm */}
          <label className="mt-5 block text-sm font-semibold text-zinc-800">
            비밀번호 확인
          </label>
          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 다시 입력"
            className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
          />
          <p
            className={`mt-2 text-xs ${
              password2.length === 0
                ? "text-zinc-500"
                : matchOk
                  ? "text-emerald-700"
                  : "text-red-700"
            }`}
          >
            {password2.length === 0
              ? "비밀번호가 일치해야 합니다."
              : matchOk
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."}
          </p>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            회원가입
          </button>

          <div className="mt-4 text-center text-sm text-zinc-600">
            이미 계정이 있나요?{" "}
            <Link
              href="/signin"
              className="font-semibold text-zinc-900 hover:underline"
            >
              로그인
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
