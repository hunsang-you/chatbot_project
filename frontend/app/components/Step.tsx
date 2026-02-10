export default function Step({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-900 text-xs font-bold text-white">
          {n}
        </span>
        <div className="text-sm font-extrabold">{title}</div>
      </div>
      <div className="mt-2 text-sm leading-6 text-zinc-600">{desc}</div>
    </div>
  );
}
