"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTheme } from "@/contexts/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 dark:border-white/20 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {theme === "dark" ? (
        // Sun icon - shown in dark mode
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon icon - shown in light mode
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-700">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

export default function Header() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/#landmarks", label: "Landmarks" },
    { href: "/#about", label: "About" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-black/5 dark:border-white/10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-2xl sm:text-3xl bg-gradient-to-r from-brand-900 to-accent bg-clip-text text-transparent dark:from-white dark:to-accent hover:opacity-80 transition-opacity">
          Ascend Windhoek
        </Link>
        <nav className="flex items-center gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                pathname === l.href
                  ? "bg-accent text-white shadow-md"
                  : "hover:bg-black/5 dark:hover:bg-white/10 text-brand-900 dark:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
