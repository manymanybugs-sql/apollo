"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "apollo-intro-seen";
const INTRO_DURATION_MS = 5500;

export default function ApolloIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // The intro is visual only. Don't make visitors with reduced-motion
    // preferences or returning visitors wait to reach the content.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // If storage is disabled, don't risk repeatedly blocking the site.
      return;
    }

    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), INTRO_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808] text-[#f4f1ea] apollo-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Apollo introduction"
    >
      <div className="pointer-events-none flex flex-col items-center px-6 text-center">
        <span className="apollo-intro-wordmark font-serif text-[clamp(4rem,12vw,11rem)] leading-none tracking-[-0.055em]">
          Apollo
        </span>
        <span className="apollo-intro-subtitle mt-6 text-[10px] uppercase tracking-[0.5em] text-white/55 sm:text-xs">
          Insight
        </span>
        <div className="mt-12 h-px w-28 overflow-hidden bg-white/15">
          <div className="apollo-intro-progress h-full bg-white/80" />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute bottom-8 right-8 rounded-sm px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Skip intro
      </button>
    </div>
  );
}
