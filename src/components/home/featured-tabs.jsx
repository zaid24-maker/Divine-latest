"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { buttonStyles } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all", label: "All", test: () => true },
  { id: "sale", label: "For Sale", test: (p) => p.purpose === "sale" },
  { id: "rent", label: "For Rent", test: (p) => p.purpose === "rent" },
  {
    id: "residential",
    label: "Residential",
    test: (p) => p.category === "residential",
  },
  {
    id: "commercial",
    label: "Commercial",
    test: (p) => p.category === "commercial",
  },
];

export function FeaturedTabs({ properties }) {
  const [tab, setTab] = useState("all");
  const active = TABS.find((t) => t.id === tab);
  const items = properties.filter(active.test).slice(0, 6);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Featured property filter"
        className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`featured-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls="featured-panel"
            onClick={() => setTab(t.id)}
            className={cn(
              "relative shrink-0 px-4 py-3 text-[15px] font-medium transition-colors",
              tab === t.id ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute inset-x-4 bottom-0 h-0.5 bg-emerald" />
            )}
          </button>
        ))}
      </div>
      <div className="border-t border-line" />

      <div
        id="featured-panel"
        role="tabpanel"
        aria-labelledby={`featured-tab-${tab}`}
        className="mt-8"
      >
        {items.length ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <PropertyCard key={p.id} property={p} priority={i < 3} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing featured here yet"
            description="Browse all listings to see the latest properties."
          />
        )}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/properties"
          className={buttonStyles({ variant: "outline", size: "lg" })}
        >
          Browse all properties <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
