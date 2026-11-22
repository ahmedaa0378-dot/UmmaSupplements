import Image from "next/image";
import Link from "next/link";
import { inr, type Product } from "@/content/site";

export function ProductCard({ product }: { product: Product }) {
  const from = product.packs[0]?.price;
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="arch relative aspect-[4/5] bg-stone">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 text-center">
        <h3 className="text-[26px] leading-tight group-hover:underline group-hover:decoration-brass group-hover:underline-offset-4">
          {product.name}
        </h3>
        <p className="mt-1 text-[15px] text-muted">{product.short}</p>
        <p className="mt-2 text-[15px] text-brass-ink">{from ? `From ${inr(from)}` : "Price at launch"}</p>
      </div>
    </Link>
  );
}
