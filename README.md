# MoonFlix

A dark, cinematic film discovery site built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion, powered by the TMDB API.

## Design

- **Palette** — ink black (`#0A0B0E`–`#242833`), warm bone text, antique marquee gold (`#C7A046`), velvet wine accent.
- **Type** — Fraunces (display, italic serif) paired with Manrope (UI/body).
- **Motion** — a single orchestrated hero entrance, scroll-triggered row reveals, and hover lifts on cards. Everything respects `prefers-reduced-motion`.
- **Layout** — full-bleed hero, horizontal-scrolling rows in the streaming-shelf tradition but restyled with a marquee-lamp accent rule instead of generic section labels.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your TMDB credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```
TMDB_API_KEY=              # v3 API key (kept for completeness; not required if using the token below)
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
API_ACCESS_TOKEN=          # TMDB v4 read access token — used as the Bearer token server-side
```

`API_ACCESS_TOKEN` never reaches the browser — all TMDB calls happen in server components (`lib/tmdb.js`) or in route handlers under `app/api/`.

## Project structure

```
app/
  page.js                 Home — hero + genre rows
  movie/[id]/page.js      Movie detail — cast, trailer, similar titles
  search/page.js          Search results
  genre/[id]/page.js      Genre browse with "Load more"
  api/
    search/route.js       Autocomplete + search backend
    genre/[id]/route.js   Paginated genre browse backend
    movie/[id]/similar/route.js
components/                Navbar, Hero, MovieCard, MovieRow, MovieGrid, ...
lib/
  tmdb.js                 Server-only TMDB data layer
  utils.js                Formatting helpers
```

## Deploying

Deploys cleanly to Vercel. Set the four environment variables above in the
project's Vercel settings before the first deploy.
