"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { inr } from "@/content/site";

export type CartLine = { id: string; name: string; label: string; price: number; image: string; qty: number };

type CartState = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, "qty">) => void;
  setQty: (id: string, qty: number) => void;
};

const Ctx = createContext<CartState | null>(null);
const KEY = "umma-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Load the saved cart once, after hydration, so server and client markup match.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setLines(JSON.parse(saved));
    } catch {}
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const value = useMemo<CartState>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines,
      count,
      total,
      open,
      setOpen,
      add: (line) => {
        setLines((prev) => {
          const hit = prev.find((l) => l.id === line.id);
          return hit
            ? prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + 1 } : l))
            : [...prev, { ...line, qty: 1 }];
        });
        setOpen(true);
      },
      setQty: (id, qty) =>
        setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)))),
    };
  }, [lines, open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer />
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

function CartDrawer() {
  const { lines, total, open, setOpen, setQty } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button aria-label="Close cart" className="absolute inset-0 bg-green-deep/40" onClick={() => setOpen(false)} />
      <aside
        role="dialog"
        aria-label="Your cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-paper"
      >
        <div className="flex items-center justify-between border-b border-stone px-6 py-5">
          <h2 className="text-2xl">Your cart</h2>
          <button className="link text-sm" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <p className="py-10 text-muted">Your cart is empty. Add a jar of collagen to start.</p>
          ) : (
            <ul>
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 border-b border-stone py-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone">
                    <Image src={l.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium leading-snug">{l.name}</p>
                    <p className="text-sm text-muted">{l.label}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-stone">
                        <button className="h-9 w-9" aria-label="Remove one" onClick={() => setQty(l.id, l.qty - 1)}>
                          −
                        </button>
                        <span className="w-6 text-center text-sm">{l.qty}</span>
                        <button className="h-9 w-9" aria-label="Add one" onClick={() => setQty(l.id, l.qty + 1)}>
                          +
                        </button>
                      </div>
                      <span>{inr(l.price * l.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-stone px-6 py-5">
          <div className="mb-4 flex justify-between text-lg">
            <span>Subtotal</span>
            <span>{inr(total)}</span>
          </div>
          <button className="btn btn-primary w-full" disabled>
            Checkout opens at launch
          </button>
          <p className="mt-3 text-sm text-muted">Payment and delivery are being connected. Your cart is saved on this device.</p>
        </div>
      </aside>
    </div>
  );
}
