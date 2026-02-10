// app/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stock Chatbot",
  description: "Next.js + FastAPI Stock Chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
