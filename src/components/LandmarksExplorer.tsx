"use client";
import { Landmark } from "@/lib/cms";
import { useMemo, useState } from "react";
import LandmarkCard from "@/components/LandmarkCard";

export default function LandmarksExplorer({ items }: { items: Landmark[] }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string | null>(null);

  const types = useMemo(() => Array.from(new Set(items.map((i) => i.facts?.type).filter(Boolean))) as string[], [items]);

  const filtered = items.filter((i) => {
    const matchesType = type ? i.facts?.type === type : true;
    const matchesQ = q
      ? i.title.toLowerCase().includes(q.toLowerCase()) || i.shortDescription.toLowerCase().includes(q.toLowerCase())
      : true;
    return matchesType && matchesQ;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search landmarks..."
          className="w-full sm:w-1/2 rounded-full border border-black/10 px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-accent/40"
          aria-label="Search landmarks"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setType(null)}
            className={`px-3 py-1.5 rounded-full text-sm ${!type ? "bg-accent text-white" : "bg-black/5 dark:bg-white/10"}`}
          >
            All
          </button>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 rounded-full text-sm ${type === t ? "bg-accent text-white" : "bg-black/5 dark:bg-white/10"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((l) => (
          <LandmarkCard key={l.slug} item={l} />
        ))}
      </div>
    </div>
  );
}
