import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getPosts } from "../../lib/posts";
import { editorialBySlug } from "../../lib/editorial";

const spotifyShow = "https://open.spotify.com/show/6DsaIKMrQDyZpGKWkkjDzs";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((item) => item.slug === slug);
  if (!post) return { title: "Conversation not found" };
  const editorial = editorialBySlug[slug];
  const description = editorial?.introduction || post.description || post.title;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/conversations/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/conversations/${post.slug}`,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

export default async function Conversation({ params }: Props) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  const editorial = editorialBySlug[slug];
  const intro = editorial?.introduction || post.description || post.body[0] || "";
  const commentary = editorial?.commentary?.filter(Boolean) ?? [];
  const spotifyUrl = editorial?.spotifyUrl;
  const related = posts.filter((item) => item.slug !== slug).slice(0, 2);
  const published = new Date(post.date);
  const dateLabel = Number.isNaN(published.getTime())
    ? null
    : published.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#151515]">
      <Navbar />
      <article className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <Link href="/conversations" className="text-sm text-black/50 hover:text-black">
          ← All conversations
        </Link>

        <header className="mt-14 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            Apollo Insight / Conversations {dateLabel ? `· ${dateLabel}` : ""}
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.08] tracking-[-0.025em] md:text-6xl">
            {post.title}
          </h1>
        </header>

        {post.image && (
          <img
            src={post.image}
            alt=""
            className="mt-12 max-h-[540px] w-full object-cover grayscale"
          />
        )}

        <div className="mt-16 grid gap-8 border-t border-black/20 pt-10 md:grid-cols-[1fr_2fr] md:gap-14">
          <h2 className="text-xs uppercase tracking-[0.25em] text-black/45">
            The conversation
          </h2>
          <div className="max-w-2xl">
            {intro ? (
              <p className="font-serif text-2xl leading-relaxed text-black/85 md:text-3xl">
                {intro}
              </p>
            ) : (
              <p className="text-lg leading-8 text-black/70">
                Explore the full conversation on Substack.
              </p>
            )}
          </div>
        </div>

        {commentary.length > 0 && (
          <section className="mt-14 grid gap-8 border-t border-black/15 pt-10 md:grid-cols-[1fr_2fr] md:gap-14">
            <h2 className="text-xs uppercase tracking-[0.25em] text-black/45">
              My thoughts
            </h2>
            <div className="max-w-2xl space-y-6 text-lg leading-8 text-black/75">
              {commentary.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </section>
        )}

        <section className="mt-14 grid gap-8 border-t border-black/15 pt-10 md:grid-cols-[1fr_2fr] md:gap-14">
          <h2 className="text-xs uppercase tracking-[0.25em] text-black/45">
            Read & listen
          </h2>
          <div className="flex max-w-2xl flex-wrap gap-3">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#151515] px-6 py-4 text-sm font-medium text-white transition-opacity hover:opacity-75"
            >
              Read the full article on Substack ↗
            </a>
            {spotifyUrl ? (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-black/30 px-6 py-4 text-sm font-medium transition-colors hover:bg-black hover:text-white"
              >
                Listen to this episode on Spotify ↗
              </a>
            ) : (
              <a
                href={spotifyShow}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-black/30 px-6 py-4 text-sm font-medium transition-colors hover:bg-black hover:text-white"
              >
                Explore Apollo on Spotify ↗
              </a>
            )}
          </div>
        </section>
      </article>

      {related.length > 0 && (
        <section className="border-t border-black/15 bg-[#ebe7de]">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
            <h2 className="font-serif text-3xl md:text-4xl">More conversations.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/conversations/${item.slug}`}
                  className="group border-t border-black/20 py-6"
                >
                  <h3 className="font-serif text-2xl group-hover:underline">{item.title}</h3>
                  <p className="mt-4 text-sm text-black/60">Explore conversation ↗</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
