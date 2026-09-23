"use client";

import { useEffect, useState } from "react";
import { Bookmark, Menu, Search, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import { useTheme, useToast } from "@/components/Providers";

export default function Navbar() {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { notify } = useToast();

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f(); addEventListener("scroll", f, { passive:true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  function changeTheme() {
    toggleTheme();
    notify(theme === "dark" ? "Light mode enabled" : "Dark mode enabled", "info");
  }

  return (
    <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-[78px] flex items-center justify-between gap-6">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
          <Link href="/" className="nav-link">Discover</Link><Link href="/genre/28" className="nav-link">Action</Link><Link href="/genre/35" className="nav-link">Comedy</Link><Link href="/genre/27" className="nav-link">Horror</Link><Link href="/genre/18" className="nav-link">Drama</Link>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-60 xl:w-72"><SearchBar variant="dark" /></div>
          <Link href="/watchlist" className="watch-nav"><Bookmark size={17} /> Watch list</Link>
          <button onClick={changeTheme} className="theme-button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}
          </button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={changeTheme} className="theme-button" aria-label="Toggle color theme">{theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}</button>
          <button className="mobile-menu-button" onClick={()=>setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open?<X/>:<Menu/>}</button>
        </div>
      </div>
      {open && <div className="mobile-menu"><SearchBar variant="dark"/><Link href="/watchlist" className="watch-nav justify-center"><Bookmark size={17}/> Watch list</Link><Link href="/" className="mobile-link">Discover</Link><Link href="/genre/28" className="mobile-link">Action</Link><Link href="/genre/35" className="mobile-link">Comedy</Link><Link href="/genre/27" className="mobile-link">Horror</Link><Link href="/genre/18" className="mobile-link">Drama</Link></div>}
    </header>
  );
}
