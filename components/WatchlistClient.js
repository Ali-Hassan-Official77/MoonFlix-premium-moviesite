"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Compass } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import { getWatchlist } from "@/components/LikeButton";
export default function WatchlistClient(){
 const [movies,setMovies]=useState([]);
 useEffect(()=>{ const sync=()=>setMovies(getWatchlist()); sync(); addEventListener("moonflix-watchlist-change",sync); return()=>removeEventListener("moonflix-watchlist-change",sync);},[]);
 return <main className="page-shell"><div className="mx-auto max-w-7xl px-5 sm:px-8 pt-32 pb-20"><div className="page-kicker"><Bookmark size={15}/> PERSONAL LIBRARY</div><h1 className="page-title">My Watch List</h1><p className="page-subtitle">Movies you liked are saved here on this device.</p>{movies.length ? <div className="movie-grid mt-10">{movies.map(m=><MovieCard key={m.id} movie={m}/>)}</div> : <div className="empty-watch"><div className="empty-icon"><Bookmark/></div><h2>Your list is waiting.</h2><p>Tap the heart on any movie to keep it here.</p><Link href="/" className="btn-primary mt-6"><Compass size={17}/> Discover movies</Link></div>}</div></main>;
}
