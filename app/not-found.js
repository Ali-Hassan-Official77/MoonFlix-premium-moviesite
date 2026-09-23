import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5 pt-16">
      <p className="font-display italic text-gold text-lg mb-3">Intermission</p>
      <h1 className="font-display text-4xl sm:text-5xl text-bone mb-4">Scene not found</h1>
      <p className="text-bone-faint max-w-md mb-8">
        The film you&rsquo;re looking for isn&rsquo;t on this reel. It may have
        been retired or the link may be off.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-gold text-ink-950 font-semibold px-6 py-3 text-sm hover:bg-gold-bright transition-colors"
      >
        Back to MoonFlix
      </Link>
    </div>
  );
}
