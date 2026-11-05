import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedConversation from "./components/FeaturedConversation";
import Manifesto from "./components/Manifesto";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#151515]">
      <Navbar />
      <Hero />
      <FeaturedConversation />
      <Manifesto />
      <Footer />
    </main>
  );
}
