export type Post = {
    slug: string;
    title: string;
    url: string;
    date: string;
    description: string;
    image: string | null;
    body: string[];
  };
  
  function value(item: string, tag: string): string {
    const match = item.match(
      new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i")
    );
  
    return (match?.[1] ?? "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
      .replace(/^<!\[CDATA\[/, "")
      .replace(/\]\]>$/, "")
      .trim();
  }
  
  function text(html: string): string {
    return html
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }
  
  function findImage(item: string, html: string): string | null {
    const mediaTags = [
      ...item.matchAll(/<(?:enclosure|media:thumbnail|media:content)\b[^>]*>/gi),
    ];
  
    const imageTag = mediaTags
      .map(([tag]) => tag)
      .find((tag) => /media:thumbnail|type=["']image\//i.test(tag));
  
    return (
      imageTag?.match(/\burl=["']([^"']+)["']/i)?.[1]
      ?? html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1]
      ?? null
    );
  }
  
  const knownPosts: Post[] = [
    {
      slug: "australias-defence-tech-opportunity",
      title: "Australia's Defence Tech Opportunity",
      url: "https://apolloinsights.substack.com/p/australias-defence-tech-opportunity",
      date: "Wed, 04 Nov 2026 12:00:00 GMT",
      description:
        "A conversation with Tony Hockey on Australia's defence technology opportunity, scaling companies and the challenges of entering the US market.",
      image: null,
      body: [],
    },
  ];

  function includeKnownPosts(posts: Post[]): Post[] {
    const seen = new Set(posts.map((post) => post.slug));
    return [
      ...posts,
      ...knownPosts.filter((post) => !seen.has(post.slug)),
    ].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }

  export async function getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(
        "https://apolloinsights.substack.com/feed",
        { next: { revalidate: 3600 } }
      );
      if (!response.ok) return includeKnownPosts([]);
  
      const xml = await response.text();
      const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];
  
      return includeKnownPosts(items.flatMap(([, item]) => {
        const url = value(item, "link");
        const slug = url.match(/\/p\/([^/?#]+)/)?.[1];
        if (!slug) return [];
  
        const html =
          value(item, "content:encoded") || value(item, "description");
  
        const body = html
          .split(/<\/(?:p|h[1-6]|li|blockquote)>/i)
          .map(text)
          .filter(
            (paragraph) =>
              paragraph.length > 0 && !/^\d{1,3}$/.test(paragraph)
          );
  
        return [{
          slug,
          title: text(value(item, "title")),
          url,
          date: value(item, "pubDate"),
          description: text(value(item, "description")).slice(0, 240),
          image: findImage(item, html),
          body,
        }];
      }));
    } catch {
      return includeKnownPosts([]);
    }
  }