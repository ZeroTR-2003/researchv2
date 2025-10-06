"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function TourEmbed({ url, title, description, injectDeviceMotion = false }: { url?: string; title: string; description: string; injectDeviceMotion?: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [shouldLoad, setShouldLoad] = useState(false);
  const iframeId = "tour-embed-" + title.replace(/[^a-z0-9]/gi, "-").toLowerCase();

  useEffect(() => {
    if (inView) setShouldLoad(true);
  }, [inView]);

  useEffect(() => {
    if (!injectDeviceMotion) return;
    const handler = (e: DeviceMotionEvent) => {
      const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
      if (!iframe || !iframe.contentWindow) return;
      iframe.contentWindow.postMessage(
        {
          type: "devicemotion",
          deviceMotionEvent: {
            acceleration: e.acceleration,
            accelerationIncludingGravity: e.accelerationIncludingGravity,
            rotationRate: e.rotationRate,
            interval: e.interval,
            timeStamp: Date.now(),
          },
        },
        "*"
      );
    };
    window.addEventListener("devicemotion", handler);
    return () => window.removeEventListener("devicemotion", handler);
  }, [injectDeviceMotion, iframeId]);

  if (!url) {
    return (
      <div className="rounded-xl bg-black/5 dark:bg-white/10 p-6">
        <p className="text-sm">No interior tour is available yet.</p>
      </div>
    );
  }

  return (
    <section ref={ref} aria-label={title} className="rounded-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
      {!shouldLoad ? (
        <button
          className="w-full aspect-video grid place-items-center bg-gradient-to-br from-sand-100 to-sand-200 hover:to-sand-300 transition-colors"
          onClick={() => setShouldLoad(true)}
          aria-label="Load 360° tour"
        >
          <span className="px-4 py-2 rounded-full bg-accent text-white">View Interior 360°</span>
        </button>
      ) : (
        <iframe
          id={iframeId}
          title={title}
          src={url}
          loading="lazy"
          className="w-full aspect-video"
          allow="vr; xr; accelerometer; gyroscope; autoplay; fullscreen"
          allowFullScreen={false}
        />
      )}
      <p className="sr-only">{description}</p>
    </section>
  );
}
