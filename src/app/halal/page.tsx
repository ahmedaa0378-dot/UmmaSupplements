import type { Metadata } from "next";
import Link from "next/link";
import { CertificateCard } from "@/components/CertificateCard";
import { getCertificate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Halal promise",
  description: "How UMMA Supplements shows its halal certification: issuer, certificate number, expiry and a link to verify.",
};

const commitments = [
  {
    title: "Every certificate is published",
    body: "For each halal product you will see who issued the certificate, its number and the date it is valid until.",
  },
  {
    title: "You can check it without us",
    body: "Each record links to the certifying body, so you can confirm the certificate is real and current.",
  },
  {
    title: "We say when something is not ready",
    body: "If a certificate is being renewed or is still in progress, this page says so plainly instead of showing a badge.",
  },
];

export default async function HalalPage() {
  const cert = await getCertificate();
  return (
    <>
      <section className="bg-green text-cream">
        <div className="wrap grid items-center gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div>
            <h1 className="text-[44px] md:text-[64px]">Our halal promise</h1>
            <p className="mt-6 max-w-[48ch] text-lg text-cream/80">
              Halal is the reason UMMA exists, so we treat it as something to prove. This page holds the evidence.
            </p>
            <Link href="/products/halal-collagen" className="btn btn-light mt-8">
              Shop collagen
            </Link>
          </div>
          <CertificateCard cert={cert} />
        </div>
      </section>

      <section className="wrap grid gap-10 py-20 md:grid-cols-3 md:gap-8 md:py-28">
        {commitments.map((c) => (
          <div key={c.title} className="border-t border-green/20 pt-6">
            <h2 className="text-[28px]">{c.title}</h2>
            <p className="mt-4 text-muted">{c.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
