import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Subscribe() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#151515]">
      <Navbar />
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em]">Apollo Insight</p>
        <h1 className="mt-8 font-serif text-6xl">Stay close.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg">
          Conversations with founders, investors and operators,
          delivered to your inbox.
        </p>
        <iframe
          src="https://apolloinsights.substack.com/embed"
          width="100%"
          height="150"
          title="Subscribe to Apollo"
          className="mx-auto mt-10 max-w-[480px]"
        />
      </section>
      <Footer />
    </main>
  );
}