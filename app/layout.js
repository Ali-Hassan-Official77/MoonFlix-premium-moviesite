import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const manrope = Manrope({ subsets:["latin"], variable:"--font-manrope", weight:["400","500","600","700","800"], display:"swap" });

export const metadata = {
  title: "MoonFlix — Discover What to Watch",
  description: "A polished movie discovery experience powered by TMDB.",
  icons: { icon:"/icon.svg", shortcut:"/icon.svg", apple:"/icon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>

    <script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_9W1FXO1oVPhDaVkFEMFd7QEN" defer></script>
      </body>
    </html>
  );
}
