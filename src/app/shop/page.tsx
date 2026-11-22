import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/content";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <section className="wrap py-14 md:py-20">
      <h1 className="text-[56px] md:text-[88px]">The range</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-muted">
        Two collagens, a daily blend for the perimenopause years, and three kitchen staples done properly.
      </p>
      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-10">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
