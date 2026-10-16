import { MapSearch } from "@/components/map/map-search";
import { CITIES } from "@/data/locations";
import { searchProperties } from "@/lib/api";
import { getSelectedCountry } from "@/lib/country";
import { parseFilters } from "@/lib/search";
import { describeSearch, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Map Search",
  description:
    "Explore properties on an interactive map with price markers. Draw an area to narrow results.",
  path: "/map-search",
});

export default async function MapSearchPage({ searchParams }) {
  const raw = await searchParams;
  const filters = parseFilters(raw);
  const country = await getSelectedCountry();
  // The map needs a bounded region, so default to a city when none is chosen.
  const city = filters.city ?? "dubai";
  const { items } = await searchProperties(
    { ...filters, city, page: 1, sort: "relevance" },
    country,
    60,
  );
  const { heading } = describeSearch({ ...filters, city });

  const hrefFor = (overrides) => {
    const p = new URLSearchParams();
    const merged = {
      purpose: filters.purpose,
      category: filters.category,
      city,
      ...overrides,
    };
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
    return `/map-search?${p.toString()}`;
  };

  return (
    <MapSearch
      properties={items}
      heading={heading}
      purposeChips={[
        {
          label: "All",
          href: hrefFor({ purpose: undefined }),
          active: !filters.purpose,
        },
        {
          label: "Buy",
          href: hrefFor({ purpose: "sale" }),
          active: filters.purpose === "sale",
        },
        {
          label: "Rent",
          href: hrefFor({ purpose: "rent" }),
          active: filters.purpose === "rent",
        },
      ]}
      cityChips={CITIES.filter((c) => c.country === country).map((c) => ({
        label: c.name,
        href: hrefFor({ city: c.slug }),
        active: c.slug === city,
      }))}
    />
  );
}
