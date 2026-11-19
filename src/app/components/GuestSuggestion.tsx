"use client";

import { useState, type FormEvent } from "react";

const inbox = "dara@apolloinsight.io";

const fieldClass =
  "mt-2 block w-full rounded-md border border-black/25 bg-white px-3 py-2.5 text-base focus-visible:outline-2 focus-visible:outline-offset-2";

export default function GuestSuggestion() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [emailLink, setEmailLink] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const fields = new FormData(event.currentTarget);
    const founder = String(fields.get("Founder") ?? "").trim();
    const topic = String(fields.get("Conversation topic") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const link = String(fields.get("Website or profile") ?? "").trim();
    const company = String(fields.get("Company") ?? "").trim().replace(/\s+/g, " ");
    const subject = `Apollo guest suggestion — ${company}`;
    const message = [
      `Founder: ${founder}`,
      `Company: ${company}`,
      `Website or profile: ${link}`,
      "",
      topic,
    ].join("\r\n");
    setEmailLink(`mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`);
    const url = URL.parse(/^[a-z][a-z0-9+.-]*:\/\//i.test(link) ? link : `https://${link}`);
    if (!founder || !company || !topic || !url || !["http:", "https:"].includes(url.protocol) ||
        !url.hostname.includes(".") || url.username || url.password || /\s/.test(link)) {
      setError("Check the founder, company, website or profile link, and conversation topic.");
      setState("error");
      return;
    }

    setState("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${inbox}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({
          Founder: founder,
          Company: company,
          "Website or profile": url.href,
          "Conversation topic": topic,
          ...(email ? { email, _replyto: email } : {}),
          _subject: subject,
          _honey: String(fields.get("_honey") ?? ""),
          _url: "https://apolloinsight.io/",
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || ![true, "true"].includes(result?.success) ||
          /activat|confirm|captcha/i.test(result?.message ?? "")) {
        throw new Error("Delivery failed");
      }

      setState("sent");
    } catch {
      setError("Your suggestion couldn’t be sent. Please try again.");
      setState("error");
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
          {state === "sent" ? (
            <p className="mt-5" role="status">Thanks, I’ll take a look.</p>
          ) : (
            <form action={`https://formsubmit.co/${inbox}`} method="post" onSubmit={submit} className="mt-6 space-y-5">
              <fieldset disabled={state === "sending"} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Founder name
                    <input name="Founder" className={fieldClass} required maxLength={120} />
                  </label>
                  <label className="block text-sm font-medium">
                    Company name
                    <input name="Company" className={fieldClass} required maxLength={120} />
                  </label>
                </div>
                <label className="block text-sm font-medium">
                  Company website or founder profile
                  <input name="Website or profile" type="text" inputMode="url" autoCapitalize="none" className={fieldClass} required maxLength={500} />
                </label>
                <label className="block text-sm font-medium">
                  What would you like to hear them talk about?
                  <textarea name="Conversation topic" className={fieldClass} rows={4} required maxLength={2000} />
                </label>
                <label className="block text-sm font-medium">
                  Your email <span className="font-normal text-black/60">(optional)</span>
                  <input name="email" type="email" autoComplete="email" className={fieldClass} maxLength={254} />
                </label>
                <div hidden>
                  <label>
                    Leave this blank
                    <input name="_honey" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <button type="submit" className="rounded-full bg-[#151515] px-5 py-3 text-sm font-medium text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black disabled:opacity-60">
                  {state === "sending" ? "Sending…" : "Send suggestion"}
                </button>
              </fieldset>
              {state === "error" && (
                <div>
                  <p role="alert">{error}</p>
                  <a href={emailLink} className="mt-2 inline-block underline underline-offset-4">
                    Email this suggestion instead
                  </a>
                </div>
              )}
            </form>
          )}
        </details>
      </div>
    </section>
  );
}
