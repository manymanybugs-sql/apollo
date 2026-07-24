export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-black">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-8 text-center">

        <p className="mb-8 text-xs uppercase tracking-[0.45em] text-neutral-500">
          APOLLO
        </p>

        <h1 className="max-w-4xl text-6xl leading-[0.92] tracking-[-0.04em] [font-family:var(--font-instrument-serif)] md:text-[7rem]">
          The conversations
          <br />
          shaping tomorrow.
        </h1>

        <p className="mt-10 max-w-xl text-lg leading-8 text-neutral-500">
          Conversations with founders, investors and operators building what's
          next.
        </p>

        <div className="mt-12">
          <button className="rounded-full bg-black px-8 py-4 text-white transition hover:bg-neutral-800">
            Watch the latest →
          </button>
        </div>

      </section>
    </main>
  );
}