import { getPosts } from "../lib/posts";
export default async function FeaturedConversation() {
  const [latest] = await getPosts();  return (
    <section
      id="featured"
      className="border-t border-black/10 bg-[#ebe7de]"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.35fr_0.75fr] md:gap-16">
          <div className="overflow-hidden">
            <img
src={latest?.image ?? "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80"}              alt="Apollo conversation in production"
className="mx-auto aspect-[4/3] w-[92%] object-cover grayscale"            />
          </div>

          <div className="flex max-w-md flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-black/40">
  {latest ? "Latest conversation" : "Launching soon"}
</p>

<h2 className="mt-6 font-serif text-4xl leading-[1.02] tracking-[-0.04em] md:text-5xl">
  {latest ? latest.title : <>Our first<br />conversation.</>}
</h2>

<p className="mt-8 text-lg leading-8 text-black/65">
  {latest
    ? "Read the conversation and transcript here on Apollo."
    : "Our first conversation is in production. Subscribe to hear when it is published."}
</p>

<div className="mt-12 border-t border-black/15 pt-6">
  <a
    href={latest ? `/conversations/${latest.slug}` : "/subscribe"}
    className="text-sm font-medium text-black transition-opacity hover:opacity-60"
  >
    {latest ? "Read conversation ↗" : "Subscribe ↗"}
  </a>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}