import Image from "next/image";
import Link from "next/link";
import { AddPackButton } from "@/components/AddToCart";
import { CertificateCard } from "@/components/CertificateCard";
import { Faq } from "@/components/Faq";
import { FilmSlot } from "@/components/FilmSlot";
import { ProductCard } from "@/components/ProductCard";
import { Ritual } from "@/components/Ritual";
import { getCertificate, getHome, getProducts } from "@/lib/content";

export default async function HomePage() {
  const [home, products, cert] = await Promise.all([getHome(), getProducts(), getCertificate()]);
  const collagen = products[0];
  const valueProduct = products.find((p) => p.slug === home.valuePack.cta.productSlug);
  const valuePack = valueProduct?.packs.find((p) => p.id === home.valuePack.cta.packId);

  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="wrap grid items-center gap-10 py-10 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-5">
            <h1 className="text-[44px] md:text-[64px]">{home.hero.heading}</h1>
            <p className="mt-6 max-w-[46ch] text-lg text-muted">{home.hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={home.hero.primary.href} className="btn btn-primary">
                {home.hero.primary.label}
              </Link>
              <Link href={home.hero.secondary.href} className="btn btn-outline">
                {home.hero.secondary.label}
              </Link>
            </div>
          </div>
          <FilmSlot
            className="aspect-[3/2] md:col-span-7"
            shot={home.hero.film}
            video={home.hero.video}
            poster={home.hero.poster}
            posterAlt={collagen.imageAlt}
            priority
          />
        </div>

        <div className="border-t border-green/15">
          <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4">
            {collagen.facts.map((f) => (
              <div key={f.term}>
                <dt className="text-sm text-muted">{f.term}</dt>
                <dd className="mt-1 text-lg leading-snug text-green">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Daily ritual */}
      <section className="wrap py-20 md:py-28">
        <div className="mb-12 max-w-[30ch]">
          <h2 className="text-[36px] md:text-[48px]">{home.ritual.heading}</h2>
          <p className="mt-4 text-lg text-muted">{home.ritual.body}</p>
        </div>
        <Ritual steps={collagen.howTo} films={home.ritual.films} />
      </section>

      {/* Halal promise */}
      <section className="bg-green text-cream">
        <div className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <div>
            <h2 className="text-[36px] md:text-[48px]">Do not take our word for it. Check the certificate.</h2>
            <p className="mt-6 max-w-[48ch] text-lg text-cream/80">
              Anyone can print the word halal on a pack. We publish who certified ours, the certificate number and the
              date it runs to, so you can confirm it with the certifying body yourself.
            </p>
            <Link href="/halal" className="btn btn-outline-light mt-8">
              Read our halal promise
            </Link>
          </div>
          <CertificateCard cert={cert} />
        </div>
      </section>

      {/* Short films */}
      <section className="py-20 md:py-28">
        <div className="wrap mb-10 max-w-[1200px]">
          <h2 className="text-[36px] md:text-[48px]">{home.films.heading}</h2>
          <p className="mt-4 text-lg text-muted">{home.films.body}</p>
        </div>
        <div className="wrap">
          <ul className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
            {home.films.items.map((f, i) => (
              <li key={f.title} className="w-[70%] shrink-0 snap-start md:w-auto">
                <FilmSlot shot={f.shot} tone={i % 2 ? "stone" : "green"} className="aspect-[9/14]" />
                <p className="mt-3 text-lg">{f.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Value pack */}
      {valueProduct && valuePack && (
        <section className="wrap pb-20 md:pb-28">
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
              <Image
                src={valueProduct.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

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
