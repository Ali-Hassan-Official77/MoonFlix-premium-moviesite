// Server-only TMDB data layer.
const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TOKEN = process.env.API_ACCESS_TOKEN;
const API_KEY = process.env.TMDB_API_KEY;

async function tmdbFetch(path, params = {}, revalidateSeconds = 1800) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, value);
  });
  const headers = { accept: "application/json" };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  else if (API_KEY) url.searchParams.set("api_key", API_KEY);
  else throw new Error("Missing TMDB_API_KEY or API_ACCESS_TOKEN.");

  const res = await fetch(url.toString(), { headers, next: { revalidate: revalidateSeconds } });
  if (!res.ok) throw new Error(`TMDB request failed (${res.status}) for ${path}`);
  return res.json();
}

export const tmdb = {
  trending: (window = "week") => tmdbFetch(`/trending/movie/${window}`),
  popular: (page = 1) => tmdbFetch("/movie/popular", { page }),
  topRated: (page = 1) => tmdbFetch("/movie/top_rated", { page }),
  upcoming: (page = 1) => tmdbFetch("/movie/upcoming", { page }),
  nowPlaying: (page = 1) => tmdbFetch("/movie/now_playing", { page }),
  genres: () => tmdbFetch("/genre/movie/list"),
  byGenre: (genreId, page = 1) => tmdbFetch("/discover/movie", { with_genres: genreId, page, sort_by: "popularity.desc" }),
  search: (query, page = 1) => query ? tmdbFetch("/search/movie", { query, page, include_adult: false }) : Promise.resolve({ results: [], total_pages: 0 }),
  details: (id) => tmdbFetch(`/movie/${id}`, { append_to_response: "credits,videos,similar,release_dates,images", include_image_language: "en,null" }),
};

export function tmdbImage(path, size = "w500") {
  const base = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p";
  if (!path) return null;
  return `${base}/${size}${path}`;
}
