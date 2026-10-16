"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  Crosshair,
  Minus,
  MousePointerClick,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { PropertyImage } from "@/components/property/property-image";
import { useToast } from "@/components/ui/toast";
import { formatPrice, formatPriceCompact } from "@/lib/format";
import { clamp, cn } from "@/lib/utils";

/**
 * Reusable map surface.
 *
 * This is a placeholder renderer: markers are projected onto a stylised canvas from their
 * lat/lng. To use Google Maps or Mapbox, keep this component's props and replace the
 * canvas + marker layer with the provider's map and `Marker` components.
 */

function project(properties) {
  const out = new Map();
  if (!properties.length) return out;
  const lats = properties.map((p) => p.location.lat);
  const lngs = properties.map((p) => p.location.lng);
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)];
  const [minLng, maxLng] = [Math.min(...lngs), Math.max(...lngs)];
  const latSpan = maxLat - minLat || 1;
  const lngSpan = maxLng - minLng || 1;
  for (const p of properties) {
    const x =
      maxLng === minLng ? 50 : 12 + ((p.location.lng - minLng) / lngSpan) * 76;
    const y =
      maxLat === minLat
        ? 50
        : 12 + (1 - (p.location.lat - minLat) / latSpan) * 76;
    out.set(p.id, { x, y });
  }
  // Nudge markers that share a coordinate so they stay individually clickable.
  const seen = new Map();
  out.forEach((pt, id) => {
    const key = `${pt.x.toFixed(1)}:${pt.y.toFixed(1)}`;
    const n = seen.get(key) ?? 0;
    seen.set(key, n + 1);
    if (n > 0)
      out.set(id, {
        x: clamp(pt.x + n * 4.5, 6, 94),
        y: clamp(pt.y + (n % 2 ? 6 : -6), 8, 92),
      });
  });
  return out;
}

function MapCanvas() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <rect width="100" height="100" fill="#eaefe8" />
      <path
        d="M0 62 C 18 55, 30 70, 52 60 S 86 48, 100 56 L100 100 L0 100 Z"
        fill="#d6e6e4"
      />
      <rect x="6" y="8" width="20" height="16" rx="2" fill="#dbe8d2" />
      <rect x="64" y="12" width="26" height="14" rx="2" fill="#dbe8d2" />
      <rect x="38" y="30" width="14" height="10" rx="2" fill="#dbe8d2" />
      <g stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M0 30 L100 38" />
        <path d="M0 74 L100 80" />
        <path d="M22 0 L30 100" />
        <path d="M70 0 L62 100" />
        <path d="M0 50 C 30 44, 60 56, 100 48" strokeWidth="2" />
      </g>
      <g stroke="#f6f2e8" strokeWidth="0.6" fill="none">
        <path d="M0 14 L100 20 M0 90 L100 92 M45 0 L48 100 M88 0 L84 100 M10 0 L14 100" />
      </g>
    </svg>
  );
}

export function MapView({
  properties,
  selectedId = null,
  hoveredId = null,
  onSelect,
  onAreaChange,
  interactive = true,
  className,
}) {
  const { toast } = useToast();
  const surface = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [drawMode, setDrawMode] = useState(false);
  const [rect, setRect] = useState(null);
  const [dragging, setDragging] = useState(false);

  const points = useMemo(() => project(properties), [properties]);
  const selected = properties.find((p) => p.id === selectedId) ?? null;

  const place = (pt) => ({
    x: 50 + (pt.x - 50) * zoom,
    y: 50 + (pt.y - 50) * zoom,
  });

  const toPercent = (e) => {
    const box = surface.current.getBoundingClientRect();
    return {
      x: clamp(((e.clientX - box.left) / box.width) * 100, 0, 100),
      y: clamp(((e.clientY - box.top) / box.height) * 100, 0, 100),
    };
  };

  const insideRect = (pt, r) =>
    pt.x >= Math.min(r.a.x, r.b.x) &&
    pt.x <= Math.max(r.a.x, r.b.x) &&
    pt.y >= Math.min(r.a.y, r.b.y) &&
    pt.y <= Math.max(r.a.y, r.b.y);

  function finishDraw(next) {
    setDragging(false);
    setDrawMode(false);
    if (
      !next ||
      (Math.abs(next.a.x - next.b.x) < 2 && Math.abs(next.a.y - next.b.y) < 2)
    ) {
      setRect(null);
      onAreaChange?.(null);
      return;
    }
    setRect(next);
    const ids = properties
      .filter((p) => insideRect(place(points.get(p.id)), next))
      .map((p) => p.id);
    onAreaChange?.(ids);
    toast(
      ids.length
        ? `${ids.length} propert${ids.length === 1 ? "y" : "ies"} in your area.`
        : "No properties inside that area.",
      "info",
    );
  }

  function clearArea() {
    setRect(null);
    onAreaChange?.(null);
  }

  function locate() {
    if (!navigator.geolocation) {
      toast("Location is not supported on this device.", "error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        setZoom(1);
        toast("Location found. Showing listings near you.");
      },
      () => toast("Location permission was denied.", "error"),
      { timeout: 8000 },
    );
  }

  const controlBtn =
    "flex h-10 w-10 items-center justify-center bg-white text-ink transition-colors hover:bg-sand disabled:opacity-40";

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-[#eaefe8]", className)}
    >
      <div
        ref={surface}
        className={cn(
          "absolute inset-0 touch-none",
          drawMode ? "cursor-crosshair" : "cursor-default",
        )}
        onPointerDown={(e) => {
          if (!drawMode) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          const pt = toPercent(e);
          setRect({ a: pt, b: pt });
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (drawMode && dragging)
            setRect((r) => (r ? { ...r, b: toPercent(e) } : r));
        }}
        onPointerUp={() => drawMode && dragging && finishDraw(rect)}
        onClick={() => !drawMode && onSelect?.(null)}
      >
        <MapCanvas />

        {rect && (
          <div
            className="pointer-events-none absolute border-2 border-emerald bg-emerald/10"
            style={{
              left: `${Math.min(rect.a.x, rect.b.x)}%`,
              top: `${Math.min(rect.a.y, rect.b.y)}%`,
              width: `${Math.abs(rect.a.x - rect.b.x)}%`,
              height: `${Math.abs(rect.a.y - rect.b.y)}%`,
            }}
          />
        )}

        {properties.map((p) => {
          const pt = points.get(p.id);
          if (!pt) return null;
          const pos = place(pt);
          if (pos.x < 0 || pos.x > 100 || pos.y < 0 || pos.y > 100) return null;
          const active = p.id === selectedId || p.id === hoveredId;
          const dimmed = rect && !dragging && !insideRect(pos, rect);
          return (
            <button
              key={p.id}
              type="button"
              disabled={!interactive || drawMode}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(p.id);
              }}
              aria-label={`${p.title}, ${formatPrice(p.price, p.currency, p.purpose)}`}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold shadow-soft transition-all",
                "after:absolute after:left-1/2 after:top-full after:-mt-1 after:h-2 after:w-2 after:-translate-x-1/2 after:rotate-45",
                active
                  ? "z-20 scale-110 bg-ink text-paper after:bg-ink"
                  : "z-10 bg-white text-ink hover:z-20 hover:scale-105 after:bg-white",
                dimmed && "opacity-40",
              )}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              {formatPriceCompact(p.price, p.currency, p.purpose)}
            </button>
          );
        })}
      </div>

      {interactive && (
        <>
          <div className="absolute left-3 top-3 z-30 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() =>
                drawMode ? setDrawMode(false) : setDrawMode(true)
              }
              aria-pressed={drawMode}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold shadow-soft",
                drawMode ? "bg-emerald text-white" : "bg-white hover:bg-sand",
              )}
            >
              <Pencil className="h-4 w-4" aria-hidden />
              {drawMode ? "Drag on map…" : "Draw area"}
            </button>
            {rect && (
              <button
                type="button"
                onClick={clearArea}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-3 text-sm font-semibold shadow-soft hover:bg-sand"
              >
                <X className="h-4 w-4" aria-hidden /> Clear
              </button>
            )}
          </div>

          <div className="absolute right-3 top-3 z-30 flex flex-col gap-2">
            <div className="overflow-hidden rounded-md shadow-soft">
              <button
                type="button"
                className={cn(controlBtn, "border-b border-line")}
                onClick={() =>
                  setZoom((z) => clamp(+(z + 0.25).toFixed(2), 1, 2.5))
                }
                disabled={zoom >= 2.5}
                aria-label="Zoom in"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                className={controlBtn}
                onClick={() =>
                  setZoom((z) => clamp(+(z - 0.25).toFixed(2), 1, 2.5))
                }
                disabled={zoom <= 1}
                aria-label="Zoom out"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={locate}
              aria-label="Use my current location"
              className={cn(controlBtn, "rounded-md shadow-soft")}
            >
              <Crosshair className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      {!properties.length && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
          <p className="flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm shadow-soft">
            <MousePointerClick className="h-4 w-4 text-muted" aria-hidden /> No
            properties to show on the map.
          </p>
        </div>
      )}

      {selected && interactive && (
        <div className="absolute inset-x-3 bottom-3 z-30 mx-auto max-w-sm animate-fade-up overflow-hidden rounded-lg bg-white shadow-lift">
          <button
            type="button"
            onClick={() => onSelect?.(null)}
            aria-label="Close preview"
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 hover:bg-white"
          >
            <X className="h-4 w-4" />
          </button>
          <Link href={`/properties/${selected.slug}`} className="flex">
            <span className="relative block h-28 w-32 shrink-0 bg-sand">
              <PropertyImage
                src={selected.images[0].url}
                alt={selected.images[0].alt}
                sizes="128px"
              />
            </span>
            <span className="min-w-0 flex-1 p-3">
              <span className="block font-display text-lg font-semibold">
                {formatPrice(
                  selected.price,
                  selected.currency,
                  selected.purpose,
                )}
              </span>
              <span className="mt-0.5 block truncate text-sm font-medium">
                {selected.title}
              </span>
              <span className="block truncate text-xs text-muted">
                {selected.location.locality}, {selected.location.city}
              </span>
              <span className="mt-2 inline-block text-xs font-semibold text-emerald">
                View details →
              </span>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
