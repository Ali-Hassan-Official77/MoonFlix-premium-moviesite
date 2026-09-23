"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import Reveal from "@/components/Reveal";
export default function MovieRow({title,subtitle,movies,priority=false}){
 const ref=useRef(null); if(!movies?.length)return null;
 const move=(dir)=>ref.current?.scrollBy({left:dir*ref.current.clientWidth*.82,behavior:"smooth"});
 return <section className="py-9 sm:py-12"><Reveal className="mx-auto max-w-7xl px-5 sm:px-8"><div className="flex items-end justify-between gap-4 mb-5"><div><h2 className="row-title font-black text-white">{title}</h2>{subtitle&&<p className="row-subtitle text-xs mt-1">{subtitle}</p>}</div><div className="hidden sm:flex gap-2"><button onClick={()=>move(-1)} className="w-9 h-9 rounded-full border border-[#303846] grid place-items-center text-slate-400 hover:text-lime hover:border-lime"><ChevronLeft size={16}/></button><button onClick={()=>move(1)} className="w-9 h-9 rounded-full border border-[#303846] grid place-items-center text-slate-400 hover:text-lime hover:border-lime"><ChevronRight size={16}/></button></div></div></Reveal><div ref={ref} className="row-scroll flex gap-4 overflow-x-auto px-5 sm:px-8 pb-2 snap-x snap-mandatory">{movies.map((m,i)=><div key={m.id} className="snap-start shrink-0 w-[150px] sm:w-[170px] lg:w-[190px]"><MovieCard movie={m} priority={priority&&i<4}/></div>)}</div></section>
}
