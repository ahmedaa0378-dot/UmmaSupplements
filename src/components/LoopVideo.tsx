"use client";

import { useEffect, useRef } from "react";

/*
  A short, silent, looping film. It only loads and plays once it scrolls into view, pauses when
  it leaves, and stays on its first frame for visitors who prefer reduced motion.
*/
export function LoopVideo({ src, poster, eager, label }: { src: string; poster?: string; eager?: boolean; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
    />
  );
}
