// app/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
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
          {/* 소셜 로그인: 실제 OAuth 연결 전까지 라우트 placeholder */}
          {/* <Link
            href="/auth/google"
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
          >
            Google
          </Link>
          <Link
            href="/auth/kakao"
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
          >
            Kakao
          </Link> */}

          {/* <div className="mx-1 hidden h-6 w-px bg-zinc-200 sm:block" /> */}

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
        </div>
      </div>
    </header>
  );
}
