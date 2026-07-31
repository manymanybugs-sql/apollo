export default function FeaturedConversation() {
  return (
    <section
      id="featured"
      className="border-t border-black/10 bg-[#ebe7de]"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.35fr_0.75fr] md:gap-16">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80"
              alt="Apollo conversation in production"
              className="aspect-[4/3] w-full object-cover grayscale"
            />
          </div>

          <div className="flex max-w-md flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">
              Launching soon
            </p>

            <h2 className="mt-6 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
              Our first
              <br />
              conversation.
            </h2>

            <p className="mt-8 text-lg leading-8 text-black/65">
              Currently in production. Watch on YouTube and read the full
              transcript on Substack when it is published.
            </p>

            <div className="mt-12 border-t border-black/15 pt-6">
              <div className="flex gap-8 text-sm">
                <a
                  href="https://www.youtube.com/@apolloinsight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/40 transition-colors hover:text-black"
                >
                  Watch
                </a>

                <a
                  href="https://apolloinsights.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/40 transition-colors hover:text-black"
                >
                  Read
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}