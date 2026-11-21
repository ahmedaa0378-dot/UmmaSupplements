import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PackPicker } from "@/components/AddToCart";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { Research } from "@/components/Research";
import { Reviews } from "@/components/Reviews";
import { Ritual } from "@/components/Ritual";
import { getCompany, getHome, getProduct, getProducts, getReviews } from "@/lib/content";

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

  const [home, company, reviews] = await Promise.all([getHome(), getCompany(), getReviews()]);
  const isCollagen = product.slug === "halal-collagen";
  const isSupplement = product.kind === "Food supplement";
  const howToImage = product.gallery[1] ?? product.gallery[0];

  return (
    <>
      {/* Hero: gallery and buy box */}
      <section className="bg-cream">
        <div className="wrap grid gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
          <Gallery slides={product.gallery} />

          <div className="md:py-6">
            <p className="text-muted">
              {product.kind}, {product.size}
            </p>
            <h1 className="mt-2 text-[40px] md:text-[56px]">{product.name}</h1>
            <p className="mt-5 max-w-[50ch] text-lg text-muted">{product.intro}</p>

            <div className="mt-8">
              <PackPicker
                name={product.name}
                image={product.image}
                packs={product.packs}
                placeholder={product.pricePlaceholder}
              />
            </div>

            <dl className="mt-10">
              {product.facts.map((f) => (
                <div key={f.term} className="flex justify-between gap-6 border-t border-green/15 py-3.5">
                  <dt className="text-muted">{f.term}</dt>
                  <dd className="text-right">{f.detail}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-6 border-y border-green/15 py-3.5">
                <dt className="text-muted">Ingredients</dt>
                <dd className="text-right">{product.ingredients}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Benefits (collagen) */}
      {isCollagen && (
        <section className="wrap py-20 md:py-28">
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
        </section>
      )}

      {isCollagen && <Research {...home.research} />}

      {/* How to use */}
      <section className="wrap py-20 md:py-28">
        <h2 className="mb-12 text-[36px] md:text-[48px]">How to use it</h2>
        {isCollagen ? (
          <Ritual steps={product.howTo} films={home.ritual.films} />
        ) : (
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <ol className="space-y-6">
              {product.howTo.map((s, i) => (
                <li key={s} className="flex gap-4">
                  {product.howTo.length > 1 && (
                    <span className="text-[40px] font-light leading-none text-gold">{i + 1}</span>
                  )}
                  <p className="pt-1.5 text-lg leading-snug">{s}</p>
                </li>
              ))}
            </ol>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] bg-stone">
              <Image
                src={howToImage.image}
                alt={howToImage.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </section>

      {/* Label statements */}
      {isSupplement && (
        <section className="bg-cream">
          <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
            <h2 className="text-[36px] md:col-span-4 md:text-[48px]">On the label</h2>
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

      {/* Questions */}
      {isCollagen && (
        <section className="bg-cream">
          <div className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
            <h2 className="text-[36px] md:col-span-4 md:text-[48px]">Questions about collagen</h2>
            <div className="md:col-span-8">
              <Faq items={home.faq} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
