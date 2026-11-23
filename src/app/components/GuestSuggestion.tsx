"use client";

import { useState, type FormEvent } from "react";

const inbox = "dara@apolloinsight.io";

const fieldClass =
  "mt-2 block w-full rounded-md border border-black/25 bg-white px-3 py-2.5 text-base focus-visible:outline-2 focus-visible:outline-offset-2";

export default function GuestSuggestion() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const body = new URLSearchParams();
    for (const [name, value] of new FormData(form)) {
      if (typeof value === "string") body.append(name, value);
    }

    setSending(true);
    setError("");
    setSent(false);
    const fallbackError = "Your suggestion couldn’t be sent. Please try again.";

    try {
      const response = await fetch(form.action, { method: "POST", body });
      const result = await response.json();
      if (response.ok && result.ok === true) {
        form.reset();
        setSent(true);
      } else {
        setError(typeof result.error === "string" ? result.error : fallbackError);
      }
    } catch {
      setError(fallbackError);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="suggest-a-founder" aria-labelledby="guest-suggestion-heading" className="scroll-mt-24 border-t border-black/10">
      <div className="mx-auto max-w-4xl px-6 py-14 md:px-10 md:py-20">
        <h2 id="guest-suggestion-heading" className="font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">
          Know a founder I should speak to?
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-black/65">
          Tell me who they are and what you’d want to hear them talk about. You can put yourself forward too.
        </p>
        <details className="mt-6 max-w-xl">
          <summary className="w-fit cursor-pointer rounded-full bg-[#151515] px-5 py-3 text-sm font-medium text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            Suggest a founder
          </summary>
          <form action="/api/guest-suggestions" method="post" onSubmit={submit} onChange={() => setSent(false)} className="mt-6 space-y-5">
            <fieldset disabled={sending} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Founder name
                  <input name="founder" className={fieldClass} required maxLength={120} />
                </label>
                <label className="block text-sm font-medium">
                  Company name
                  <input name="company" className={fieldClass} required maxLength={120} />
                </label>
              </div>
              <label className="block text-sm font-medium">
                Company website or founder profile
                <input name="website" type="text" inputMode="url" autoCapitalize="none" spellCheck={false} className={fieldClass} required maxLength={500} />
              </label>
              <label className="block text-sm font-medium">
                What would you like to hear them talk about?
                <textarea name="topic" className={fieldClass} rows={4} required maxLength={2000} />
              </label>
              <label className="block text-sm font-medium">
                Your email <span className="font-normal text-black/60">(optional)</span>
                <input name="email" type="email" autoComplete="email" className={fieldClass} maxLength={254} />
              </label>
              <div className="hidden" aria-hidden="true">
                <label>Company fax <input name="company_fax" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <button type="submit" className="rounded-full bg-[#151515] px-5 py-3 text-sm font-medium text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:opacity-60">
                {sending ? "Sending…" : "Send suggestion"}
              </button>
            </fieldset>
            {sent && <p role="status" className="text-sm">Suggestion sent. Thanks for the tip.</p>}
            {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
          </form>
          <noscript><p className="mt-5">Email your suggestion to <a href={`mailto:${inbox}`}>{inbox}</a>.</p></noscript>
        </details>
      </div>
    </section>
  );
}
