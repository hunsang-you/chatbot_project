// app/chat/page.tsx
"use client";

import { useState } from "react";

type ChatResponse = { reply: string };

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    const text = message.trim();
    if (!text) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const raw = await res.text().catch(() => "");
        throw new Error(`API error: ${res.status} ${raw}`);
      }

      const data = (await res.json()) as ChatResponse;
      setReply(data.reply);
      setMessage("");
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight">Stock Chat</h1>
        <p className="text-sm text-zinc-600">
          종목/질문을 입력하면 Next.js → /api/chat → FastAPI로 전달됩니다.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 입력 */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="text-sm font-extrabold">Ask</div>

          <div className="mt-3 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='예: "TSLA 최근 뉴스 요약해줘"'
              className="flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") void send();
              }}
            />
            <button
              onClick={() => void send()}
              disabled={loading || message.trim().length === 0}
              className="rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

          {error && (
            <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "AAPL 실적 요약",
              "NVDA 리스크",
              "TSLA 뉴스 5줄",
              "삼성전자 전망",
            ].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setMessage(s)}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50"
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* 응답 */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="text-sm font-extrabold">Reply</div>
          <div className="mt-3 min-h-[200px] whitespace-pre-wrap rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-sm text-zinc-900">
            {reply || "(아직 응답 없음)"}
          </div>
        </section>
      </div>
    </main>
  );
}
