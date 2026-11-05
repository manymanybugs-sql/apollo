"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "apollo-subscribe-popup-seen";

export default function SubscribePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/subscribe" || pathname.startsWith("/subscribe/")) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }

    const timeout = window.setTimeout(() => {
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return;
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        return;
      }
      setOpen(true);
    }, 12000);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="apollo-subscribe-title"
        className="relative w-full max-w-lg bg-[#f4f1ea] p-7 text-[#151515] shadow-2xl sm:p-10"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close subscribe popup"
          className="absolute right-4 top-4 rounded p-2 text-xl leading-none text-black/60 transition-colors hover:text-black focus-visible:outline-2"
        >
          ×
        </button>
        <p className="text-xs uppercase tracking-[0.3em] text-black/45">Apollo Insight</p>
        <h2 id="apollo-subscribe-title" className="mt-6 max-w-sm font-serif text-4xl leading-tight sm:text-5xl">
          The next conversation, in your inbox.
        </h2>
        <p className="mt-5 max-w-md text-base leading-7 text-black/65">
          Conversations with founders, investors and people building what comes next. Free to subscribe.
        </p>
        <iframe
          src="https://apolloinsights.substack.com/embed"
          title="Subscribe to Apollo Insight on Substack"
          className="mt-6 h-[160px] w-full max-w-[480px]"
          loading="lazy"
        />
        <button
          type="button"
          onClick={close}
          className="mt-3 text-sm text-black/50 underline underline-offset-4 transition-colors hover:text-black"
        >
          Maybe later
        </button>
      </section>
    </div>
  );
}
