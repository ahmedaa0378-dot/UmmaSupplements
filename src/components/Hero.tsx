import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { LoopVideo } from "./LoopVideo";

type Media = { video: string; poster: string };

type Props = {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  note: string;
  wide: Media;
  tall: Media;
  product: { image: string; alt: string };
  alt: string;
};

/*
  Where the tub stands inside each film, as fractions of the frame. The rope of fibres in the
  film passes behind this spot, so the tub must move with the film, not with the page.
*/
const SPOTS = {
  wide: { left: 1100 / 1920, top: 250 / 1080, height: 700 / 1080, ratio: 16 / 9 },
  tall: { left: 290 / 1080, top: 1010 / 1920, height: 760 / 1920, ratio: 9 / 16 },
};

/*
  A stage with the film's own proportions, scaled to cover the hero like object-fit: cover.
  The parent is a size container, so cqw and cqh are the hero's width and height.
*/
function Stage({ media, product, spot, alt, className }: { media: Media; product: Props["product"]; spot: (typeof SPOTS)["wide"]; alt: string; className: string }) {
  const stage: CSSProperties = {
    width: `max(100cqw, calc(100cqh * ${spot.ratio}))`,
    aspectRatio: String(spot.ratio),
  };
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden [container-type:size] ${className}`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={stage}>
        <Image src={media.poster} alt="" fill priority sizes="100vw" />
        <LoopVideo src={media.video} poster={media.poster} label={alt} eager />
        <div
          className="absolute"
          style={{ left: `${spot.left * 100}%`, top: `${spot.top * 100}%`, height: `${spot.height * 100}%`, aspectRatio: "647 / 894" }}
        >
          <div className="absolute -bottom-[3%] left-[-6%] h-[9%] w-[112%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(40,30,10,0.22),transparent)]" />
          <Image src={product.image} alt={product.alt} fill priority sizes="(min-width: 768px) 30vw, 60vw" className="object-contain" />
        </div>
      </div>
    </div>
  );
}

/*
  Full-bleed hero. A code-drawn film of collagen fibres runs behind the real tub: loose strands on
  the left, under the type, gathering into a turning triple helix behind the product.
*/
export function Hero({ heading, body, primary, note, wide, tall, product, alt }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f4eee1]">
      <Stage media={tall} product={product} spot={SPOTS.tall} alt={alt} className="md:hidden" />
      <Stage media={wide} product={product} spot={SPOTS.wide} alt={alt} className="hidden md:block" />

      <div className="wrap flex min-h-[calc(100svh-110px)] flex-col pb-10 pt-12 md:min-h-[min(780px,calc(100svh-110px))] md:justify-center md:py-24">
        <div className="max-w-[600px]">
          <h1 className="text-[52px] leading-[1.02] text-green md:text-[104px]">{heading}</h1>
          <p className="mt-5 max-w-[36ch] text-[17px] text-ink md:mt-6 md:text-xl">{body}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-9">
            <Link href={primary.href} className="btn btn-primary">
              {primary.label}
            </Link>
            <span className="text-[15px] font-medium text-green">{note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
