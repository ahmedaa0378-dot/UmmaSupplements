type Cert = {
  placeholder: boolean;
  product: string;
  issuer: string;
  number: string;
  validUntil: string;
  verifyUrl: string;
};

/* The certificate is the centre of the brand promise, so it is shown as a record, not a badge. */
export function CertificateCard({ cert }: { cert: Cert }) {
  const pending = "To be published";
  const rows = [
    { term: "Product", detail: cert.product },
    { term: "Certifying body", detail: cert.issuer || pending },
    { term: "Certificate number", detail: cert.number || pending },
    { term: "Valid until", detail: cert.validUntil || pending },
  ];

  return (
    <div className="rounded-[var(--radius-panel)] bg-cream p-7 text-ink md:p-9">
      <div className="flex items-start justify-between gap-6">
        <h3 className="text-2xl md:text-[28px]">Halal certificate</h3>
        <HalalSeal />
      </div>

      <dl className="mt-7">
        {rows.map((r) => (
          <div key={r.term} className="flex items-baseline justify-between gap-6 border-t border-green/15 py-3.5">
            <dt className="text-muted">{r.term}</dt>
            <dd className={`text-right ${r.detail === pending ? "text-muted" : "font-medium"}`}>{r.detail}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-green/15 pt-6">
        {cert.verifyUrl ? (
          <a href={cert.verifyUrl} className="btn btn-primary w-full" target="_blank" rel="noopener noreferrer">
            Verify with the certifying body
          </a>
        ) : (
          <p className="text-sm text-muted">
            We are finalising certification. The issuer, number, expiry date and a verification link will appear here
            before we take our first order.
          </p>
        )}
      </div>
    </div>
  );
}

function HalalSeal() {
  return (
    <svg width="72" height="72" viewBox="0 0 56 56" aria-hidden="true" className="shrink-0 text-gold">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="11" y="11" width="34" height="34" />
        <rect x="11" y="11" width="34" height="34" transform="rotate(45 28 28)" />
      </g>
      <text x="28" y="30.5" textAnchor="middle" fontSize="7" fontWeight="600" fill="#0f3d2e" letterSpacing="0.5">
        HALAL
      </text>
    </svg>
  );
}
