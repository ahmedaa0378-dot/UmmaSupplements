import Link from "next/link";
import { LoopVideo } from "./LoopVideo";

type Props = {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  video: string;
  poster: string;
  alt: string;
};

/*
  Full-bleed hero with a silent background film of the product. The jar sits in the right third
  of the film, so text stays on the left on wide screens and at the top on phones.
*/
export function Hero({ heading, body, primary, secondary, video, poster, alt }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-green text-cream">
      <div className="absolute inset-0 -z-10 [&_video]:object-[78%_center] md:[&_video]:object-center">
        <LoopVideo src={video} poster={poster} eager label={alt} />
        <div className="absolute inset-0 bg-gradient-to-b from-green-deep/80 via-green-deep/10 to-green-deep/70 md:bg-gradient-to-r md:from-green-deep/75 md:via-green-deep/25 md:to-transparent" />
      </div>

      <div className="wrap flex min-h-[620px] flex-col justify-between py-10 md:min-h-[680px] md:justify-center md:py-24">
        <div className="max-w-[560px]">
          <h1 className="text-[44px] md:text-[72px]">{heading}</h1>
          <p className="mt-5 max-w-[42ch] text-lg text-cream/85 md:mt-6 md:text-xl">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:mt-10">
          <Link href={primary.href} className="btn btn-light">
            {primary.label}
          </Link>
          <Link href={secondary.href} className="btn btn-outline-light">
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
