export default function Navbar() {
    return (
      <header className="border-b border-black/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-7">
          <a href="/" className="text-xs uppercase tracking-[0.35em]">
            Apollo
          </a>
  
          <nav className="hidden gap-10 text-sm text-neutral-600 md:flex">
            <a href="#">Conversations</a>
            <a href="#">Journal</a>
            <a href="#">About</a>
          </nav>
  
          <button className="rounded-full border border-neutral-300 px-5 py-2 text-sm transition hover:bg-black hover:text-white">
            Subscribe
          </button>
        </div>
      </header>
    );
  }