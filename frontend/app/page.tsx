// app/page.tsx  (인트로: 주식 챗봇 컨셉)
import Link from "next/link";
import Card from "@/app/components/Card";
import Step from "@/app/components/Step";
import Bubble from "@/app/components/Bubble";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-zinc-200 from-white to-zinc-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-14 md:grid-cols-2 md:py-16">
          <div>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              주식 리서치에 특화된
              <br />
              개인용 챗봇
            </h1>

            <p className="mt-4 text-base leading-7 text-zinc-700">
              종목/지표/뉴스 요약을 한 곳에서. 대화 로그를 저장하고, FastAPI
              백엔드로 데이터 소스(RAG, 시세 API, 재무제표)까지 확장 가능한
              구조로 설계합니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/chat"
                className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                채팅 시작하기
              </Link>
              <a
                href="#features"
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
              >
                기능 보기
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-600">
              <span className="rounded-full border border-zinc-200 bg-white px-3 py-1">
                예: “AAPL 실적 요약해줘”
              </span>
              <span className="rounded-full border border-zinc-200 bg-white px-3 py-1">
                예: “TSLA 리스크 포인트 정리”
              </span>
              <span className="rounded-full border border-zinc-200 bg-white px-3 py-1">
                예: “NVDA 관련 뉴스 5줄 요약”
              </span>
            </div>
          </div>

          {/* Preview 카드 */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-zinc-200" />
              <div className="ml-2 text-xs text-zinc-500">
                Stock Chat Preview
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <Bubble role="user" text="AAPL 최근 실적의 핵심 포인트 3개만." />
              <Bubble
                role="bot"
                text="매출/마진/가이던스 관점에서 3가지로 요약해볼게요. (데이터 연결 시 실제 수치 기반으로 답변)"
              />
              <Bubble role="user" text="그리고 리스크는 뭐가 있어?" />
              <Bubble
                role="bot"
                text="수요 둔화, 환율, 규제/경쟁 이슈 등 카테고리로 나눠 체크합니다."
              />
            </div>

            <div className="mt-5 flex gap-2">
              <div className="flex-1 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
                종목/질문을 입력…
              </div>
              <div className="rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white">
                Send
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-500">
              * 현재는 UI/연결 구조(MVP) 중심. 이후 FastAPI에서 시세/뉴스/재무
              데이터 소스 연결.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold tracking-tight">핵심 기능</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            주식 챗봇 MVP에서 바로 가치가 나오는 기능 위주로 구성.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card
              title="종목 중심 대화 저장"
              desc="로그인 유저별로 종목/주제별 대화 기록 저장 및 재조회 구조."
            />
            <Card
              title="요약/정리 워크플로우"
              desc="뉴스 요약, 실적 요약, 리스크/시나리오 정리 등 포맷화된 답변."
            />
            <Card
              title="확장 가능한 백엔드"
              desc="FastAPI에 /api/* 엔드포인트로 데이터 소스(RAG/툴/DB) 추가."
            />
          </div>
        </div>
      </section>

      {/* How */}
      <section id="how" className="border-t border-zinc-200 bg-zinc-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-extrabold tracking-tight">동작 구조</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Step
              n="1"
              title="Next.js UI"
              desc="사용자 입력 → /api/chat 호출"
            />
            <Step
              n="2"
              title="Next.js Proxy"
              desc="서버에서 FastAPI로 요청 전달"
            />
            <Step n="3" title="FastAPI" desc="LLM/DB/외부 API 처리 후 응답" />
          </div>

          <div className="mt-8">
            <Link
              href="/chat"
              className="inline-flex rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              채팅 화면으로 이동
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
