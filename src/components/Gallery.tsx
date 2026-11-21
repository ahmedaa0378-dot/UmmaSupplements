"use client";

import Image from "next/image";
import { useState } from "react";
import type { Slide } from "@/content/site";

/* Product gallery: one large slide with thumbnails. Slides can carry a title and short points. */
export function Gallery({ slides }: { slides: Slide[] }) {
  const [at, setAt] = useState(0);
  const slide = slides[at];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] bg-stone">
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          fill
          priority={at === 0}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {slide.title && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-green-deep/95 via-green-deep/70 to-transparent px-6 pb-6 pt-24 text-cream md:px-8 md:pb-8">
            <p className="text-[26px] font-light leading-tight tracking-tight md:text-[32px]">{slide.title}</p>
            {slide.points && (
              <ul className="mt-4 space-y-1.5">
                {slide.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 18 18" className="mt-1 shrink-0 text-gold-soft" aria-hidden="true">
                      <path d="M3.5 9.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1" role="tablist" aria-label="Product images">
          {slides.map((s, i) => (
            <button
              key={s.image}
              role="tab"
              aria-selected={i === at}
              aria-label={s.title ?? s.alt}
              onClick={() => setAt(i)}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-stone md:h-24 md:w-20 ${
                i === at ? "ring-2 ring-green ring-offset-2 ring-offset-cream" : "opacity-75 hover:opacity-100"
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
