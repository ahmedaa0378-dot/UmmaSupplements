import { Star } from "./Ornament";

type Study = { stat: string; label: string; detail: string; source: string };

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
    <section className="bg-green text-ivory">
      <div className="wrap py-20 md:py-28">
        <div className="mx-auto max-w-[640px] text-center">
          <Star className="mx-auto mb-6 text-brass" size={24} />
          <h2 className="text-[44px] md:text-[60px]">{heading}</h2>
          <p className="mt-5 text-lg text-on-dark-soft">{body}</p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden bg-brass/30 sm:grid-cols-2 lg:grid-cols-4">
          {studies.map((s) => (
            <article key={s.source} className="bg-green p-7 md:p-8">
              <p className="display text-[64px] text-brass-soft">{s.stat}</p>
              <p className="mt-2 text-[15px] text-on-dark-soft">{s.label}</p>
              <p className="mt-6 leading-relaxed">{s.detail}</p>
              <p className="mt-6 text-[13px] italic text-on-dark-faint">{s.source}</p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-[70ch] text-center text-[13px] text-on-dark-faint">{note}</p>
      </div>
    </section>
  );
}
