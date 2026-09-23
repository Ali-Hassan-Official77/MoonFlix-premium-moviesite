import { tmdb } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";

export const revalidate = 3600;

export default async function GenrePage({ params }) {
  const [genreList, movies] = await Promise.all([
    tmdb.genres(),
    tmdb.byGenre(params.id, 1),
  ]);

  const genreName = genreList?.genres?.find((g) => String(g.id) === params.id)?.name || "Films";

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-32 pb-20">
      <div className="flex items-baseline gap-3 mb-8">
        <span className="w-px h-5 bg-gold/70" />
        <h1 className="font-display italic text-2xl sm:text-3xl text-bone">{genreName}</h1>
      </div>

      <MovieGrid
        initialMovies={movies.results}
        totalPages={movies.total_pages}
        fetchUrl={`/api/genre/${params.id}`}
      />
    </div>
  );
}
