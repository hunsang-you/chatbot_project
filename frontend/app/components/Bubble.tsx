export default function Bubble({
  role,
  text,
}: {
  role: "user" | "bot";
  text: string;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-6",
          isUser
            ? "border-zinc-900 bg-zinc-900 text-white"
            : "border-zinc-200 bg-zinc-50 text-zinc-900",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}
