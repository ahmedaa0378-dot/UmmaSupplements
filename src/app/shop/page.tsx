import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/content";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <section className="wrap py-14 md:py-20">
      <h1 className="text-[44px] md:text-[64px]">Shop</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-muted">
        Halal collagen and gelatin, with henna and multani mitti for hair and skin.
      </p>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
