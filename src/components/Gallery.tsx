"use client";

import Image from "next/image";
import { useState } from "react";
import type { Slide } from "@/content/site";

/* Product gallery: one large slide with thumbnails. Slides can carry a title and short points. */
export function Gallery({ slides }: { slides: Slide[] }) {
  const [at, setAt] = useState(0);
  const slide = slides[at];

  return (
    <div className="min-w-0">
      <div className="arch relative aspect-[4/5] bg-stone">
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          fill
          priority={at === 0}
          sizes="(min-width: 768px) 50vw, 100vw"
          className={slide.fit === "contain" ? "object-contain" : "object-cover"}
        />
        {slide.title && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-green-deep/95 via-green-deep/70 to-transparent px-6 pb-7 pt-28 text-ivory md:px-9 md:pb-9">
            <p className="display text-[32px] md:text-[40px]">{slide.title}</p>
            {slide.points && (
              <ul className="mt-4 space-y-1.5 text-[15px]">
                {slide.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-[9px] h-px w-4 shrink-0 bg-brass-soft" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1" role="tablist" aria-label="Product images">
          {slides.map((s, i) => (
            <button
              key={s.image + i}
              role="tab"
              aria-selected={i === at}
              aria-label={s.title ?? s.alt}
              onClick={() => setAt(i)}
              className={`arch relative h-24 w-[76px] shrink-0 bg-stone ${
                i === at ? "outline outline-1 outline-offset-2 outline-green" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={s.image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
