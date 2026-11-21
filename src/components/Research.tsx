type Study = { stat: string; label: string; detail: string; source: string; url: string };

export function Research({
  heading,
  body,
  studies,
  note,
}: {
  heading: string;
  body: string;
  studies: Study[];
  note: string;
}) {
  return (
    <section className="bg-green text-cream">
      <div className="wrap py-20 md:py-28">
        <div className="max-w-[640px]">
          <h2 className="text-[36px] md:text-[48px]">{heading}</h2>
          <p className="mt-5 text-lg text-cream/80">{body}</p>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {studies.map((s) => (
            <article key={s.url} className="border-t border-cream/25 pt-6">
              <p className="text-[44px] font-light leading-none tracking-tight text-gold-soft">{s.stat}</p>
              <p className="mt-2 text-cream/70">{s.label}</p>
              <p className="mt-5 leading-relaxed">{s.detail}</p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link mt-4 inline-block text-sm text-cream/70 hover:text-cream"
              >
                {s.source}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-14 max-w-[70ch] text-sm text-cream/60">{note}</p>
      </div>
    </section>
  );
}
