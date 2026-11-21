import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackPicker } from "@/components/AddToCart";
import { CertificateCard } from "@/components/CertificateCard";
import { Faq } from "@/components/Faq";
import { FilmSlot } from "@/components/FilmSlot";
import { Ritual } from "@/components/Ritual";
import { getCertificate, getCompany, getHome, getProduct, getProducts } from "@/lib/content";

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

  const [home, cert, company] = await Promise.all([getHome(), getCertificate(), getCompany()]);
  const isCollagen = product.slug === "halal-collagen";
  const isSupplement = product.kind === "Food supplement";

  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="wrap grid gap-10 py-10 md:grid-cols-2 md:gap-14 md:py-16">
          <div
            className={`relative overflow-hidden rounded-[var(--radius-panel)] bg-stone ${
              product.portrait ? "aspect-[4/5]" : "aspect-[4/5] md:aspect-auto md:min-h-[560px]"
            }`}
          >
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

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

      {/* How to use */}
      <section className="wrap py-20 md:py-28">
        <h2 className="mb-12 text-[36px] md:text-[48px]">How to use it</h2>
        {isCollagen ? (
          <Ritual steps={product.howTo} films={home.ritual.films} />
        ) : (
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
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
            <FilmSlot shot={product.heroFilm} className="aspect-[4/3]" />
          </div>
        )}
      </section>

      {/* Product film (collagen) */}
      {isCollagen && (
        <section className="wrap pb-20 md:pb-28">
          <FilmSlot shot={product.heroFilm} tone="green" className="aspect-[4/5] md:aspect-[21/9]" />
        </section>
      )}

      {/* Halal certificate */}
      {isSupplement && (
        <section className="bg-green text-cream">
          <div className="wrap grid items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
            <div>
              <h2 className="text-[36px] md:text-[48px]">Halal, with the paperwork to show it.</h2>
              <p className="mt-6 max-w-[48ch] text-lg text-cream/80">
                Each UMMA food supplement carries its own certificate record. Check the issuer and number against the
                certifying body before you buy.
              </p>
              <Link href="/halal" className="btn btn-outline-light mt-8">
                Read our halal promise
              </Link>
            </div>
            <CertificateCard cert={{ ...cert, product: product.name }} />
          </div>
        </section>
      )}

      {/* Label statements and nutrition */}
      {isSupplement && (
        <section className="wrap grid gap-10 py-20 md:grid-cols-12 md:py-28">
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
        </section>
      )}

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
