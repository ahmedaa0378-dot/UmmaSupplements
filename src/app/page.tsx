import Image from "next/image";
import Link from "next/link";
import { AddPackButton } from "@/components/AddToCart";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Research } from "@/components/Research";
import { Reviews } from "@/components/Reviews";
import { Ritual } from "@/components/Ritual";
import { inr } from "@/content/site";
import { getGuide, getHome, getProducts, getReviews } from "@/lib/content";

const highlights = [
  "10 g of collagen peptides in every scoop",
  "No flavour, so it disappears into your drink",
  "Made in India",
];

export default async function HomePage() {
  const [home, products, reviews, guide] = await Promise.all([getHome(), getProducts(), getReviews(), getGuide()]);
  const collagen = products[0];
  const valueProduct = products.find((p) => p.slug === home.valuePack.cta.productSlug);
  const valuePack = valueProduct?.packs.find((p) => p.id === home.valuePack.cta.packId);

  return (
    <>
      <Hero {...home.hero} />

      {/* Product facts */}
      <section className="bg-cream">
        <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4">
          {collagen.facts.map((f) => (
            <div key={f.term}>
              <dt className="text-sm text-muted">{f.term}</dt>
              <dd className="mt-1 text-lg leading-snug text-green">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured product */}
      <section className="wrap grid items-center gap-10 py-20 md:grid-cols-2 md:gap-16 md:py-28">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)] bg-stone">
          <Image
            src={collagen.gallery[1].image}
            alt={collagen.gallery[1].alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-muted">{collagen.size}</p>
          <h2 className="mt-2 text-[36px] md:text-[48px]">{collagen.name}</h2>
          <p className="mt-5 max-w-[46ch] text-lg text-muted">{collagen.intro}</p>
          <ul className="mt-6 space-y-2 text-lg">
            {highlights.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 18 18" className="mt-1.5 shrink-0 text-gold" aria-hidden="true">
                  <path d="M3.5 9.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href={`/products/${collagen.slug}`} className="btn btn-primary">
              Shop collagen, {inr(collagen.packs[0].price)}
            </Link>
            <Link href="/collagen-guide" className="link text-green">
              How collagen works
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream">
        <div className="wrap py-20 md:py-28">
          <div className="mb-12 max-w-[560px]">
            <h2 className="text-[36px] md:text-[48px]">{home.benefits.heading}</h2>
            <p className="mt-4 text-lg text-muted">{home.benefits.body}</p>
          </div>
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {home.benefits.items.map((b) => (
              <article key={b.title}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-stone">
                  <Image src={b.image} alt={b.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <h3 className="mt-5 text-[28px]">{b.title}</h3>
                <p className="mt-2 text-muted">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Research {...home.research} />

      {/* Daily ritual */}
      <section className="wrap py-20 md:py-28">
        <div className="mb-12 max-w-[30ch]">
          <h2 className="text-[36px] md:text-[48px]">{home.ritual.heading}</h2>
          <p className="mt-4 text-lg text-muted">{home.ritual.body}</p>
        </div>
        <Ritual steps={collagen.howTo} films={home.ritual.films} />
      </section>

      {/* Lifestyle banner */}
      <section className="relative isolate overflow-hidden text-cream">
        <Image src={home.banner.image} alt={home.banner.alt} fill sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-green-deep/85 via-green-deep/20 to-transparent" />
        <div className="wrap flex min-h-[520px] flex-col justify-end py-12 md:min-h-[640px] md:py-16">
          <h2 className="max-w-[18ch] text-[36px] md:text-[56px]">{home.banner.heading}</h2>
          <p className="mt-4 text-lg text-cream/85">{home.banner.body}</p>
        </div>
      </section>

      {/* Value pack */}
      {valueProduct && valuePack && (
        <section className="wrap py-20 md:py-28">
          <div className="grid overflow-hidden rounded-[var(--radius-panel)] bg-green-deep text-cream md:grid-cols-2">
            <div className="p-8 md:p-14">
              <h2 className="text-[36px] md:text-[48px]">{home.valuePack.heading}</h2>
              <p className="mt-5 max-w-[40ch] text-lg text-cream/80">{home.valuePack.body}</p>
              <div className="mt-8">
                <AddPackButton
                  name={valueProduct.name}
                  image={valueProduct.image}
                  pack={valuePack}
                  label={home.valuePack.cta.label}
                />
              </div>
            </div>
            <div className="relative min-h-[280px]">
              <Image src={valueProduct.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* Collagen guide */}
      <section className="bg-cream">
        <div className="wrap py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[560px]">
              <h2 className="text-[36px] md:text-[48px]">{guide.heading}</h2>
              <p className="mt-4 text-lg text-muted">{guide.intro}</p>
            </div>
            <Link href="/collagen-guide" className="link text-green">
              Read the full guide
            </Link>
          </div>
          <div className="grid gap-x-5 gap-y-10 md:grid-cols-3">
            {guide.sections.slice(0, 3).map((s) => (
              <Link key={s.id} href={`/collagen-guide#${s.id}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-stone">
                  <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <h3 className="mt-5 text-[26px] group-hover:underline group-hover:underline-offset-4">{s.title}</h3>
                <p className="mt-2 line-clamp-3 text-muted">{s.body[0]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Reviews items={reviews.items} />

      {/* Range */}
      <section className="bg-cream">
        <div className="wrap py-20 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[36px] md:text-[48px]">The UMMA range</h2>
            <Link href="/shop" className="link text-green">
              See all products
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <h2 className="text-[36px] md:col-span-4 md:text-[48px]">Questions people ask first</h2>
        <div className="md:col-span-8">
          <Faq items={home.faq} />
        </div>
      </section>
    </>
  );
}
