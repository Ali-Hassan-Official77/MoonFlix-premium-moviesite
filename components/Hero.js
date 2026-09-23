"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Play,
  Star,
} from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatRating, formatYear } from "@/lib/utils";
import LikeButton from "@/components/LikeButton";

export default function Hero({ movies = [] }) {
  const slides = useMemo(
    () =>
      movies
        .filter((m) => m?.backdrop_path)
        .slice(0, 8),
    [movies]
  );

  const [active, setActive] = useState(0);
  const movie = slides[active];

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!movie) {
    return <section className="hero-shell hero-empty" />;
  }

  const backdrop = tmdbImage(movie.backdrop_path, "original");
  const poster = tmdbImage(movie.poster_path, "w500");

  const previous = () => {
    setActive((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  const next = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-black text-white sm:min-h-[780px] lg:min-h-[850px]">
      {/* BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{
            opacity: { duration: 0.7 },
            scale: { duration: 7, ease: "linear" },
          }}
        >
          <img
            src={backdrop}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.82)_28%,rgba(0,0,0,0.38)_58%,rgba(0,0,0,0.18)_100%)]" />

          <div className="absolute inset-0 bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,0.72)_16%,transparent_48%,rgba(0,0,0,0.25)_100%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(255,255,255,0.10),transparent_32%)]" />

          {/* Fine cinematic grain */}
          <div
            className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Ambient glow */}
      <motion.div
        key={`glow-${movie.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-white/[0.045] blur-[130px]"
      />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1500px] items-end px-5 pb-28 pt-32 sm:min-h-[780px] sm:px-8 sm:pb-32 lg:min-h-[850px] lg:px-12 lg:pb-32 xl:px-16">
        <div className="grid w-full items-end gap-12 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-20">
          {/* LEFT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              {/* Eyebrow */}
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 backdrop-blur-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Trending now
                </div>

                <span className="h-1 w-1 rounded-full bg-white/30" />

                <span className="text-xs font-medium tracking-wide text-white/55">
                  {formatYear(movie.release_date)}
                </span>

                <span className="h-1 w-1 rounded-full bg-white/30" />

                <span className="flex items-center gap-1 text-xs font-medium text-white/65">
                  <Star
                    size={12}
                    fill="currentColor"
                    className="text-amber-300"
                  />
                  {formatRating(movie.vote_average)}
                </span>
              </div>

              {/* TITLE */}
              <h1 className="max-w-4xl text-[clamp(3.4rem,8vw,7.8rem)] font-black leading-[0.86] tracking-[-0.065em] text-white">
                {movie.title}
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7 lg:text-[17px]">
                {movie.overview ||
                  "Discover what the world is watching right now."}
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/movie/${movie.id}`}
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-white px-5 text-sm font-bold text-black transition-all duration-300 hover:scale-[1.025] hover:bg-white/90 active:scale-[0.98] sm:h-13 sm:px-6"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    <Play size={13} fill="currentColor" />
                  </span>

                  Explore movie

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <LikeButton
                  movie={movie}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.12] sm:h-13"
                >
                  <Heart
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="hidden xs:inline sm:inline">
                    Add to watch list
                  </span>
                </LikeButton>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT MOVIE CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${movie.id}`}
              initial={{ opacity: 0, y: 25, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -15, x: 15 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="hidden lg:block"
            >
              <div className="group relative">
                {/* Outer glow */}
                <div className="absolute -inset-4 rounded-[30px] bg-white/[0.035] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

                {/* Card */}
                <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-white/[0.055] p-2 shadow-2xl backdrop-blur-2xl">
                  <div className="relative aspect-[3/4.25] overflow-hidden rounded-[18px] bg-white/5">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={poster || backdrop}
                        src={poster || backdrop}
                        alt={movie.title}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-full object-cover"
                      />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                    {/* Top badge */}
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-white/80 backdrop-blur-md">
                        FEATURED
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
                        Now streaming
                      </p>

                      <h2 className="line-clamp-2 text-lg font-bold leading-tight tracking-[-0.025em] text-white">
                        {movie.title}
                      </h2>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between px-2 pb-1 pt-3">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                        Movie
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-white/65">
                        Moonflix selection
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60">
                      <Play size={13} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE POSTER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`mobile-${movie.id}`}
          initial={{ opacity: 0, scale: 0.94, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.5 }}
          className="absolute right-4 top-28 z-10 block w-[104px] sm:right-8 sm:top-32 sm:w-[125px] lg:hidden"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-1.5 shadow-2xl backdrop-blur-xl">
            <img
              src={poster || backdrop}
              alt={movie.title}
              className="aspect-[3/4.2] w-full rounded-xl object-cover"
            />

            <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-xl">
              <Play size={11} fill="currentColor" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* CONTROLS */}
      <div className="absolute bottom-7 left-5 right-5 z-20 flex items-center justify-between sm:bottom-9 sm:left-8 sm:right-8 lg:left-12 lg:right-12 xl:left-16 xl:right-16">
        {/* Counter */}
        <div className="flex min-w-[72px] items-center gap-2">
          <span className="text-xs font-bold tracking-[0.16em] text-white">
            {String(active + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-5 bg-white/25" />

          <span className="text-[10px] font-medium tracking-[0.12em] text-white/35">
            {String(Math.max(slides.length, 1)).padStart(2, "0")}
          </span>
        </div>

        {/* Dots */}
        <div className="hidden items-center gap-1.5 sm:flex">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => setActive(index)}
              className="group flex h-7 items-center justify-center"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-500 ${
                  index === active
                    ? "w-9 bg-white"
                    : "w-3 bg-white/20 group-hover:w-5 group-hover:bg-white/45"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous movie"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 backdrop-blur-xl transition-all duration-300 hover:bg-white/12 hover:text-white active:scale-95"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next movie"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 backdrop-blur-xl transition-all duration-300 hover:bg-white/12 hover:text-white active:scale-95"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/[0.08]">
        <motion.div
          key={movie.id}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.5, ease: "linear" }}
          className="h-full bg-white/60"
        />
      </div>
    </section>
  );
}