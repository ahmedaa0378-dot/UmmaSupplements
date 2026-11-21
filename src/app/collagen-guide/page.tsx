import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Research } from "@/components/Research";
import { getGuide, getHome } from "@/lib/content";

export const metadata: Metadata = {
  title: "The collagen guide",
  description: "What collagen is, what hydrolysed means, types I and III, and how to take it.",
};

export default async function GuidePage() {
  const [guide, home] = await Promise.all([getGuide(), getHome()]);

  return (
    <>
      <section className="bg-cream">
        <div className="wrap py-14 md:py-20">
          <h1 className="text-[44px] md:text-[64px]">{guide.heading}</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-muted">{guide.intro}</p>
          <nav aria-label="In this guide" className="mt-8 flex flex-wrap gap-2">
            {guide.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border border-green px-4 py-2 text-sm text-green">
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="wrap py-6 md:py-12">
        {guide.sections.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="grid scroll-mt-24 items-center gap-8 border-b border-stone py-12 last:border-0 md:grid-cols-2 md:gap-16 md:py-16"
          >
            <div className={`relative aspect-[3/2] overflow-hidden rounded-[var(--radius-panel)] bg-stone ${i % 2 ? "md:order-2" : ""}`}>
              <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <h2 className="text-[32px] md:text-[40px]">{s.title}</h2>
              <div className="mt-5 max-w-[58ch] space-y-4 text-lg text-muted">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <Research {...home.research} />

      <section className="wrap py-20 text-center md:py-24">
        <h2 className="text-[36px] md:text-[48px]">Ready to start?</h2>
        <Link href="/products/halal-collagen" className="btn btn-primary mt-8">
          Shop collagen
        </Link>
      </section>
    </>
  );
}
