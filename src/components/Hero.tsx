import Link from "next/link";
import { LoopVideo } from "./LoopVideo";
import { Star } from "./Ornament";

type Props = {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  note: string;
  video: string;
  poster: string;
  alt: string;
};

/*
  Split hero. The film sits inside the arch from the label, with a brass line tracing it.
  The arch is the one bold move on the page; everything around it stays quiet.
*/
export function Hero({ heading, body, primary, note, video, poster, alt }: Props) {
  return (
    <section className="overflow-hidden">
      <div className="wrap grid items-center gap-10 pb-14 pt-8 md:grid-cols-12 md:gap-6 md:pb-20 md:pt-14">
        <div className="order-2 md:order-1 md:col-span-6 md:pr-8">
          <Star className="mb-6 text-brass" size={26} />
          <h1 className="text-[56px] md:text-[96px]">{heading}</h1>
          <p className="mt-6 max-w-[40ch] text-lg text-muted md:text-xl">{body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={primary.href} className="btn btn-primary">
              {primary.label}
            </Link>
            <span className="text-[15px] text-brass-ink">{note}</span>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-[520px] md:order-2 md:col-span-6 md:max-w-none md:pl-6">
          <div className="arch-line absolute inset-x-0 -top-3 bottom-0 md:left-6 md:-top-4" aria-hidden="true" />
          <div className="arch relative mx-3 aspect-[4/5] bg-stone md:mx-4">
            <LoopVideo src={video} poster={poster} eager label={alt} />
          </div>
        </div>
      </div>
    </section>
  );
}
