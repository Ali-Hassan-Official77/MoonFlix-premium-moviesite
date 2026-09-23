import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="MoonFlix home"
    >
      <Image
        src="/icon.svg"
        alt=""
        width={42}
        height={42}
        priority
        className="transition-transform duration-300 group-hover:scale-105"
      />

      <span className="moon-brand">
        Moon<span>Flix</span>
      </span>
    </Link>
  );
}