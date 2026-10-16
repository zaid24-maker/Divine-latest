"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { List, Map as MapIcon } from "lucide-react";
import { MapView } from "./map-view";
import { PropertyCard } from "@/components/property/property-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

export function MapSearch({ properties, cityChips, purposeChips, heading }) {
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [areaIds, setAreaIds] = useState(null);
  const [mobileView, setMobileView] = useState("map");

  const visible = useMemo(
    () =>
      areaIds ? properties.filter((p) => areaIds.includes(p.id)) : properties,
    [properties, areaIds],
  );

  const chip = (c) => (
    <Link
      key={c.href}
      href={c.href}
      aria-current={c.active ? "true" : undefined}
      className={cn(
        "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        c.active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-white hover:border-ink",
      )}
    >
      {c.label}
    </Link>
  );

  return (
    <div className="flex h-[calc(100dvh-64px-64px)] flex-col lg:h-[calc(100dvh-72px)]">
      <div className="border-b border-line bg-paper">
        <div className="container-page flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
            {purposeChips.map(chip)}
            <span className="mx-1 h-5 w-px shrink-0 bg-line" aria-hidden />
            {cityChips.map(chip)}
          </div>
          <p className="shrink-0 text-sm text-muted">
            <span className="font-semibold text-ink">{visible.length}</span>{" "}
            {visible.length === 1 ? "property" : "properties"}
            {areaIds ? " in drawn area" : ""} · {heading}
          </p>
        </div>
      </div>

      <div className="relative grid min-h-0 flex-1 lg:grid-cols-[minmax(380px,460px)_1fr]">
        <div
          className={cn(
            "min-h-0 overflow-y-auto border-r border-line bg-paper p-3",
            mobileView === "map" ? "hidden lg:block" : "block",
          )}
        >
          {visible.length ? (
            <div className="space-y-1">
              {visible.map((p) => (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId(p.id)}
                >
                  <PropertyCard
                    property={p}
                    variant="compact"
                    active={p.id === selectedId || p.id === hoveredId}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No properties here"
              description="Try another city or clear the drawn area."
              className="m-3"
            />
          )}
        </div>

        <MapView
          properties={properties}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
          onAreaChange={setAreaIds}
          className={cn(
            "min-h-0",
            mobileView === "list" ? "hidden lg:block" : "block",
          )}
        />

        <div className="absolute bottom-4 left-1/2 z-40 -translate-x-1/2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileView((v) => (v === "map" ? "list" : "map"))}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper shadow-lift"
          >
            {mobileView === "map" ? (
              <List className="h-4 w-4" aria-hidden />
            ) : (
              <MapIcon className="h-4 w-4" aria-hidden />
            )}
            {mobileView === "map" ? "List" : "Map"}
          </button>
        </div>
      </div>
    </div>
  );
}
