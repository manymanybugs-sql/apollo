export default function Navbar() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-7">
      <a
  href="/"
  className="text-lg font-semibold uppercase tracking-[0.32em] text-black"
>
  Apollo
</a>

        <nav className="hidden md:flex items-center gap-10 text-sm text-neutral-600">
        <a href="/conversations" className="hover:text-black transition-colors">
  Archive
</a>
        <a href="https://open.spotify.com/show/6DsaIKMrQDyZpGKWkkjDzs" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Listen</a>
        </nav>

        <a
  href="/subscribe"
  className="text-sm font-medium text-black transition-opacity hover:opacity-60"
>
  Subscribe
</a>
      </div>
    </header>
  );
}