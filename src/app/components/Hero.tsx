export default function Hero() {
  return (
    <section className="mx-auto grid max-w-[1600px] lg:min-h-[82vh] lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-12 md:px-10 md:py-16 lg:py-14">
      <div className="border-b border-black/15 pb-4" />

        <div className="max-w-3xl py-20 lg:py-16">
        

          <h1 className="font-serif text-[clamp(3rem,5.5vw,6.5rem)] leading-[0.86] tracking-[-0.055em]">
  Conversations
  <br />
  with extraordinary
  <br />
  people building
  <br />
  what's next.
</h1>

<p className="mt-10 max-w-xl text-base leading-7 text-black/65 md:text-lg md:leading-8">
Apollo explores the ideas, decisions and stories behind exceptional founders, investors, operators and builders.
</p>
        </div>

        <div className="pt-10" />
        </div>

<div className="relative min-h-[70vh] overflow-hidden bg-[#d8d4cb] lg:min-h-0">
  <img
    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=90"
    alt="People in conversation"
    className="absolute inset-0 h-full w-full object-cover grayscale"
  />

  <div className="absolute inset-0 bg-black/20" />
</div>
</section>
);
}