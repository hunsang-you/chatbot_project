export default function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="text-sm font-extrabold">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-600">{desc}</div>
    </div>
  );
}
