import Image from "next/image";
import Link from "next/link";
import { getCertificate, getCompany, getProducts } from "@/lib/content";
import { Star } from "./Ornament";

export async function Footer() {
  const [company, products, cert] = await Promise.all([getCompany(), getProducts(), getCertificate()]);
  const pending = "To be published";
  const certRows = [
    { term: "Certifying body", detail: cert.issuer || pending },
    { term: "Certificate number", detail: cert.number || pending },
    { term: "Valid until", detail: cert.validUntil || pending },
  ];
  const link = "hover:underline hover:decoration-brass hover:underline-offset-4";

  return (
    <footer className="bg-green-deep text-ivory">
      <div className="wrap pb-10 pt-16 md:pt-20">
        <div className="flex flex-col items-center gap-6 text-center">
          <Image src="/img/umma-logo-ivory.svg" alt="UMMA Supplements" width={206} height={71} className="h-12 w-auto" />
          <Star className="text-brass" />
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="text-[24px]">Shop</h2>
            <ul className="mt-4 space-y-2 text-ivory/80">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className={link}>
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[24px]">Learn</h2>
            <ul className="mt-4 space-y-2 text-ivory/80">
              <li>
                <Link href="/collagen-guide" className={link}>
                  The collagen guide
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className={link}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[24px]">Customer care</h2>
            <ul className="mt-4 space-y-2 text-ivory/80">
              <li>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={link}>
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${company.whatsapp}`} className={link} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className={`break-all ${link}`}>
                  {company.email}
                </a>
              </li>
            </ul>
          </div>

          <div id="halal" className="scroll-mt-28">
            <h2 className="text-[24px]">Halal certificate</h2>
            <dl className="mt-4 text-sm">
              {certRows.map((r) => (
                <div key={r.term} className="flex justify-between gap-4 border-t border-ivory/15 py-2.5">
                  <dt className="text-ivory/60">{r.term}</dt>
                  <dd className="text-right text-ivory/85">{r.detail}</dd>
                </div>
              ))}
            </dl>
            {cert.verifyUrl && (
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-sm">
                Verify with the certifying body
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-ivory/15 pt-8 text-[13px] text-ivory/60 md:grid-cols-2">
          <div className="space-y-1">
            {company.statements.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <div className="md:text-right">
            <p>Marketed by {company.marketedBy}</p>
            <p className="mt-1">© UMMA Supplements</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
