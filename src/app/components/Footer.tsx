export default function Footer() {
    return (
      <footer className="border-t border-black/10 bg-[#f4f1ea]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">
              Stay close.
            </h2>
  
            <p className="mt-5 max-w-xl text-base leading-7 text-black/60">
              Read the stories on Apollo and Substack, or listen to the conversations on Spotify.
            </p>
  
            <div className="mt-8 max-w-[480px] overflow-hidden rounded-xl border border-black/10 bg-white">
              <iframe
                src="https://apolloinsights.substack.com/embed"
                width="100%"
                height="150"
                style={{ border: 0, background: "white" }}
                frameBorder="0"
                scrolling="no"
                title="Subscribe to Apollo"
                className="block"
              />
            </div>
          </div>
  
          <div className="mt-14 flex items-center justify-between border-t border-black/10 pt-5 text-sm text-black/50">
            <div className="flex gap-6">
              <a
                href="https://apolloinsights.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-black"
              >
                Substack
              </a>
              <a href="https://open.spotify.com/show/6DsaIKMrQDyZpGKWkkjDzs" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">Spotify</a>
  
              <a
                href="https://www.youtube.com/@apolloinsight"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-black"
              >
                YouTube
              </a>
            </div>
  
            <p>© {new Date().getFullYear()} Apollo</p>
          </div>
        </div>
      </footer>
    );
  }