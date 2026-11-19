"use client";

import { useState, type FormEvent } from "react";

const inbox = "dara@apolloinsight.io";

const fieldClass =
  "mt-2 block w-full rounded-md border border-black/25 bg-white px-3 py-2.5 text-base focus-visible:outline-2 focus-visible:outline-offset-2";

export default function GuestSuggestion() {
  const [emailLink, setEmailLink] = useState("");

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fields = new FormData(event.currentTarget);
    const founder = String(fields.get("founder") ?? "").trim();
    const company = String(fields.get("company") ?? "").trim().replace(/\s+/g, " ");
    const website = String(fields.get("website") ?? "").trim();
    const topic = String(fields.get("topic") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const subject = `Apollo guest suggestion — ${company}`;
    const message = [
      `Founder: ${founder}`,
      `Company: ${company}`,
      `Website or profile: ${website}`,
      ...(email ? [`Contact email: ${email}`] : []),
      "",
      topic,
    ].join("\r\n");
    const href = `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setEmailLink(href);
    window.location.href = href;
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
          <form action={`mailto:${inbox}`} method="post" onSubmit={openEmail} onChange={() => setEmailLink("")} className="mt-6 space-y-5">
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
            <p className="text-sm text-black/65">This opens a draft in your email app for you to send.</p>
            <button type="submit" className="rounded-full bg-[#151515] px-5 py-3 text-sm font-medium text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
              Open email draft
            </button>
            {emailLink && (
              <p role="status" className="text-sm">
                <a href={emailLink} className="underline underline-offset-4">Reopen the draft</a>
                {" or email "}
                <a href={`mailto:${inbox}`} className="underline underline-offset-4">{inbox}</a>
                {" directly."}
              </p>
            )}
          </form>
          <noscript><p className="mt-5">Email your suggestion to <a href={`mailto:${inbox}`}>{inbox}</a>.</p></noscript>
        </details>
      </div>
    </section>
  );
}
