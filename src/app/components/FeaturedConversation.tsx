export default function FeaturedConversation() {
    return (
      <section
        id="featured"
        className="border-t border-black/15 bg-[#ebe7de]"
      >
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between border-b border-black/15 pb-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-black/45">
                Featured conversation
              </p>
  
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em] md:text-6xl">
                First conversation coming soon.
              </h2>
            </div>
  
            <p className="hidden text-xs uppercase tracking-[0.22em] text-black/45 md:block">
              Apollo Journal
            </p>
          </div>
  
          <div className="grid gap-10 pt-10 md:grid-cols-[1.4fr_0.8fr] md:gap-16 md:pt-14">
          <div className="relative min-h-[420px] overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80"
    alt="Editorial conversation"
    className="absolute inset-0 h-full w-full object-cover grayscale"
  />
</div>  
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                  In conversation
                </p>
  
                <p className="mt-8 max-w-md text-xl leading-8 text-black/75 md:text-2xl md:leading-9">
                  Apollo’s first published conversation will appear here once it
                  has been recorded, edited and approved.
                </p>
              </div>
  
              <div className="mt-16 border-t border-black/15 pt-5">
                <p className="text-sm leading-6 text-black/55">
                  A written conversation with an extraordinary founder, investor,
                  operator or builder shaping what comes next.
                </p>
  
                <span className="mt-8 inline-flex items-center gap-3 text-sm">
                  Read when published
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }