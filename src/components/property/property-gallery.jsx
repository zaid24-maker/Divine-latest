"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  Play,
  View,
  X,
} from "lucide-react";
import { PropertyImage } from "./property-image";
import { cn } from "@/lib/utils";

export function PropertyGallery({ images, title, hasVideo, hasTour }) {
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState("photos");
  const [fullscreen, setFullscreen] = useState(false);

  const go = useCallback(
    (delta) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen, go]);

  const tabs = [
    {
      id: "photos",
      label: `Photos (${images.length})`,
      icon: <Camera className="h-4 w-4" aria-hidden />,
      show: true,
    },
    {
      id: "video",
      label: "Video",
      icon: <Play className="h-4 w-4" aria-hidden />,
      show: Boolean(hasVideo),
    },
    {
      id: "tour",
      label: "Virtual Tour",
      icon: <View className="h-4 w-4" aria-hidden />,
      show: Boolean(hasTour),
    },
  ];

  return (
    <section aria-label={`${title} gallery`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand sm:aspect-[16/9]">
        {tab === "photos" && (
          <>
            <PropertyImage
              key={index}
              src={images[index].url}
              alt={images[index].alt}
              priority={index === 0}
              sizes="(min-width: 1024px) 820px, 100vw"
            />

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-soft hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-soft hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-ink/80 px-3 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-ink"
            >
              <Expand className="h-4 w-4" aria-hidden /> Fullscreen
            </button>
            <span className="absolute bottom-3 left-3 rounded bg-ink/70 px-2 py-1 text-xs font-medium text-white backdrop-blur">
              {index + 1} / {images.length}
            </span>
          </>
        )}

        {tab === "video" && (
          <div className="absolute inset-0">
            <PropertyImage
              src={images[0].url}
              alt={images[0].alt}
              className="brightness-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink">
                <Play className="h-7 w-7 translate-x-0.5" aria-hidden />
              </span>
              <p className="font-display text-xl">Video walkthrough</p>
              <p className="max-w-sm text-sm text-white/80">
                The agent will share the full walkthrough on request. Use the
                contact panel to ask for it.
              </p>
            </div>
          </div>
        )}

        {tab === "tour" && (
          <div className="absolute inset-0">
            <PropertyImage
              src={images[1 % images.length].url}
              alt={images[1 % images.length].alt}
              className="brightness-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink">
                <View className="h-7 w-7" aria-hidden />
              </span>
              <p className="font-display text-xl">360° virtual tour</p>
              <p className="max-w-sm text-sm text-white/80">
                An immersive tour is available for this property. Request a link
                from the agent.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        {tabs
          .filter((t) => t.show)
          .map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
                tab === t.id
                  ? "bg-ink text-paper"
                  : "bg-sand hover:bg-sand-deep",
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
      </div>

      {tab === "photos" && (
        <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <li key={img.url + i} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative block h-16 w-24 overflow-hidden rounded-md bg-sand transition-opacity sm:h-20 sm:w-28",
                  i === index
                    ? "ring-2 ring-emerald ring-offset-2 ring-offset-paper"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <PropertyImage src={img.url} alt="" sizes="112px" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {fullscreen && (
        <div
          className="fixed inset-0 z-[95] flex flex-col bg-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div className="flex items-center justify-between px-4 py-3 text-paper">
            <p className="text-sm">
              {title} · {index + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              aria-label="Close photo viewer"
              className="rounded-md p-2 hover:bg-paper/10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="relative flex-1">
            <PropertyImage
              src={images[index].url}
              alt={images[index].alt}
              sizes="100vw"
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-paper/15 p-3 text-paper hover:bg-paper/30"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-paper/15 p-3 text-paper hover:bg-paper/30"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
