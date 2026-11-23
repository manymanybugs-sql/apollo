const maxBodySize = 32_768;

function readField(fields: URLSearchParams, name: string, maxLength: number) {
  const value = fields.get(name)?.trim() ?? "";
  return value.length <= maxLength ? value : null;
}

function parseWebsite(value: string) {
  const url = URL.parse(/^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`);
  if (!url || !["http:", "https:"].includes(url.protocol) || url.username || url.password || !url.hostname.includes(".")) {
    return null;
  }
  return url.href.length <= 500 ? url.href : null;
}

function slackSection(text: string) {
  return { type: "section", text: { type: "plain_text", text, emoji: false } };
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && origin !== new URL(request.url).origin)) {
    return Response.json({ error: "Please submit the form from Apollo Insight." }, { status: 403 });
  }

  if (request.headers.get("content-type")?.split(";")[0] !== "application/x-www-form-urlencoded") {
    return Response.json({ error: "Invalid form submission." }, { status: 415 });
  }

  if (Number(request.headers.get("content-length")) > maxBodySize) {
    return Response.json({ error: "Your suggestion is too long." }, { status: 413 });
  }

  const body = await request.text();
  if (body.length > maxBodySize) {
    return Response.json({ error: "Your suggestion is too long." }, { status: 413 });
  }

  const fields = new URLSearchParams(body);
  if (fields.get("company_fax")) {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const founder = readField(fields, "founder", 120);
  const company = readField(fields, "company", 120);
  const website = readField(fields, "website", 500);
  const topic = readField(fields, "topic", 2000);
  const email = readField(fields, "email", 254);
  const websiteUrl = website ? parseWebsite(website) : null;

  if (!founder || !company || !websiteUrl || !topic || email === null || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return Response.json({ error: "Check the required fields, website link and any email address you entered." }, { status: 400 });
  }

  const webhook = URL.parse(process.env.SLACK_FOUNDER_SUGGESTIONS_WEBHOOK_URL ?? "");
  if (
    !webhook || webhook.origin !== "https://hooks.slack.com" || webhook.username || webhook.password ||
    !/^\/services\/[A-Za-z0-9]+\/[A-Za-z0-9]+\/[A-Za-z0-9]+$/.test(webhook.pathname) || webhook.search || webhook.hash
  ) {
    return Response.json({ error: "Suggestions are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        text: "New Apollo Insight founder suggestion",
        blocks: [
          slackSection("New Apollo Insight founder suggestion"),
          slackSection([
            `Founder: ${founder}`,
            `Company: ${company}`,
            `Website or profile: ${websiteUrl}`,
            ...(email ? [`Contact email: ${email}`] : []),
          ].join("\n")),
          slackSection(`What they’d like to hear about\n${topic}`),
        ],
        unfurl_links: false,
        unfurl_media: false,
      }),
    });

    if (response.ok && (await response.text()).trim() === "ok") {
      return Response.json({ ok: true });
    }
  } catch {
    // The webhook URL is a credential. Fetch errors can include it.
  }

  return Response.json({ error: "Your suggestion couldn’t be sent. Please try again." }, { status: 502 });
}
