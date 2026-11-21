"use client";

import { useState } from "react";
import { UMark } from "./UMark";

type Props = { faq: { q: string; a: string }[]; whatsapp: string };

/*
  First version of the UMMA assistant: answers the approved questions and hands off to WhatsApp.
  The AI assistant replaces the answer lookup later; the launcher and panel stay the same.
*/
export function ChatLauncher({ faq, whatsapp }: Props) {
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div
          role="dialog"
          aria-label="Ask UMMA"
          className="mb-3 flex max-h-[70vh] w-[min(360px,calc(100vw-40px))] flex-col overflow-hidden rounded-[var(--radius-card)] border border-stone bg-paper"
        >
          <div className="flex items-center justify-between bg-green px-5 py-4 text-cream">
            <span className="flex items-center gap-3 font-medium">
              <UMark className="h-5 w-auto" /> Ask UMMA
            </span>
            <button className="text-sm underline underline-offset-4" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-5 text-[15px]">
            <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-cream px-4 py-3">
              Assalamu alaikum. What would you like to know?
            </p>
            {asked.map((i) => (
              <div key={i} className="space-y-3">
                <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-green px-4 py-3 text-cream">
                  {faq[i].q}
                </p>
                <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-cream px-4 py-3">{faq[i].a}</p>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              {faq.map((f, i) =>
                asked.includes(i) ? null : (
                  <button
                    key={f.q}
                    className="rounded-full border border-green px-3.5 py-1.5 text-left text-sm text-green"
                    onClick={() => setAsked((a) => [...a, i])}
                  >
                    {f.q}
                  </button>
                ),
              )}
            </div>
          </div>

          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-t border-stone px-5 py-4 text-center text-sm font-medium text-green"
          >
            Talk to us on WhatsApp
          </a>
        </div>
      )}

      <button
        aria-label={open ? "Close chat" : "Ask UMMA a question"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-green text-cream ring-2 ring-paper"
      >
        <UMark className="h-6 w-auto" />
      </button>
    </div>
  );
}
