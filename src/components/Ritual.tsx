import { LoopVideo } from "./LoopVideo";

type Film = { shot: string; video?: string; poster?: string };

/* The three steps are a real sequence, so they are numbered. Each step has its own short film. */
export function Ritual({ steps, films }: { steps: string[]; films: Film[] }) {
  return (
    <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
      {steps.map((s, i) => (
        <li key={s}>
          {films[i]?.video && (
            <div className="arch relative aspect-[4/5] bg-stone">
              <LoopVideo src={films[i].video!} poster={films[i].poster} label={films[i].shot} />
            </div>
          )}
          <div className="mt-6 flex gap-4 border-t border-brass/40 pt-5">
            <span className="display text-[44px] text-brass">{i + 1}</span>
            <p className="pt-2 text-lg leading-snug">{s}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
