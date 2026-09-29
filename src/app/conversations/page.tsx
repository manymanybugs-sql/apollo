import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPosts } from "../lib/posts";

export default async function Conversations() {
    const posts = await getPosts();
  
    return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#151515]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-black/45">
          The archive
        </p>
        <h1 className="mt-8 font-serif text-6xl">Conversations.</h1>
        <p className="mt-8 text-lg text-black/65">
          Ideas and decisions from people building what comes next.
        </p>
        <div className="mt-12 border-t border-black/20">
  {posts.map((post, index) => (
    <a
      key={post.slug}
      href={`/conversations/${post.slug}`}
      className="group grid gap-6 border-b border-black/20 py-8 md:grid-cols-[4rem_1fr_13rem] md:gap-10"
    >
      <span className="pt-1 text-xs tracking-[0.2em] text-black/40">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-black/45">
          Apollo conversation
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-4xl group-hover:underline">
          {post.title}
        </h2>
        <p className="mt-6 text-sm font-medium">Read conversation ↗</p>
      </div>

      {post.image ? (
        <img
          src={post.image}
          alt=""
          className="aspect-[4/3] w-full object-cover grayscale"
        />
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center bg-[#e6e1d7] text-xs font-semibold tracking-[0.3em]">
          APOLLO
        </div>
      )}
    </a>
  ))}
</div>
{posts.length === 0 && (
  <p className="mt-16 text-black/50">No posts found in the public feed yet.</p>
)}
      </section>
      <Footer />
    </main>
  );
}
