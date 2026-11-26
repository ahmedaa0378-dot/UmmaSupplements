type Item = { myth: string; fact: string };

/* Myth and fact, side by side. */
export function Myths({ heading, items }: { heading: string; items: Item[] }) {
  return (
    <section className="wrap py-20 md:py-28">
      <h2 className="text-[44px] md:text-[64px]">{heading}</h2>
      <dl className="mt-12">
        {items.map((it) => (
          <div key={it.myth} className="grid gap-4 border-t border-brass/40 py-8 md:grid-cols-2 md:gap-16">
            <dt>
              <span className="block text-[14px] text-muted">Myth</span>
              <span className="display mt-1 block text-[30px] leading-tight text-muted md:text-[36px]">{it.myth}</span>
            </dt>
            <dd>
              <span className="block text-[14px] text-brass-ink">Fact</span>
              <span className="mt-2 block text-lg">{it.fact}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
