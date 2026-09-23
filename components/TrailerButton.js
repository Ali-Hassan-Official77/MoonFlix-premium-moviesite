"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { useToast } from "@/components/Providers";

export default function TrailerButton({ youtubeKey }) {
  const [open,setOpen]=useState(false); const {notify}=useToast();
  if(!youtubeKey)return null;
  return <>
    <button type="button" onClick={()=>{setOpen(true);notify("Trailer opened.","info")}} className="btn-primary"><Play size={16} fill="currentColor"/> Watch trailer</button>
    <AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8" onClick={()=>setOpen(false)}>
      <motion.div initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.97}} transition={{duration:.25}} className="relative w-full max-w-4xl aspect-video" onClick={e=>e.stopPropagation()}>
        <button type="button" onClick={()=>setOpen(false)} className="absolute -top-10 right-0 text-bone hover:text-gold-bright" aria-label="Close trailer"><X size={24}/></button>
        <iframe className="w-full h-full rounded-md" src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`} title="Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </>;
}
