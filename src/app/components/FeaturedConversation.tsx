export default function FeaturedConversation() {
  return (
    <section
      id="featured"
      className="border-t border-black/10 bg-[#ebe7de]"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">

        <div className="mb-12 flex items-center justify-between">
        <h2 className="font-serif text-5xl tracking-[-0.03em]">
  Latest conversation
</h2>

        
        </div>

        <div className="grid gap-16 md:grid-cols-[1.35fr_0.75fr]">

          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80"
              alt="Conversation"
              className="aspect-[4/3] w-full object-cover grayscale"
            />
          </div>

          <div className="flex flex-col justify-between">

            <div>
            

              <h3 className="mt-6 font-serif text-4xl leading-tight tracking-[-0.03em]">
              First conversation
              </h3>

              <p className="mt-8 text-lg leading-8 text-black/70">
              Our first conversation is currently in production. Every Apollo conversation will be published on YouTube with a full transcript available on Substack.

              </p>
            </div>
            <h2 className="font-serif text-5xl tracking-[-0.03em]">
  Conversations
</h2>

            <div className="mt-16 border-t border-black/15 pt-6">

            <div className="flex gap-8 text-sm">
  <span className="text-black/40">Watch</span>

  <span className="text-black/40">Listen</span>

  <a
    href="https://apolloinsights.substack.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:opacity-60 transition-opacity"
  >
    Read transcript
  </a>
</div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}