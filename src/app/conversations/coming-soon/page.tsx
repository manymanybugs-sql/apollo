import Navbar from "../../components/Navbar";

export default function ComingSoonConversation() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#151515]">
      <Navbar />

      <article className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
        <p className="text-xs uppercase tracking-[0.3em] text-black/45">
          Apollo · Conversation 001
        </p>

        <h1 className="mt-8 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          First conversation
          <br />
          coming soon.
        </h1>

        <p className="mt-10 max-w-2xl text-lg leading-8 text-black/65">
          Apollo&apos;s first published conversation is currently being
          prepared. Every interview will be carefully edited from a real
          conversation and presented as a timeless piece of writing.
        </p>

        <div className="my-16 border-t border-black/15" />

        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-black/45">
            Editor&apos;s note
          </p>

          <p className="mt-6 max-w-2xl font-serif text-3xl leading-tight tracking-[-0.02em]">
            Thoughtful conversations, edited with care and published only when
            they are ready.
          </p>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-black/70">
            Apollo focuses on long-form conversations that remain valuable
            beyond the moment they are published.
          </p>
        </section>
      </article>
    </main>
  );
}