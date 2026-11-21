"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./cart";

type Props = {
  nav: { label: string; href: string }[];
  announcement: { text: string; href: string };
};

export function Header({ nav, announcement }: Props) {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);

  return (
    <>
      <Link href={announcement.href} className="block bg-green px-4 py-2.5 text-center text-sm text-cream">
        {announcement.text}
      </Link>
      <header className="sticky top-0 z-40 border-b border-stone bg-paper/95 backdrop-blur">
        <div className="wrap flex h-[68px] items-center justify-between">
          <Link href="/" aria-label="UMMA Supplements, home" className="shrink-0">
            <Image src="/img/logo-green.png" alt="UMMA Supplements" width={1023} height={354} priority className="h-11 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden gap-9 md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:underline hover:underline-offset-4">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="rounded-full border border-green px-4 py-2 text-sm text-green">
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
            <button
              className="rounded-full px-3 py-2 text-sm md:hidden"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {menu && (
          <nav id="mobile-nav" aria-label="Main" className="border-t border-stone md:hidden">
            <div className="wrap flex flex-col py-2">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="py-3 text-lg" onClick={() => setMenu(false)}>
                  {n.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
