const inbox = "dara@apolloinsight.io";
const deliveryError = "Your suggestion couldn’t be sent. Please try again.";

export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return Response.json({ error: "Submit your suggestion from Apollo Insight." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Use the suggestion form to submit." }, { status: 415 });
  }

  const body = await request.json().catch(() => null);
  const field = (key: string) => typeof body?.[key] === "string" ? body[key].trim() : "";

  if (field("website")) return Response.json({ success: true });

  const founder = field("founder");
  const company = field("company");
  const link = field("link");
  const topic = field("topic");
  const email = field("email");

  if (!founder || founder.length > 120 || !company || company.length > 120 ||
      !topic || topic.length > 2000 || !link || link.length > 500) {
    return Response.json({ error: "Check the founder, company, link and conversation topic." }, { status: 400 });
  }

  const url = URL.parse(/^[a-z][a-z0-9+.-]*:\/\//i.test(link) ? link : `https://${link}`);
  if (!url || !["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".") ||
      url.username || url.password || /\s/.test(link)) {
    return Response.json({ error: "Enter a valid company website or founder profile link." }, { status: 400 });
  }

  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return Response.json({ error: "Enter a valid email address or leave it blank." }, { status: 400 });
  }

  try {
    const result = await fetch(`https://formsubmit.co/ajax/${inbox}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "https://apolloinsight.io",
        Referer: "https://apolloinsight.io/",
      },
      body: JSON.stringify({
        Founder: founder,
        Company: company,
        "Website or profile": url.href,
        "Conversation topic": topic,
        ...(email ? { email, _replyto: email } : {}),
        _subject: `Apollo guest suggestion — ${company.replace(/\s+/g, " ")}`,
        _captcha: "false",
        _url: "https://apolloinsight.io/",
      }),
      redirect: "error",
      signal: AbortSignal.timeout(20000),
    });

    const delivery = await result.json();
    if (result.ok && [true, "true"].includes(delivery.success) &&
        !/activat|confirm/i.test(delivery.message ?? "")) {
      return Response.json({ success: true });
    }
    console.warn("Guest suggestion delivery rejected", {
      status: result.status,
      activationRequested: /activat|confirm/i.test(delivery.message ?? ""),
      captchaRequested: /captcha|robot/i.test(delivery.message ?? ""),
      rateLimited: /limit|many|spam/i.test(delivery.message ?? ""),
    });
  } catch (error) {
    console.warn("Guest suggestion delivery failed", error instanceof Error ? error.name : "UnknownError");
  }

  return Response.json({ error: deliveryError }, { status: 502 });
}
