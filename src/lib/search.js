import {
  AMENITIES,
  FURNISHING_OPTIONS,
  POSSESSION_OPTIONS,
  VALID_TYPES,
} from "@/data/constants";

export const PAGE_SIZE = 12;

const SORTS = ["relevance", "newest", "price-asc", "price-desc"];
const VIEWS = ["grid", "list", "map"];
const AMENITY_IDS = new Set(AMENITIES.map((a) => a.id));
const FURNISHING_IDS = new Set(FURNISHING_OPTIONS.map((o) => o.value));
const POSSESSION_IDS = new Set(POSSESSION_OPTIONS.map((o) => o.value));

const first = (value) => (Array.isArray(value) ? value[0] : value);

/** Accepts `a,b` and repeated `a=1&a=2` forms. */
function list(value) {
  const parts = Array.isArray(value) ? value : value ? [value] : [];
  return parts
    .flatMap((p) => p.split(","))
    .map((p) => p.trim())
    .filter(Boolean);
}

function num(value) {
  const raw = first(value);
  if (raw === undefined || raw.trim() === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export const DEFAULT_FILTER = {
  types: [],
  furnishing: [],
  possession: [],
  amenities: [],
  sort: "relevance",
  page: 1,
  view: "grid",
};

/** URL search params -> typed filter. Unknown / invalid values are ignored. `preset` always wins. */
export function parseFilters(raw, preset = {}) {
  const purpose = first(raw.purpose);
  const category = first(raw.category);
  const sort = first(raw.sort);
  const view = first(raw.view);
  const q = first(raw.q)?.trim();
  const city = first(raw.city)?.trim().toLowerCase();

  const parsed = {
    purpose: purpose === "sale" || purpose === "rent" ? purpose : undefined,
    category:
      category === "residential" || category === "commercial"
        ? category
        : undefined,
    types: list(raw.type).filter((t) => VALID_TYPES.has(t)),
    q: q || undefined,
    city: city || undefined,
    minPrice: num(raw.minPrice),
    maxPrice: num(raw.maxPrice),
    beds: num(raw.beds),
    baths: num(raw.baths),
    minArea: num(raw.minArea),
    maxArea: num(raw.maxArea),
    furnishing: list(raw.furnishing).filter((f) => FURNISHING_IDS.has(f)),
    possession: list(raw.possession).filter((p) => POSSESSION_IDS.has(p)),
    amenities: list(raw.amenities).filter((a) => AMENITY_IDS.has(a)),
    mainRoad: first(raw.mainRoad) === "1" ? true : undefined,
    corner: first(raw.corner) === "1" ? true : undefined,
    sort: SORTS.includes(sort) ? sort : "relevance",
    page: Math.max(1, Math.floor(num(raw.page) ?? 1)),
    view: VIEWS.includes(view) ? view : "grid",
  };

  return { ...parsed, ...preset };
}

/** Typed filter -> URL params (defaults are omitted so URLs stay clean and shareable). */
export function filtersToParams(f) {
  const p = new URLSearchParams();
  if (f.purpose) p.set("purpose", f.purpose);
  if (f.category) p.set("category", f.category);
  if (f.types.length) p.set("type", f.types.join(","));
  if (f.q) p.set("q", f.q);
  if (f.city) p.set("city", f.city);
  if (f.minPrice !== undefined) p.set("minPrice", String(f.minPrice));
  if (f.maxPrice !== undefined) p.set("maxPrice", String(f.maxPrice));
  if (f.beds !== undefined) p.set("beds", String(f.beds));
  if (f.baths !== undefined) p.set("baths", String(f.baths));
  if (f.minArea !== undefined) p.set("minArea", String(f.minArea));
  if (f.maxArea !== undefined) p.set("maxArea", String(f.maxArea));
  if (f.furnishing.length) p.set("furnishing", f.furnishing.join(","));
  if (f.possession.length) p.set("possession", f.possession.join(","));
  if (f.amenities.length) p.set("amenities", f.amenities.join(","));
  if (f.mainRoad) p.set("mainRoad", "1");
  if (f.corner) p.set("corner", "1");
  if (f.sort !== "relevance") p.set("sort", f.sort);
  if (f.view !== "grid") p.set("view", f.view);
  if (f.page > 1) p.set("page", String(f.page));
  return p;
}

export function applyFilters(properties, f) {
  const tokens = f.q
    ? f.q
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(Boolean)
    : [];

  return properties.filter((p) => {
    if (p.status !== "active") return false;
    if (f.purpose && p.purpose !== f.purpose) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.types.length && !f.types.includes(p.propertyType)) return false;
    if (f.city && p.location.citySlug !== f.city) return false;

    if (tokens.length) {
      const haystack =
        `${p.title} ${p.location.city} ${p.location.locality} ${p.location.state} ${p.propertyType}`.toLowerCase();
      if (!tokens.every((t) => haystack.includes(t))) return false;
    }

    // Every market has exactly one currency, so bounds compare against the
    // listing's own price without conversion.
    if (f.minPrice !== undefined && p.price < f.minPrice) return false;
    if (f.maxPrice !== undefined && p.price > f.maxPrice) return false;
    if (f.minArea !== undefined && p.area < f.minArea) return false;
    if (f.maxArea !== undefined && p.area > f.maxArea) return false;

    if (f.beds !== undefined) {
      if (p.category !== "residential" || p.propertyType === "land")
        return false;
      if (f.beds >= 5 ? p.bedrooms < 5 : p.bedrooms !== f.beds) return false;
    }
    if (f.baths !== undefined) {
      if (p.category !== "residential" || p.bathrooms < f.baths) return false;
    }

    if (f.furnishing.length && !f.furnishing.includes(p.furnishing))
      return false;
    if (f.possession.length && !f.possession.includes(p.possession))
      return false;
    if (
      f.amenities.length &&
      !f.amenities.every((a) => p.amenities.includes(a))
    )
      return false;

    if (f.mainRoad && !(p.category === "commercial" && p.mainRoad))
      return false;
    if (f.corner && !(p.category === "commercial" && p.cornerProperty))
      return false;

    return true;
  });
}

function relevanceScore(p) {
  return (p.featured ? 4 : 0) + (p.premium ? 2 : 0) + (p.verified ? 1 : 0);
}

export function sortProperties(properties, sort) {
  const copy = [...properties];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy.sort(
        (a, b) =>
          relevanceScore(b) - relevanceScore(a) ||
          b.listedAt.localeCompare(a.listedAt),
      );
  }
}

/** Count of active filters, used for the "Filters (3)" badge. */
export function activeFilterCount(f) {
  return [
    f.types.length > 0,
    f.q !== undefined,
    f.city !== undefined,
    f.minPrice !== undefined || f.maxPrice !== undefined,
    f.beds !== undefined,
    f.baths !== undefined,
    f.minArea !== undefined || f.maxArea !== undefined,
    f.furnishing.length > 0,
    f.possession.length > 0,
    f.amenities.length > 0,
    f.mainRoad === true,
    f.corner === true,
  ].filter(Boolean).length;
}
