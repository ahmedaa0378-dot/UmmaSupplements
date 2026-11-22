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
  const link = "hover:underline hover:decoration-brass hover:underline-offset-[6px]";

  return (
    <>
      <Link
        href={announcement.href}
        className="block bg-green-deep px-4 py-2.5 text-center text-[13px] tracking-[0.04em] text-ivory"
      >
        {announcement.text}
      </Link>
      <header className="sticky top-0 z-40 border-b border-brass/30 bg-ivory/95 backdrop-blur">
        <div className="wrap grid h-[72px] grid-cols-[1fr_auto_1fr] items-center">
          <nav aria-label="Main" className="hidden gap-8 text-[15px] md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={link}>
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            className="justify-self-start text-[15px] md:hidden"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? "Close" : "Menu"}
          </button>

          <Link href="/" aria-label="UMMA Supplements, home" className="justify-self-center">
            <Image src="/img/umma-logo.svg" alt="UMMA Supplements" width={206} height={71} priority className="h-10 w-auto md:h-11" />
          </Link>

          <div className="flex items-center gap-6 justify-self-end text-[15px]">
            <Link href="/#reviews" className={`hidden md:inline ${link}`}>
              Reviews
            </Link>
            <button onClick={() => setOpen(true)} className={link}>
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
          </div>
        </div>

        {menu && (
          <nav id="mobile-nav" aria-label="Main" className="border-t border-brass/30 md:hidden">
            <div className="wrap flex flex-col py-2">
              {[...nav, { label: "Reviews", href: "/#reviews" }].map((n) => (
                <Link key={n.href} href={n.href} className="display py-3 text-[28px]" onClick={() => setMenu(false)}>
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
