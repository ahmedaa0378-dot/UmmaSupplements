type Row = { check: string; why: string; umma: string; link?: { href: string; label: string } };

/* A buying guide: what to look for on any collagen label, with our answer beside each check. */
export function Checks({ heading, intro, rows }: { heading: string; intro: string; rows: Row[] }) {
  return (
    <section className="wrap py-20 md:py-28">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="text-[44px] md:col-span-7 md:text-[64px]">{heading}</h2>
        <p className="max-w-[44ch] text-lg text-muted md:col-span-5 md:justify-self-end">{intro}</p>
      </div>

      <div className="mt-12 md:mt-16" role="table" aria-label={heading}>
        <div role="row" className="hidden border-b border-green/70 pb-3 text-[14px] text-muted md:grid md:grid-cols-12 md:gap-8">
          <span role="columnheader" className="md:col-span-3">
            Check
          </span>
          <span role="columnheader" className="md:col-span-5">
            Why it matters
          </span>
          <span role="columnheader" className="md:col-span-4">
            UMMA collagen
          </span>
        </div>
        {rows.map((r) => (
          <div role="row" key={r.check} className="grid gap-2 border-b border-brass/40 py-7 md:grid-cols-12 md:gap-8 md:py-8">
            <p role="rowheader" className="display text-[28px] leading-tight md:col-span-3 md:text-[32px]">
              {r.check}
            </p>
            <p role="cell" className="text-muted md:col-span-5 md:pt-1.5">
              {r.why}
            </p>
            <div role="cell" className="mt-2 flex gap-3 md:col-span-4 md:mt-0 md:pt-1.5">
              <span className="mt-[11px] h-px w-5 shrink-0 bg-brass" aria-hidden="true" />
              <p>
                <span className="text-lg text-green">{r.umma}</span>
                {r.link && (
                  <a href={r.link.href} className="link mt-1 block text-[15px] text-brass-ink">
                    {r.link.label}
                  </a>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
