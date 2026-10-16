"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { LocationSearch } from "./location-search";
import { Select } from "@/components/ui/form";
import {
  COMMERCIAL_TYPES,
  RESIDENTIAL_TYPES,
  priceLadder,
} from "@/data/constants";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
  { id: "commercial", label: "Commercial" },
];

/** Hero search. Builds the same URL contract the /properties page reads. */
export function SearchBar({ className, currency }) {
  const router = useRouter();
  const [tab, setTab] = useState("buy");
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [commercialPurpose, setCommercialPurpose] = useState("rent");

  const commercial = tab === "commercial";
  const purpose = commercial
    ? commercialPurpose
    : tab === "buy"
      ? "sale"
      : "rent";
  const prices = priceLadder(currency, purpose);
  const types = commercial ? COMMERCIAL_TYPES : RESIDENTIAL_TYPES;

  function switchTab(next) {
    setTab(next);
    setType("");
    setMinPrice("");
    setMaxPrice("");
    setBeds("");
  }

  function onSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams({ purpose });
    params.set("category", commercial ? "commercial" : "residential");
    if (q.trim()) params.set("q", q.trim());
    if (type) params.set("type", type);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (beds && !commercial) params.set("beds", beds);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label="Search type"
        className="inline-flex rounded-t-lg bg-paper/95 p-1 shadow-soft backdrop-blur"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            onClick={() => switchTab(t.id)}
            className={cn(
              "h-10 rounded-md px-5 text-sm font-semibold transition-colors sm:px-7",
              tab === t.id ? "bg-ink text-paper" : "text-ink hover:bg-sand",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={onSubmit}
        role="search"
        aria-label="Search properties"
        className="rounded-b-lg rounded-tr-lg bg-paper p-4 shadow-lift sm:p-5"
      >
        <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <LocationSearch
            value={q}
            onChange={setQ}
            className="lg:col-span-1"
            inputClassName="h-12"
          />

          <div>
            <label htmlFor="hero-type" className="sr-only">
              Property type
            </label>
            <Select
              id="hero-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-12"
            >
              <option value="">Property type</option>
              {types.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="hero-min" className="sr-only">
                Minimum price
              </label>
              <Select
                id="hero-min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="h-12"
              >
                <option value="">Min price</option>
                {prices.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="hero-max" className="sr-only">
                Maximum price
              </label>
              <Select
                id="hero-max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="h-12"
              >
                <option value="">Max price</option>
                {prices
                  .filter((p) => !minPrice || p.value > Number(minPrice))
                  .map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
              </Select>
            </div>
          </div>

          {commercial ? (
            <div>
              <label htmlFor="hero-purpose" className="sr-only">
                Sale or lease
              </label>
              <Select
                id="hero-purpose"
                value={commercialPurpose}
                onChange={(e) => {
                  setCommercialPurpose(e.target.value);
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="h-12"
              >
                <option value="rent">For Rent / Lease</option>
                <option value="sale">For Sale</option>
              </Select>
            </div>
          ) : (
            <div>
              <label htmlFor="hero-beds" className="sr-only">
                Bedrooms
              </label>
              <Select
                id="hero-beds"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="h-12"
              >
                <option value="">Bedrooms</option>
                <option value="0">Studio</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </Select>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink hover:text-emerald sm:justify-start"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Advanced Search
          </Link>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald px-8 text-base font-semibold text-white transition-colors hover:bg-emerald-dark"
          >
            <Search className="h-5 w-5" aria-hidden />
            Search Properties
          </button>
        </div>
      </form>
    </div>
  );
}
