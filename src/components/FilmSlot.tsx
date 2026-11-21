import Image from "next/image";
import { LoopVideo } from "./LoopVideo";

/*
  A slot for a short, muted, looping film. Until a video file is supplied it shows the
  poster (or a plain tinted panel) with the shot description, so the page doubles as a
  shot list for the shoot. Videos never autoplay with sound and load lazily.
*/

type Props = {
  shot: string;
  video?: string;
  poster?: string;
  posterAlt?: string;
  tone?: "green" | "stone";
  priority?: boolean;
  className?: string;
};

export function FilmSlot({ shot, video, poster, posterAlt = "", tone = "stone", priority, className = "" }: Props) {
  const dark = tone === "green";

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-panel)] ${
        tone === "green" ? "bg-green" : "bg-stone"
      } ${className}`}
    >
      {video ? (
        <LoopVideo src={video} poster={poster} eager={priority} label={shot} />
      ) : (
        poster && (
          <Image
            src={poster}
            alt={posterAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )
      )}

      {!video && poster && (
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-paper/90 px-3.5 py-1.5 text-sm font-medium text-green">
          <PlayGlyph /> Film to be shot
        </span>
      )}

      {!video && !poster && (
        <div className={`absolute inset-x-0 bottom-0 p-5 text-sm leading-snug ${dark ? "text-cream" : "text-green"}`}>
          <span className="mb-2 inline-flex items-center gap-2 font-medium">
            <PlayGlyph /> Film to be shot
          </span>
          <p className={dark ? "text-cream/85" : "text-green/80"}>{shot}</p>
        </div>
      )}
    </div>
  );
}

function PlayGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.2 5.6 12.4 9l-5.2 3.4z" fill="currentColor" />
    </svg>
  );
}
