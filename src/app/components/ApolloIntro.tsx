"use client";

import { useEffect, useState } from "react";

// Render the intro on the server, not after hydration. This keeps the
// homepage from flashing into view before the black screen appears.
export default function ApolloIntro() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMounted(false), 6200);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <div className="apollo-splash" aria-label="Apollo Insight introduction">
      <div className="apollo-splash-inner">
        <span className="apollo-splash-wordmark">Apollo</span>
        <span className="apollo-splash-subtitle">Insight</span>
        <div className="apollo-splash-track">
          <div className="apollo-splash-progress" />
        </div>
      </div>
    </div>
  );
}
