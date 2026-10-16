"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Select } from "@/components/ui/form";
import {
  AMENITIES,
  AREA_OPTIONS,
  BED_OPTIONS,
  COMMERCIAL_TYPES,
  FURNISHING_OPTIONS,
  POSSESSION_OPTIONS,
  RESIDENTIAL_TYPES,
  priceLadder,
} from "@/data/constants";
import { toggleCsv, updateParams, withQuery } from "@/lib/query";
import { cn } from "@/lib/utils";

function Section({ title, children, defaultOpen = true }) {
  return (
    <details open={defaultOpen} className="group border-b border-line py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          className="h-4 w-4 text-muted transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-white hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}

function Check({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-line accent-emerald"
      />
      {label}
    </label>
  );
}

/**
 * Faceted filters. Every control writes to the URL (`router.replace`), so the server page
 * re-renders with fresh results and any combination of filters is shareable.
 * `lockedPurpose` / `lockedCategory` hide the facets already fixed by the route.
 */
export function PropertyFilters({
  lockedPurpose,
  lockedCategory,
  total,
  currency,
  cities,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const purpose = lockedPurpose ?? params.get("purpose") ?? "";
  const category = lockedCategory ?? params.get("category") ?? "";
  const prices = priceLadder(currency, purpose);
  const csv = (key) => (params.get(key) ?? "").split(",").filter(Boolean);

  const [minArea, setMinArea] = useState(params.get("minArea") ?? "");
  const [maxArea, setMaxArea] = useState(params.get("maxArea") ?? "");
  useEffect(() => {
    setMinArea(params.get("minArea") ?? "");
    setMaxArea(params.get("maxArea") ?? "");
  }, [params]);

  function apply(updates) {
    const next = updateParams(params, updates);
    startTransition(() =>
      router.replace(withQuery(pathname, next), { scroll: false }),
    );
  }

  const types =
    category === "commercial"
      ? COMMERCIAL_TYPES
      : category === "residential"
        ? RESIDENTIAL_TYPES
        : [...RESIDENTIAL_TYPES, ...COMMERCIAL_TYPES];
  const showResidential = category !== "commercial";
  const showCommercial = category !== "residential";
  const hasFilters = [...params.keys()].some(
    (k) => !["sort", "view", "page"].includes(k),
  );

  const panel = (
    <div className={cn("transition-opacity", pending && "opacity-60")}>
      {!lockedPurpose && (
        <Section title="Purpose">
          <div className="flex gap-2">
            <Chip
              active={purpose === ""}
              onClick={() => apply({ purpose: null })}
            >
              All
            </Chip>
            <Chip
              active={purpose === "sale"}
              onClick={() =>
                apply({ purpose: "sale", minPrice: null, maxPrice: null })
              }
            >
              Buy
            </Chip>
            <Chip
              active={purpose === "rent"}
              onClick={() =>
                apply({ purpose: "rent", minPrice: null, maxPrice: null })
              }
            >
              Rent
            </Chip>
          </div>
        </Section>
      )}

      {!lockedCategory && (
        <Section title="Category">
          <div className="flex gap-2">
            <Chip
              active={category === ""}
              onClick={() => apply({ category: null, type: null })}
            >
              All
            </Chip>
            <Chip
              active={category === "residential"}
              onClick={() => apply({ category: "residential", type: null })}
            >
              Residential
            </Chip>
            <Chip
              active={category === "commercial"}
              onClick={() =>
                apply({
                  category: "commercial",
                  type: null,
                  beds: null,
                  baths: null,
                })
              }
            >
              Commercial
            </Chip>
          </div>
        </Section>
      )}

      <Section title="City">
        <Select
          aria-label="City"
          value={params.get("city") ?? ""}
          onChange={(e) => apply({ city: e.target.value || null })}
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </Section>

      <Section title="Property type">
        <div className="grid grid-cols-2 gap-x-3">
          {types.map((t) => (
            <Check
              key={t.value}
              label={t.label}
              checked={csv("type").includes(t.value)}
              onChange={() =>
                apply({ type: toggleCsv(params.get("type"), t.value) })
              }
            />
          ))}
        </div>
      </Section>

      <Section title={purpose === "rent" ? "Rent" : "Price"}>
        <div className="grid grid-cols-2 gap-2">
          <Select
            aria-label="Minimum price"
            value={params.get("minPrice") ?? ""}
            onChange={(e) => apply({ minPrice: e.target.value || null })}
          >
            <option value="">Min</option>
            {prices.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </Select>
          <Select
            aria-label="Maximum price"
            value={params.get("maxPrice") ?? ""}
            onChange={(e) => apply({ maxPrice: e.target.value || null })}
          >
            <option value="">Max</option>
            {prices.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </Select>
        </div>
      </Section>

      {showResidential && (
        <Section title="Bedrooms">
          <div className="flex flex-wrap gap-2">
            {BED_OPTIONS.map((b) => (
              <Chip
                key={b.value}
                active={params.get("beds") === String(b.value)}
                onClick={() =>
                  apply({
                    beds:
                      params.get("beds") === String(b.value)
                        ? null
                        : String(b.value),
                  })
                }
              >
                {b.label}
              </Chip>
            ))}
          </div>
          <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-muted">
            Bathrooms (min)
          </p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((n) => (
              <Chip
                key={n}
                active={params.get("baths") === String(n)}
                onClick={() =>
                  apply({
                    baths: params.get("baths") === String(n) ? null : String(n),
                  })
                }
              >
                {n}+
              </Chip>
            ))}
          </div>
        </Section>
      )}

      <Section title="Area (sq ft)">
        <div className="grid grid-cols-2 gap-2">
          <Select
            aria-label="Minimum area"
            value={minArea}
            onChange={(e) => {
              setMinArea(e.target.value);
              apply({ minArea: e.target.value || null });
            }}
          >
            <option value="">Min</option>
            {AREA_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a.toLocaleString("en-US")}
              </option>
            ))}
          </Select>
          <Select
            aria-label="Maximum area"
            value={maxArea}
            onChange={(e) => {
              setMaxArea(e.target.value);
              apply({ maxArea: e.target.value || null });
            }}
          >
            <option value="">Max</option>
            {AREA_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a.toLocaleString("en-US")}
              </option>
            ))}
          </Select>
        </div>
      </Section>

      <Section title="Furnishing" defaultOpen={false}>
        {FURNISHING_OPTIONS.map((o) => (
          <Check
            key={o.value}
            label={o.label}
            checked={csv("furnishing").includes(o.value)}
            onChange={() =>
              apply({
                furnishing: toggleCsv(params.get("furnishing"), o.value),
              })
            }
          />
        ))}
      </Section>

      <Section title="Possession" defaultOpen={false}>
        {POSSESSION_OPTIONS.map((o) => (
          <Check
            key={o.value}
            label={o.label}
            checked={csv("possession").includes(o.value)}
            onChange={() =>
              apply({
                possession: toggleCsv(params.get("possession"), o.value),
              })
            }
          />
        ))}
      </Section>

      {showCommercial && category === "commercial" && (
        <Section title="Commercial">
          <Check
            label="Main road facing"
            checked={params.get("mainRoad") === "1"}
            onChange={() =>
              apply({ mainRoad: params.get("mainRoad") === "1" ? null : "1" })
            }
          />
          <Check
            label="Corner property"
            checked={params.get("corner") === "1"}
            onChange={() =>
              apply({ corner: params.get("corner") === "1" ? null : "1" })
            }
          />
        </Section>
      )}

      <Section title="Amenities" defaultOpen={false}>
        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 lg:grid-cols-1">
          {AMENITIES.map((a) => (
            <Check
              key={a.id}
              label={a.label}
              checked={csv("amenities").includes(a.id)}
              onChange={() =>
                apply({ amenities: toggleCsv(params.get("amenities"), a.id) })
              }
            />
          ))}
        </div>
      </Section>
    </div>
  );

  function clearAll() {
    const keep = new URLSearchParams();
    const sort = params.get("sort");
    const view = params.get("view");
    if (sort) keep.set("sort", sort);
    if (view) keep.set("view", view);
    startTransition(() =>
      router.replace(withQuery(pathname, keep), { scroll: false }),
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-white px-4 text-sm font-semibold hover:border-ink lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters
      </button>

      <aside
        aria-label="Filters"
        className={cn(
          open ? "fixed inset-0 z-[70] flex flex-col bg-paper" : "hidden",
          "lg:sticky lg:top-24 lg:z-auto lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-4",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:hidden">
          <h2 className="text-xl">Filters</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
            className="rounded-md p-1.5 hover:bg-sand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="hidden items-center justify-between pb-2 lg:flex">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wide">
            Filters
          </h2>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-medium text-emerald hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-5 lg:overflow-visible lg:px-0">
          {panel}
        </div>
        <div className="flex gap-3 border-t border-line bg-paper p-4 lg:hidden">
          <button
            type="button"
            onClick={clearAll}
            className="h-12 flex-1 rounded-md border border-line text-sm font-semibold"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="h-12 flex-[2] rounded-md bg-ink text-sm font-semibold text-paper"
          >
            Show {total} {total === 1 ? "property" : "properties"}
          </button>
        </div>
      </aside>
    </>
  );
}
