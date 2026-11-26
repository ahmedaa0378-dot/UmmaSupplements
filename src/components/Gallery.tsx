"use client";

import Image from "next/image";
import { useState } from "react";
import type { Slide } from "@/content/site";

/* A designed card: title and points on paper, with the pack standing beside them. */
function Panel({ slide, priority }: { slide: Slide; priority: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-paper px-6 pb-5 pt-[20%] md:px-10 md:pb-8">
      <p className="display text-[30px] leading-tight text-green md:text-[44px]">{slide.title}</p>
      {slide.points && (
        <ul className="mt-4 space-y-1.5 text-[14px] md:mt-5 md:space-y-2 md:text-base">
          {slide.points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="mt-[10px] h-px w-4 shrink-0 bg-brass" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      )}
      {slide.link && (
        <a href={slide.link.href} className="link mt-4 self-start text-[15px] text-brass-ink">
          {slide.link.label}
        </a>
      )}
      <div className="relative mt-4 min-h-0 flex-1">
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 30vw, 60vw"
          className="object-contain object-right-bottom mix-blend-multiply"
        />
      </div>
    </div>
  );
}

/* Product gallery: one large slide with thumbnails. Slides can be photos, photos with a caption, or panels. */
export function Gallery({ slides }: { slides: Slide[] }) {
  const [at, setAt] = useState(0);
  const slide = slides[at];

  return (
    <div className="min-w-0">
      <div className="arch relative aspect-[4/5] bg-stone">
        {slide.panel ? (
          <Panel key={at} slide={slide} priority={at === 0} />
        ) : (
          <>
            <Image
              key={slide.image + at}
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
          </>
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
              className={`arch relative h-24 w-[76px] shrink-0 ${s.panel ? "bg-paper" : "bg-stone"} ${
                i === at ? "outline outline-1 outline-offset-2 outline-green" : "opacity-70 hover:opacity-100"
              }`}
            >
              {s.panel ? (
                <span className="absolute inset-0 flex flex-col justify-between p-2 text-left">
                  <span className="display text-[13px] leading-tight text-green">{s.title}</span>
                  <span className="relative ml-auto h-10 w-9">
                    <Image src={s.image} alt="" fill sizes="40px" className="object-contain mix-blend-multiply" />
                  </span>
                </span>
              ) : (
                <Image src={s.image} alt="" fill sizes="80px" className="object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
