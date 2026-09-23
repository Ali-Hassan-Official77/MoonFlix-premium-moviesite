"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear, formatRating } from "@/lib/utils";
import LikeButton from "@/components/LikeButton";

export default function MovieCard({ movie, priority = false, className = "" }) {
  const reduced = useReducedMotion();
  const poster = tmdbImage(movie.poster_path, "w500");
  return (
    <motion.article whileHover={reduced ? undefined : { y: -7 }} transition={{ duration: .25 }} className={`movie-card ${className}`}>
      <Link href={`/movie/${movie.id}`} className="block group">
        <div className="movie-poster">
          {poster ? <img src={poster} alt={`${movie.title} poster`} loading={priority ? "eager" : "lazy"} /> : <div className="poster-fallback">MOONFLIX</div>}
          <div className="poster-shade" />
          <div className="poster-rating"><Star size={11} fill="currentColor" /> {formatRating(movie.vote_average)}</div>
          <LikeButton movie={movie} className="absolute right-3 bottom-3" />
        </div>
        <div className="pt-3 px-1">
          <h3 className="font-bold text-[15px] text-white line-clamp-1 group-hover:text-lime transition">{movie.title}</h3>
          <p className="mt-1 text-xs text-slate-400">{formatYear(movie.release_date)} <span className="mx-1 text-slate-600">•</span> Movie</p>
        </div>
      </Link>
    </motion.article>
  );
}
