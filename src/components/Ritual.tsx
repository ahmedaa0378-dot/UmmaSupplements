import { FilmSlot } from "./FilmSlot";

/* The three steps are a real sequence, so they are numbered. Each step has its own short film. */
export function Ritual({ steps, films }: { steps: string[]; films: { shot: string; video?: string }[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
      {steps.map((s, i) => (
        <li key={s}>
          {films[i] && <FilmSlot shot={films[i].shot} video={films[i].video} className="aspect-square" />}
          <div className="mt-5 flex gap-4">
            <span className="text-[40px] font-light leading-none text-gold">{i + 1}</span>
            <p className="pt-1.5 text-lg leading-snug">{s}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
