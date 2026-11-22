import Image from "next/image";
import Link from "next/link";
import { LoopVideo } from "./LoopVideo";

type Media = { video: string; poster: string };

type Props = {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  note: string;
  wide: Media;
  tall: Media;
  alt: string;
};

/*
  Full-bleed hero. A quiet still life fills the whole section; the left of the frame (top on
  phones) is empty wall, so the type sits directly on the image without a box or overlay.
  The poster image loads first, then the film takes over with only the light moving.
*/
export function Hero({ heading, body, primary, note, wide, tall, alt }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-stone">
      <div className="absolute inset-0 -z-10 md:hidden">
        <Image src={tall.poster} alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
        <div className="absolute inset-0 [&_video]:object-bottom">
          <LoopVideo src={tall.video} poster={tall.poster} label={alt} />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 hidden md:block">
        <Image src={wide.poster} alt="" fill priority sizes="100vw" className="object-cover object-right" />
        <div className="absolute inset-0 [&_video]:object-right">
          <LoopVideo src={wide.video} poster={wide.poster} label={alt} />
        </div>
      </div>

      <div className="wrap flex min-h-[calc(100svh-110px)] flex-col pb-10 pt-14 md:min-h-[min(780px,calc(100svh-110px))] md:justify-center md:py-24">
        <div className="max-w-[600px]">
          <h1 className="text-[60px] text-green md:text-[104px]">{heading}</h1>
          <p className="mt-6 max-w-[36ch] text-lg text-ink md:text-xl">{body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
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
