import Image from "next/image";
import Link from "next/link";
import { inr, type Product } from "@/content/site";

export function ProductCard({ product }: { product: Product }) {
  const from = product.packs[0]?.price;
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-stone">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-normal tracking-normal group-hover:underline group-hover:underline-offset-4">
          {product.name}
        </h3>
        <p className="text-muted">{product.short}</p>
        <p className="mt-1">{from ? inr(from) : "Price to be announced"}</p>
      </div>
    </Link>
  );
}
