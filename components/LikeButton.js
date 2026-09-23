"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { useToast } from "@/components/Providers";

const KEY = "moonflix-watchlist";

export function getWatchlist() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isInWatchlist(id) {
  return getWatchlist().some(
    (movie) => String(movie.id) === String(id)
  );
}

export function toggleWatchlist(movie) {
  if (typeof window === "undefined") return false;

  const list = getWatchlist();

  const exists = list.some(
    (item) => String(item.id) === String(movie.id)
  );

  const next = exists
    ? list.filter(
        (item) => String(item.id) !== String(movie.id)
      )
    : [
        ...list,
        {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          overview: movie.overview,
        },
      ];

  localStorage.setItem(KEY, JSON.stringify(next));

  window.dispatchEvent(
    new Event("moonflix-watchlist-change")
  );

  return !exists;
}

export default function LikeButton({
  movie,
  className = "",
  children,
}) {
  const [liked, setLiked] = useState(false);
  const { notify } = useToast();

  useEffect(() => {
    if (!movie?.id) return;

    const syncWatchlist = () => {
      setLiked(isInWatchlist(movie.id));
    };

    syncWatchlist();

    window.addEventListener(
      "moonflix-watchlist-change",
      syncWatchlist
    );

    return () => {
      window.removeEventListener(
        "moonflix-watchlist-change",
        syncWatchlist
      );
    };
  }, [movie?.id]);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!movie?.id) return;

    const result = toggleWatchlist(movie);

    setLiked(result);

    notify(
      result
        ? `${movie.title} added to your watch list.`
        : `${movie.title} removed from your watch list.`,
      result ? "success" : "info"
    );
  }

  if (!movie?.id) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        liked
          ? `Remove ${movie.title} from watch list`
          : `Add ${movie.title} to watch list`
      }
      title={
        liked
          ? "Remove from watch list"
          : "Add to watch list"
      }
      className={`group inline-flex items-center justify-center gap-2.5 transition-all duration-300 ${
        liked ? "is-liked" : ""
      } ${className}`}
    >
      {children || (
        <>
          <Bookmark
            size={18}
            strokeWidth={1.8}
            fill={liked ? "currentColor" : "none"}
            className="transition-all duration-300 group-hover:scale-110"
          />

          <span className="text-sm font-medium">
            {liked ? "In watchlist" : "Watchlist"}
          </span>
        </>
      )}
    </button>
  );
}