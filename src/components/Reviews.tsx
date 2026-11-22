import type { Review } from "@/content/site";

function Stars({ value, muted }: { value: number; muted?: boolean }) {
  return (
    <span className={`inline-flex gap-1 ${muted ? "text-brass/40" : "text-brass"}`} role="img" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="16" height="16" viewBox="0 0 20 20" fill={n <= value ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2">
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </span>
  );
}

/*
  Shows real reviews when there are any. Before launch there are none, so it shows how the
  section will look, with every card marked as a sample. Sample cards carry no invented praise.
*/
export function Reviews({ items }: { items: Review[] }) {
  const has = items.length > 0;
  const average = has ? items.reduce((n, r) => n + r.rating, 0) / items.length : 0;

  return (
    <section id="reviews" className="wrap scroll-mt-24 py-20 md:py-28">
      <div className="text-center">
        <h2 className="text-[48px] md:text-[64px]">In her words</h2>
        {has ? (
          <p className="mt-4 flex items-center justify-center gap-3 text-lg">
            <Stars value={Math.round(average)} />
            {average.toFixed(1)} from {items.length} verified {items.length === 1 ? "buyer" : "buyers"}
          </p>
        ) : (
          <p className="mx-auto mt-4 max-w-[52ch] text-lg text-muted">
            Reviews open with our first deliveries. Only customers with a delivered order can leave one.
          </p>
        )}
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {has
          ? items.slice(0, 6).map((r) => (
              <article key={r.name + r.date} className="rounded-[var(--radius-card)] bg-paper p-8">
                <Stars value={r.rating} />
                <h3 className="mt-5 text-[26px]">{r.title}</h3>
                <p className="mt-3 text-muted">{r.body}</p>
                <p className="mt-6 text-sm">
                  {r.name}, {r.city}
                  <span className="text-muted">, verified buyer, {r.date}</span>
                </p>
              </article>
            ))
          : [0, 1, 2].map((i) => (
              <article key={i} className="rounded-[var(--radius-card)] border border-dashed border-brass/50 p-8">
                <div className="flex items-center justify-between">
                  <Stars value={5} muted />
                  <span className="text-[13px] text-brass-ink">Sample layout</span>
                </div>
                <h3 className="mt-5 text-[26px] text-muted">Review title</h3>
                <p className="mt-3 text-muted">
                  The customer&apos;s own words appear here, with their first name, city and the date of their order.
                </p>
                <p className="mt-6 text-sm text-muted">Name, City, verified buyer</p>
              </article>
            ))}
      </div>
    </section>
  );
}
