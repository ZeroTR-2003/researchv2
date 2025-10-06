"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Landmark } from "@/lib/cms";
import { useRef, useState, useEffect, useMemo } from "react";

export default function LandmarkCard({ item }: { item: Landmark }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [videoOk, setVideoOk] = useState(false);

  // If a teaserVideo exists in data use it, otherwise try common naming patterns in /public/videos
  const sources = useMemo(() => {
    const base = item as unknown as { teaserVideo?: string };
    if (base.teaserVideo) return [base.teaserVideo];
    const slug = item.slug;
    return [
      `/videos/${slug}.mp4`,
      `/videos/${slug}.webm`,
      `/videos/${slug}-teaser.mp4`,
      `/videos/${slug}-teaser.webm`,
    ];
  }, [item]);

  useEffect(() => {
    if (!hovered || !videoRef.current || !videoOk) return;
    // Ensure muted + playsinline for auto-play on hover/touch
    const v = videoRef.current;
    v.muted = true;
    v.playsInline = true;
    v.play().catch(() => {});
  }, [hovered, videoOk]);

  const stopVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    try { v.currentTime = 0; } catch {}
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-black/5 dark:bg-slate-900 dark:border-white/10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); stopVideo(); }}
      onTouchStart={() => setHovered(true)}
    >
      <Link href={`/landmarks/${item.slug}`} className="block focus:outline-none">
        <div className="relative aspect-[16/10]">
          {/* Base image */}
          <Image
            src={item.gallery?.[0] || "/next.svg"}
            alt={`${item.title} preview`}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Hover video overlay (only visible if video can play) */}
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${hovered && videoOk ? "opacity-100" : "opacity-0"}`}
            preload="none"
            loop
            playsInline
            muted
            onCanPlay={() => setVideoOk(true)}
            onError={() => setVideoOk(false)}
          >
            {sources.map((src) => (
              <source key={src} src={src} />
            ))}
          </video>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className="text-sm text-muted-700">{item.shortDescription}</p>
          <div className="flex gap-2 pt-2">
            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent-700 text-xs">
              {item.facts?.type || "Attraction"}
            </span>
            {item.facts?.year && (
              <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-xs">
                Est. {item.facts.year}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
