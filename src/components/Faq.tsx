export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-b border-stone">
      {items.map((f) => (
        <details key={f.q} className="group border-t border-stone">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-2xl font-light text-green group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
