export default function Hero() {
    return (
      <section className="mx-auto grid max-w-[1600px] lg:min-h-[calc(100vh-89px)] lg:grid-cols-2">
        <div className="flex flex-col justify-between px-6 py-12 md:px-10 md:py-16 lg:py-14">
          <div className="flex items-center justify-between border-b border-black/15 pb-4 text-[11px] uppercase tracking-[0.22em] text-black/55">
            <span>Featured conversation</span>
            <span>Issue 001</span>
          </div>
  
          <div className="max-w-3xl py-20 lg:py-16">
            <p className="mb-8 text-xs uppercase tracking-[0.28em] text-black/50">
              Founders · Culture · Technology
            </p>
  
            <h1 className="font-serif text-[clamp(4rem,8vw,8.75rem)] leading-[0.82] tracking-[-0.055em]">
              The people
              <br />
              shaping
              <br />
              what’s next.
            </h1>
  
            <p className="mt-10 max-w-lg text-base leading-7 text-black/65 md:text-lg md:leading-8">
              Intimate conversations with extraordinary founders, investors,
              operators and builders creating the future before the rest of us can
              see it.
            </p>
          </div>
  
          <div className="flex items-end justify-between border-t border-black/15 pt-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                Latest conversation
              </p>
  
              <p className="mt-2 text-sm">
                On conviction, craft and building for the long term
              </p>
            </div>
  
            <a
              href="#featured"
              className="ml-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/25 text-lg transition-colors hover:bg-black hover:text-white"
              aria-label="Read the featured conversation"
            >
              ↗
            </a>
          </div>
        </div>
  
        <div className="relative min-h-[70vh] overflow-hidden bg-[#d8d4cb] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=90"
            alt="Editorial conversation"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
  
          <div className="absolute inset-0 bg-black/10" />
  
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white md:p-10">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">
                Apollo No. 001
              </p>
  
              <p className="mt-2 max-w-sm font-serif text-3xl leading-tight">
                A conversation about building with intention
              </p>
            </div>
  
            <span className="text-xs uppercase tracking-[0.22em]">
              London · 2026
            </span>
          </div>
        </div>
      </section>
    );
  }