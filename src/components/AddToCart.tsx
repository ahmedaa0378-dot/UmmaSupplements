"use client";

import { useState } from "react";
import { inr, type Pack } from "@/content/site";
import { useCart } from "./cart";

type Props = {
  name: string;
  image: string;
  packs: Pack[];
  placeholder?: boolean;
};

/* Pack picker plus add-to-cart for a product page. */
export function PackPicker({ name, image, packs, placeholder }: Props) {
  const { add } = useCart();
  const [picked, setPicked] = useState(packs[0]?.id);
  const pack = packs.find((p) => p.id === picked);

  if (!pack) {
    return (
      <div>
        <p className="text-2xl">Price to be announced</p>
        <button className="btn btn-primary mt-5 w-full sm:w-auto" disabled>
          Available at launch
        </button>
      </div>
    );
  }

  return (
    <div>
      <fieldset>
        <legend className="mb-3 text-muted">Choose a pack</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {packs.map((p) => {
            const on = p.id === picked;
            return (
              <label
                key={p.id}
                className={`cursor-pointer rounded-[var(--radius-card)] border-[1.5px] p-4 ${
                  on ? "border-green bg-cream" : "border-stone"
                }`}
              >
                <input
                  type="radio"
                  name="pack"
                  className="sr-only"
                  checked={on}
                  onChange={() => setPicked(p.id)}
                />
                <span className="flex items-baseline justify-between">
                  <span className="font-medium">{p.label}</span>
                  <span>
                    {p.compareAt && <s className="mr-2 text-sm text-muted">{inr(p.compareAt)}</s>}
                    {inr(p.price)}
                  </span>
                </span>
                {p.note && <span className="text-sm text-muted">{p.note}</span>}
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        className="btn btn-primary mt-5 w-full"
        onClick={() => add({ id: pack.id, name, label: pack.label, price: pack.price, image })}
      >
        Add to cart, {inr(pack.price)}
      </button>
      {placeholder && <p className="mt-3 text-sm text-muted">Prices shown are provisional until launch.</p>}
    </div>
  );
}

/* One-tap add for a specific pack, used by offer blocks on the homepage. */
export function AddPackButton({
  name,
  image,
  pack,
  label,
  className = "btn btn-light",
}: {
  name: string;
  image: string;
  pack: Pack;
  label: string;
  className?: string;
}) {
  const { add } = useCart();
  return (
    <button className={className} onClick={() => add({ id: pack.id, name, label: pack.label, price: pack.price, image })}>
      {label}
    </button>
  );
}
