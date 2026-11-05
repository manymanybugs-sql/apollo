"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "apollo-intro-seen-v2";
const INTRO_DURATION_MS = 5500;

export default function ApolloIntro() {
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // ?intro=1 allows the animation to be previewed on demand,
    // even when the visitor has already seen it this session.
    const forcePreview = new URLSearchParams(window.location.search).get("intro") === "1";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(prefersReducedMotion);

    try {
      if (!forcePreview && sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // Continue to show the intro if storage is unavailable.
    }

    setVisible(true);
    const duration = prefersReducedMotion ? 800 : INTRO_DURATION_MS;
    const timeout = window.setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
    }, duration);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVisible(false);
        try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#080808] text-[#f4f1ea] ${reduceMotion ? "" : "apollo-intro"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Apollo introduction"
    >
      <div className="pointer-events-none flex flex-col items-center px-6 text-center">
        <span className={`font-serif text-[clamp(4rem,12vw,11rem)] leading-none tracking-[-0.055em] ${reduceMotion ? "" : "apollo-intro-wordmark"}`}>
          Apollo
        </span>
        <span className={`mt-6 text-[10px] uppercase tracking-[0.5em] text-white/55 sm:text-xs ${reduceMotion ? "" : "apollo-intro-subtitle"}`}>
          Insight
        </span>
        {!reduceMotion && (
          <div className="mt-12 h-px w-28 overflow-hidden bg-white/15">
            <div className="apollo-intro-progress h-full bg-white/80" />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="absolute bottom-8 right-8 rounded-sm px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Skip intro
      </button>
    </div>
  );
}
