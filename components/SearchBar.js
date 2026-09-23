"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear } from "@/lib/utils";
import { useToast } from "@/components/Providers";

export default function SearchBar({ variant = "dark", autoFocus = false }) {
  const [query,setQuery]=useState(""),[results,setResults]=useState([]),[loading,setLoading]=useState(false),[open,setOpen]=useState(false);
  const containerRef=useRef(null); const router=useRouter(); const {notify}=useToast();

  useEffect(()=>{if(!query.trim()){setResults([]);return} setLoading(true); const timeout=setTimeout(async()=>{try{const res=await fetch(`/api/search?q=${encodeURIComponent(query)}`);const data=await res.json();setResults((data.results||[]).slice(0,6))}catch{setResults([]);notify("Search is temporarily unavailable.","warning")}finally{setLoading(false)}},320);return()=>clearTimeout(timeout)},[query,notify]);
  useEffect(()=>{function outside(e){if(containerRef.current&&!containerRef.current.contains(e.target))setOpen(false)} document.addEventListener("mousedown",outside);return()=>document.removeEventListener("mousedown",outside)},[]);

  function submit(e){e.preventDefault();if(!query.trim()){notify("Enter a movie title to search.","warning");return}setOpen(false);notify(`Searching for “${query.trim()}”`,"info");router.push(`/search?q=${encodeURIComponent(query.trim())}`)}

  return <div ref={containerRef} className="relative w-full"><form onSubmit={submit} role="search"><label htmlFor="site-search" className="sr-only">Search movies</label><div className="relative flex items-center"><Search size={16} className="absolute left-3.5 search-icon pointer-events-none"/><input id="site-search" type="search" value={query} autoFocus={autoFocus} onChange={e=>{setQuery(e.target.value);setOpen(true)}} onFocus={()=>setOpen(true)} placeholder="Search films, actors, worlds..." className="search-input"/></div></form>{open&&query.trim()&&<div className="search-dropdown">{results.length===0&&!loading&&<p className="px-4 py-3 text-sm text-bone-faint">No films match “{query}”.</p>}<ul>{results.map(movie=><li key={movie.id}><button type="button" onClick={()=>{setOpen(false);setQuery("");notify(`Opening ${movie.title}`,"info");router.push(`/movie/${movie.id}`)}} className="search-result"><div className="relative w-9 h-13 shrink-0 rounded overflow-hidden bg-ink-700" style={{width:36,height:52}}>{movie.poster_path&&<img src={tmdbImage(movie.poster_path,"w92")} alt="" loading="lazy" className="w-full h-full object-cover"/>}</div><span className="min-w-0"><span className="block text-sm text-bone truncate">{movie.title}</span><span className="block text-xs text-bone-faint">{formatYear(movie.release_date)}</span></span></button></li>)}</ul>{results.length>0&&<button type="button" onClick={submit} className="search-all">See all results for “{query}”</button>}</div>}</div>;
}
