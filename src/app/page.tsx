import Image from "next/image";
import Link from "next/link";
import { AddPackButton } from "@/components/AddToCart";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Divider, Star } from "@/components/Ornament";
import { ProductCard } from "@/components/ProductCard";
import { Research } from "@/components/Research";
import { Reviews } from "@/components/Reviews";
import { Ritual } from "@/components/Ritual";
import { getGuide, getHome, getProducts, getReviews } from "@/lib/content";

export default async function HomePage() {
  const [home, products, reviews, guide] = await Promise.all([getHome(), getProducts(), getReviews(), getGuide()]);
  const collagen = products.find((p) => p.slug === "collagen")!;
  const spotlight = products.find((p) => p.slug === home.spotlight.slug);
  const valueProduct = products.find((p) => p.slug === home.valuePack.cta.productSlug);
  const valuePack = valueProduct?.packs.find((p) => p.id === home.valuePack.cta.packId);

  return (
    <>
      <Hero {...home.hero} />

      {/* Four quiet facts. Halal is one of them, not the headline. */}
      <section className="border-y border-brass/40">
        <dl className="wrap grid grid-cols-2 md:grid-cols-4">
          {home.facts.map((f, i) => (
            <div
              key={f.label}
              className={`px-2 py-7 text-center md:py-9 ${i % 2 ? "border-l border-brass/40" : ""} ${
                i > 1 ? "border-t border-brass/40 md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="display block text-[44px] text-green md:text-[52px]">{f.value}</span>
                <span className="mt-1 block text-[14px] text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Her story: what changes after forty */}
      <section className="wrap py-20 md:py-32">
        <div className="mx-auto max-w-[920px] text-center">
          <p className="display text-[120px] leading-none text-brass md:text-[200px]" aria-hidden="true">{home.story.stat}</p>
          <h2 className="mt-2 text-[34px] md:mt-0 md:text-[52px]">
            <span className="sr-only">{home.story.stat} </span>
            {home.story.statement}
          </h2>
          <p className="mt-5 text-[13px] italic text-muted">{home.story.source}</p>
          <p className="mx-auto mt-10 max-w-[60ch] text-lg text-muted">{home.story.intro}</p>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {home.story.points.map((p) => (
            <article key={p.title}>
              <div className="arch relative aspect-[4/5] bg-stone">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-6 text-[32px]">{p.title}</h3>
              <p className="mt-2 text-muted">{p.body}</p>
            </article>
          ))}
        </div>

        <Divider className="mx-auto mt-20 max-w-[560px]" />
        <p className="display mx-auto mt-10 max-w-[30ch] text-center text-[30px] text-green md:text-[40px]">
          {home.story.bridge}
        </p>
        <div className="mt-10 text-center">
          <Link href={`/products/${collagen.slug}`} className="btn btn-primary">
            Shop collagen
          </Link>
        </div>
      </section>

      <Research {...home.research} />

      {/* Daily ritual */}
      <section className="wrap py-20 md:py-28">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="text-[48px] md:text-[72px]">{home.ritual.heading}</h2>
          <p className="max-w-[40ch] text-lg text-muted md:justify-self-end">{home.ritual.body}</p>
        </div>
        <Ritual steps={collagen.howTo} films={home.ritual.films} />
      </section>

      {/* The range */}
      <section className="bg-cream">
        <div className="wrap py-20 md:py-28">
          <div className="text-center">
            <Star className="mx-auto mb-6 text-brass" size={24} />
            <h2 className="text-[48px] md:text-[72px]">The UMMA range</h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-lg text-muted">
              Two collagens, a daily blend for the perimenopause years, and three kitchen staples done properly.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-10">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Perimenopause spotlight */}
      {spotlight && (
        <section className="bg-maroon text-ivory">
          <div className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:gap-20 md:py-28">
            <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[460px] bg-stone">
              <Image src={spotlight.image} alt={spotlight.imageAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
            <div>
              <Star className="mb-6 text-brass-soft" size={24} />
              <h2 className="text-[48px] md:text-[68px]">{home.spotlight.heading}</h2>
              <p className="mt-6 max-w-[42ch] text-lg text-ivory/80">{home.spotlight.body}</p>
              <Link href={`/products/${spotlight.slug}`} className="btn btn-outline-light mt-9">
                {home.spotlight.cta}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Lifestyle banner */}
      <section className="relative isolate overflow-hidden text-ivory">
        <Image src={home.banner.image} alt={home.banner.alt} fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-deep/85 via-green-deep/25 to-transparent" />
        <div className="wrap flex min-h-[560px] flex-col justify-end py-14 md:min-h-[700px] md:py-20">
          <h2 className="max-w-[16ch] text-[44px] md:text-[76px]">{home.banner.heading}</h2>
          <p className="mt-4 text-lg text-ivory/85">{home.banner.body}</p>
        </div>
      </section>

      {/* Value pack */}
      {valueProduct && valuePack && (
        <section className="wrap py-20 md:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-panel)] bg-stone">
              <Image src={home.valuePack.image} alt="The UMMA range on a stone shelf" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <h2 className="text-[48px] md:text-[64px]">{home.valuePack.heading}</h2>
              <p className="mt-5 max-w-[42ch] text-lg text-muted">{home.valuePack.body}</p>
              <div className="mt-8">
                <AddPackButton
                  name={valueProduct.name}
                  image={valueProduct.image}
                  pack={valuePack}
                  label={home.valuePack.cta.label}
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="bg-cream">
        <Reviews items={reviews.items} />
      </div>

      {/* Collagen guide */}
      <section className="wrap py-20 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[560px]">
            <h2 className="text-[48px] md:text-[64px]">{guide.heading}</h2>
            <p className="mt-4 text-lg text-muted">{guide.intro}</p>
          </div>
          <Link href="/collagen-guide" className="link text-green">
            Read the full guide
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {guide.sections.slice(0, 3).map((s) => (
            <Link key={s.id} href={`/collagen-guide#${s.id}`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-panel)] bg-stone">
                <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-6 text-[30px] group-hover:underline group-hover:decoration-brass group-hover:underline-offset-4">
                {s.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-muted">{s.body[0]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Questions */}
      <section className="bg-cream">
        <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <h2 className="text-[48px] md:col-span-4 md:text-[64px]">Questions, answered</h2>
          <div className="md:col-span-8">
            <Faq items={home.faq} />
          </div>
        </div>
      </section>
    </>
  );
}
