"use client";

import { useEffect, useState } from "react";

const KEY = "umma-welcome-seen";

/*
  First-visit offer. Shows once, after 10 seconds or a third of the page scrolled, never on load.
  Sign-in is not connected yet: when Supabase Auth is added, a successful sign-in will issue a
  unique single-use code server-side that expires 24 hours later.
*/
export function WelcomeOffer() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      return;
    }
    const show = () => {
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.33) show();
    };
    const timer = window.setTimeout(show, 10000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button aria-label="Close offer" className="absolute inset-0 bg-green-deep/45" onClick={close} />
      <div
        role="dialog"
        aria-labelledby="welcome-title"
        className="relative w-full max-w-[440px] rounded-[var(--radius-panel)] bg-paper p-7 sm:p-9"
      >
        <h2 id="welcome-title" className="text-[32px]">
          10% off your first order
        </h2>
        <p className="mt-3 text-muted">
          Sign in and we will send you a code for one order. It is valid for 24 hours from the moment you receive it.
        </p>

        <div className="mt-6 space-y-3">
          <button className="btn btn-primary w-full" onClick={() => setNote("Google sign-in is being connected.")}>
            Continue with Google
          </button>
          <button className="btn btn-outline w-full" onClick={() => setNote("Phone sign-in is being connected.")}>
            Continue with phone number
          </button>
        </div>

        {note && (
          <p role="status" className="mt-4 text-sm text-muted">
            {note}
          </p>
        )}

        <button className="link mt-6 text-sm text-muted" onClick={close}>
          No thanks
        </button>
      </div>
    </div>
  );
}
