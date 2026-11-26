import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackPicker } from "@/components/AddToCart";
import { Checks } from "@/components/Checks";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { Star } from "@/components/Ornament";
import { ProductCard } from "@/components/ProductCard";
import { Research } from "@/components/Research";
import { Reviews } from "@/components/Reviews";
import { Ritual } from "@/components/Ritual";
import { getChecks, getCompany, getHome, getProduct, getProducts, getReviews } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return product ? { title: product.name, description: product.intro } : {};
}

export default async function ProductPage({ params }: Params) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const [home, company, reviews, all, checks] = await Promise.all([
    getHome(),
    getCompany(),
    getReviews(),
    getProducts(),
    getChecks(),
  ]);
  const isCollagen = product.slug === "collagen" || product.slug === "marine-collagen";
  const isSupplement = product.kind === "Food supplement";
  const isFood = product.kind !== "Personal care";
  const howToImage = product.gallery[1] ?? product.gallery[0];
  const others = all.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* Gallery and buy box */}
      <section>
        <div className="wrap grid gap-10 pb-16 pt-8 md:grid-cols-2 md:gap-16 md:pb-24 md:pt-14">
          <Gallery slides={product.gallery} />

          <div className="md:sticky md:top-28 md:self-start md:py-4">
            <p className="text-[14px] text-brass-ink">
              {product.kind}, {product.size}
            </p>
            <h1 className="mt-3 text-[48px] md:text-[68px]">{product.name}</h1>
            <p className="mt-6 max-w-[48ch] text-lg text-muted">{product.intro}</p>

            <div className="mt-9">
              <PackPicker
                name={product.name}
                image={product.image}
                packs={product.packs}
                placeholder={product.pricePlaceholder}
                halal={isFood}
              />
            </div>

            <dl className="mt-10">
              {product.facts.map((f) => (
                <div key={f.term} className="flex justify-between gap-6 border-t border-brass/40 py-3.5">
                  <dt className="text-muted">{f.term}</dt>
                  <dd className="text-right">{f.detail}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-6 border-y border-brass/40 py-3.5">
                <dt className="text-muted">Ingredients</dt>
                <dd className="text-right">{product.ingredients}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Why collagen (collagen products) */}
      {isCollagen && (
        <section className="bg-cream">
          <div className="wrap py-20 md:py-28">
            <div className="mx-auto max-w-[860px] text-center">
              <p className="display text-[110px] leading-none text-brass md:text-[170px]" aria-hidden="true">{home.story.stat}</p>
              <h2 className="mt-2 text-[32px] md:mt-0 md:text-[46px]">
                <span className="sr-only">{home.story.stat} </span>
                {home.story.statement}
              </h2>
              <p className="mt-5 text-[13px] italic text-muted">{home.story.source}</p>
            </div>
            <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
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
          </div>
        </section>
      )}

      {isCollagen && <Research {...home.research} />}

      {product.slug === "collagen" && <Checks {...checks} />}

      {/* How to use */}
      <section className="wrap py-20 md:py-28">
        <h2 className="mb-14 text-[48px] md:text-[68px]">How to use it</h2>
        {isCollagen ? (
          <Ritual steps={product.howTo} films={product.slug === "collagen" ? home.ritual.films : []} />
        ) : (
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <ol className="space-y-6">
              {product.howTo.map((s, i) => (
                <li key={s} className="flex gap-5 border-t border-brass/40 pt-5">
                  {product.howTo.length > 1 && <span className="display text-[44px] text-brass">{i + 1}</span>}
                  <p className="pt-2 text-lg leading-snug">{s}</p>
                </li>
              ))}
            </ol>
            <div className="arch relative aspect-[4/5] bg-stone">
              <Image src={howToImage.image} alt={howToImage.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </section>

      {/* Label statements */}
      {isSupplement && (
        <section className="bg-cream">
          <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
            <h2 className="text-[48px] md:col-span-4 md:text-[60px]">On the label</h2>
            <div className="space-y-4 text-lg md:col-span-8">
              {company.statements.map((s) => (
                <p key={s}>{s}</p>
              ))}
              <p>
                If you are pregnant, breastfeeding, taking medication or have a medical condition, consult a healthcare
                professional before use.
              </p>
              <p>Store in a cool, dry place with the lid tightly closed.</p>
              <p className="pt-4 text-base text-muted">
                The full nutrition panel will be published here once it is confirmed with the manufacturer.
              </p>
            </div>
          </div>
        </section>
      )}

      <Reviews items={reviews.items} />

      {isCollagen && (
        <section className="bg-cream">
          <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
            <h2 className="text-[48px] md:col-span-4 md:text-[60px]">Questions, answered</h2>
            <div className="md:col-span-8">
              <Faq items={home.faq} />
            </div>
          </div>
        </section>
      )}

      {/* More from the range */}
      <section className="wrap py-20 md:py-28">
        <div className="text-center">
          <Star className="mx-auto mb-6 text-brass" size={24} />
          <h2 className="text-[44px] md:text-[60px]">Also in the range</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-10">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/shop" className="link text-green">
            See the whole range
          </Link>
        </div>
      </section>
    </>
  );
}
