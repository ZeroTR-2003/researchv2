"use client";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 to-sand-100 dark:from-brand-900 dark:to-brand-700 text-brand-900">
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mx-auto max-w-6xl px-4 pb-16"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <footer className="border-t border-black/5 dark:border-white/10 py-8 text-sm text-muted-700">
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Windhoek Virtual Tour</p>
          <p className="opacity-70">Inspired by Ascend Travel Agency</p>
        </div>
      </footer>
    </div>
  );
}
