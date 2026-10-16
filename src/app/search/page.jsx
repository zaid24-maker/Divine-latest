import Link from "next/link";
import { AdvancedSearch } from "@/components/search/advanced-search";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Advanced Property Search",
  description:
    "Combine purpose, type, location, budget, bedrooms, amenities and possession to find the right property.",
  path: "/search",
});

const POPULAR = [
  {
    label: "2 Bed apartments in New York",
    href: "/properties?purpose=sale&city=new-york&type=apartment&beds=2",
  },
  {
    label: "Furnished rentals in Singapore",
    href: "/properties?purpose=rent&city=singapore&furnishing=furnished",
  },
  {
    label: "Offices in London",
    href: "/properties?category=commercial&city=london&type=office",
  },
  {
    label: "Villas under $2M",
    href: "/properties?purpose=sale&type=villa&maxPrice=2000000",
  },
  {
    label: "Ready-to-move in Dubai",
    href: "/properties?city=dubai&possession=ready",
  },
  {
    label: "Penthouses in London",
    href: "/properties?purpose=sale&city=london&type=penthouse",
  },
];

export default function SearchPage() {
  return (
    <div className="container-page pt-32 pb-20 lg:pt-40">
      <header className="max-w-2xl">
        <p className="eyebrow mb-2">Advanced search</p>
        <h1 className="text-4xl leading-tight lg:text-5xl">
          Be as specific as you like
        </h1>
        <p className="mt-3 text-lg text-muted">
          Combine any filters below. Your results page keeps them in the address
          bar so you can save or share the search.
        </p>
      </header>

      {/* 
         FIX: 
         1. Moved the <aside> INSIDE the grid but aligned it to the top.
         2. Removed the 'lg:mt-16' so it sits flush with the top of the grid row.
         3. Added 'items-start' to the grid so both columns start at the same top line.
      */}
      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_300px]">
        <AdvancedSearch />
        
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-2xl">Popular searches</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {POPULAR.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="flex items-center justify-between py-3 text-sm hover:text-emerald"
                >
                  {p.label} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/map-search"
            className="mt-6 inline-block text-sm font-semibold text-emerald hover:underline"
          >
            Prefer a map? Open map search →
          </Link>
        </aside>
      </div>
    </div>
  );
}