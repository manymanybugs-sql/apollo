import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getPosts } from "../../lib/posts";

export default async function Conversation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#151515]">
      <Navbar />

      <article className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <Link href="/conversations" className="text-sm text-black/50 hover:text-black">
          ← All conversations
        </Link>

        <header className="mt-16 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-black/45">
            Apollo conversation
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.05] md:text-5xl">            {post.title}
          </h1>
        </header>

        <a href="https://open.spotify.com/show/6DsaIKMrQDyZpGKWkkjDzs" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center border border-black/25 px-5 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white">Listen on Spotify ↗</a>

        {post.image && (
          <img
            src={post.image}
            alt=""
            className="mt-10 max-h-[400px] w-auto max-w-full object-contain grayscale"          />
        )}

        <div className="mt-16 grid gap-10 border-t border-black/20 pt-10 md:grid-cols-[1fr_2fr]">
          <p className="text-xs uppercase tracking-[0.25em] text-black/45">
            The conversation
          </p>
          <div>
          <div className="space-y-6 text-lg leading-8 text-black/75">
  {post.body.length > 0 ? (
    post.body.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))
  ) : (
    <p>The article text is not available in the public feed.</p>
  )}
</div>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block border-b border-black pb-1 text-sm font-medium"
            >
              Read on Substack ↗
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}