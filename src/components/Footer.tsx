import Image from "next/image";
import Link from "next/link";
import { getCertificate, getCompany, getProducts } from "@/lib/content";

export async function Footer() {
  const [company, products, cert] = await Promise.all([getCompany(), getProducts(), getCertificate()]);
  const pending = "To be published";
  const certRows = [
    { term: "Certifying body", detail: cert.issuer || pending },
    { term: "Certificate number", detail: cert.number || pending },
    { term: "Valid until", detail: cert.validUntil || pending },
  ];

  return (
    <footer className="bg-green-deep text-cream">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Image src="/img/logo-cream.png" alt="UMMA Supplements" width={1023} height={354} className="h-10 w-auto" />
          <div className="mt-8 max-w-[40ch] space-y-2 text-sm text-cream/75">
            {company.statements.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium tracking-normal">Shop</h2>
          <ul className="mt-4 space-y-2 text-cream/80">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="hover:underline hover:underline-offset-4">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/collagen-guide" className="hover:underline hover:underline-offset-4">
                Collagen guide
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-medium tracking-normal">Customer care</h2>
          <ul className="mt-4 space-y-2 text-cream/80">
            <li>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:underline hover:underline-offset-4">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="break-all hover:underline hover:underline-offset-4">
                {company.email}
              </a>
            </li>
            <li className="pt-2 text-sm text-cream/60">Marketed by {company.marketedBy}</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-medium tracking-normal">Halal certificate</h2>
          <dl className="mt-4 text-sm">
            {certRows.map((r) => (
              <div key={r.term} className="flex justify-between gap-4 border-t border-cream/15 py-2.5">
                <dt className="text-cream/60">{r.term}</dt>
                <dd className="text-right text-cream/85">{r.detail}</dd>
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
      <div className="border-t border-cream/15">
        <div className="wrap py-5 text-sm text-cream/60">© UMMA Supplements</div>
      </div>
    </footer>
  );
}
