"use client";

import { useState } from "react";
import { useToast } from "@/components/Providers";
import { Loader2 } from "lucide-react";
import MovieCard from "@/components/MovieCard";

export default function MovieGrid({ initialMovies, totalPages, fetchUrl }) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { notify } = useToast();

  async function loadMore() {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const separator = fetchUrl.includes("?") ? "&" : "?";
      const res = await fetch(`${fetchUrl}${separator}page=${nextPage}`);
      const data = await res.json();
      const incoming = data.results || [];
      setMovies((prev) => [...prev, ...incoming]);
      setPage(nextPage);
      notify(incoming.length ? `${incoming.length} more films loaded.` : "No more films found.", incoming.length ? "success" : "info");
    } finally {
      setLoading(false);
    }
  }

  if (!movies?.length) {
    return (
      <p className="text-bone-faint py-16 text-center">
        Nothing turned up. Try a different title or genre.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {page < totalPages && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-gold/60 text-gold-bright px-6 py-2.5 text-sm hover:bg-gold/10 transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? "Loading" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
