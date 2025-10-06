import { getAllLandmarks, getLandmarkBySlug } from "@/lib/cms";
import GLBViewer from "@/components/GLBViewer";
import TourEmbed from "@/components/TourEmbed";
import MapPin from "@/components/MapPin";
import type { Metadata } from "next";
import Image from "next/image";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLandmarks().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const landmark = getLandmarkBySlug(slug)!;
  return {
    title: landmark.title,
    description: landmark.shortDescription,
    openGraph: {
      title: landmark.title,
      description: landmark.shortDescription,
      images: landmark.gallery?.[0] ? [{ url: landmark.gallery[0] }] : undefined,
    },
  };
}

export default async function LandmarkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landmark = getLandmarkBySlug(slug);
  if (!landmark) return <div className="container">Not found</div>;

  const { coords } = landmark;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: landmark.title,
    description: landmark.shortDescription,
    url: `https://example.com/landmarks/${landmark.slug}`,
    geo: { "@type": "GeoCoordinates", latitude: coords.lat, longitude: coords.lng },
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero with image */}
      <section className="relative h-[50vh] sm:h-[60vh] bg-gradient-to-br from-brand-900 to-brand-700 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={landmark.gallery?.[0] || "/next.svg"} 
            alt={`${landmark.title} hero`} 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="container relative h-full flex flex-col justify-end pb-12">
          <div className="inline-flex items-center gap-2 text-white/80 text-sm mb-3">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span>Windhoek, Namibia</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4">
            {landmark.title}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            {landmark.shortDescription}
          </p>
        </div>
      </section>

      <div className="container space-y-16 py-12">
        {/* 3D Viewer Section */}
        <section className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Interactive <span className="text-accent">3D Model</span>
            </h2>
            <p className="text-muted-700 dark:text-slate-400 max-w-2xl mx-auto">
              Explore the exterior architecture in stunning 3D. Rotate, zoom, and discover every detail.
            </p>
          </div>
          <GLBViewer src={landmark.glbExterior} />
        </section>

        {/* 360 Tour Section */}
        <section className="space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              360° <span className="text-accent">Virtual Tour</span>
            </h2>
            <p className="text-muted-700 dark:text-slate-400 max-w-2xl mx-auto">
              Step inside and explore the interior with our immersive panoramic tour.
            </p>
          </div>
          <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-slate-900 ring-2 ring-black/5 dark:ring-white/10 shadow-xl">
            <TourEmbed
              url={landmark.tour360Url}
              title={`${landmark.title} interior 360 tour`}
              description={`360-degree interior tour of ${landmark.title}.`}
              injectDeviceMotion={landmark.slug === "windhoek-city-museum"}
            />
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Quick Facts */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Quick Facts</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(landmark.facts || {}).map(([k, v]) => (
                <div key={k} className="p-5 rounded-xl bg-white dark:bg-slate-900 ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
                  <div className="text-xs uppercase tracking-wider text-muted-700 dark:text-slate-400 mb-1 font-medium">{k}</div>
                  <div className="text-lg font-semibold">{String(v)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Location</h2>
            <div className="rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
              <MapPin lat={coords.lat} lng={coords.lng} title={landmark.title} />
            </div>
          </div>
        </section>
      </div>

      {/* Gallery */}
      <section className="bg-gradient-to-br from-sand-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
        <div className="container">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Photo <span className="text-accent">Gallery</span>
            </h2>
            <p className="text-muted-700 dark:text-slate-400 max-w-2xl mx-auto">
              Browse through stunning photographs of {landmark.title}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {landmark.gallery?.map((g, i) => (
              <div key={g + i} className="group relative aspect-[4/3] rounded-2xl overflow-hidden ring-2 ring-black/5 dark:ring-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <Image 
                  src={g} 
                  alt={`${landmark.title} gallery image ${i + 1}`} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
