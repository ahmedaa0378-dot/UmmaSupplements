export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-b border-brass/40">
      {items.map((f) => (
        <details key={f.q} className="group border-t border-brass/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-[24px] font-medium leading-tight md:text-[28px] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="font-sans text-2xl font-light text-brass group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[62ch] pb-7 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
