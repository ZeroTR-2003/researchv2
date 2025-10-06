import Link from "next/link";

export default function MapPin({ lat, lng, title }: { lat: number; lng: number; title: string }) {
  const google = `https://www.google.com/maps?q=${lat},${lng}`;
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.02}%2C${lat-0.02}%2C${lng+0.02}%2C${lat+0.02}&layer=mapnik&marker=${lat}%2C${lng}`;
  return (
    <div className="rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
      <iframe
        title={`Map for ${title}`}
        src={embed}
        loading="lazy"
        className="w-full h-64"
      />
      <div className="p-2 bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/10 text-sm">
        <Link className="text-accent hover:underline" href={google} target="_blank">Open in Google Maps</Link>
      </div>
    </div>
  );
}
