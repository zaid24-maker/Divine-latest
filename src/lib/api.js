/* Mock data service.
 *
 * Every function is async and returns plain serialisable data, so each one can be swapped
 * for a REST or GraphQL call (`fetch(`${API_URL}/properties?...`)`) without touching any
 * page or component. Keep the signatures stable and the UI will not need to change. */

import { AGENTS } from "@/data/agents";
import { AREAS } from "@/data/areas";
import { PROPERTIES } from "@/data/properties";
import { PROJECTS } from "@/data/projects";
import { CITIES } from "@/data/locations";
import { applyFilters, PAGE_SIZE, sortProperties } from "./search";

/* City slug / display name -> owning country, so every query can be scoped to
 * the market chosen with the locale selector. */
const CITY_COUNTRY = Object.fromEntries(CITIES.map((c) => [c.slug, c.country]));
const CITY_NAME_COUNTRY = Object.fromEntries(
  CITIES.map((c) => [c.name.toLowerCase(), c.country]),
);

export async function searchProperties(filters, country, pageSize = PAGE_SIZE) {
  const pool = country
    ? PROPERTIES.filter((p) => p.location.country === country)
    : PROPERTIES;
  const sorted = sortProperties(
    applyFilters(pool, filters),
    filters.sort,
  );
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(filters.page, pageCount);
  return {
    items: sorted.slice((page - 1) * pageSize, page * pageSize),
    total,
    page,
    pageCount,
    pageSize,
  };
}

export async function getAllProperties(country) {
  return PROPERTIES.filter(
    (p) =>
      p.status === "active" &&
      (!country || p.location.country === country),
  );
}

export async function getFeaturedProperties(country, limit = 12) {
  return sortProperties(
    PROPERTIES.filter(
      (p) =>
        p.status === "active" &&
        p.featured &&
        (!country || p.location.country === country),
    ),
    "relevance",
  ).slice(0, limit);
}

export async function getPropertyBySlug(slug) {
  return PROPERTIES.find((p) => p.slug === slug);
}

export async function getPropertiesByIds(ids) {
  return PROPERTIES.filter((p) => ids.includes(p.id));
}

export async function getSimilarProperties(property, limit = 3) {
  return PROPERTIES.filter(
    (p) =>
      p.id !== property.id &&
      p.status === "active" &&
      p.location.country === property.location.country &&
      p.category === property.category &&
      p.purpose === property.purpose,
  )
    .sort(
      (a, b) =>
        Number(b.location.citySlug === property.location.citySlug) -
        Number(a.location.citySlug === property.location.citySlug),
    )
    .slice(0, limit);
}

export async function getPropertiesByAgent(agentId) {
  return PROPERTIES.filter(
    (p) => p.agent.id === agentId && p.status === "active",
  );
}

export async function getCategoryCounts(country) {
  const counts = {};
  for (const p of PROPERTIES) {
    if (p.status !== "active") continue;
    if (country && p.location.country !== country) continue;
    counts[p.propertyType] = (counts[p.propertyType] ?? 0) + 1;
  }
  return counts;
}

export async function getPropertyCount(purpose, category, country) {
  return PROPERTIES.filter(
    (p) =>
      p.status === "active" &&
      (!purpose || p.purpose === purpose) &&
      (!category || p.category === category) &&
      (!country || p.location.country === country),
  ).length;
}

export async function getProjects(filter = {}, country) {
  return PROJECTS.filter(
    (p) =>
      (!filter.status || p.status === filter.status) &&
      (!filter.city || p.location.citySlug === filter.city) &&
      (!country || CITY_COUNTRY[p.location.citySlug] === country),
  );
}

export async function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

export async function getAgents(filter = {}, country) {
  const q = filter.q?.toLowerCase().trim();
  return AGENTS.filter((a) => {
    if (country && CITY_NAME_COUNTRY[a.city.toLowerCase()] !== country)
      return false;
    if (filter.city && a.city.toLowerCase() !== filter.city.toLowerCase())
      return false;
    if (!q) return true;
    return `${a.name} ${a.company} ${a.city} ${a.specialization.join(" ")}`
      .toLowerCase()
      .includes(q);
  });
}

export async function getAgentBySlug(slug) {
  return AGENTS.find((a) => a.slug === slug);
}

export async function getAreas(country) {
  return AREAS.filter((a) => !country || a.country === country).map((a) => ({
    ...a,
    propertyCount: PROPERTIES.filter(
      (p) =>
        p.status === "active" &&
        p.location.citySlug === a.slug &&
        (!country || p.location.country === country),
    ).length,
  }));
}

export async function getAreaBySlug(slug) {
  return (await getAreas()).find((a) => a.slug === slug);
}

/* ---------------- Dashboard (signed-in user) ---------------- */

const MY_STATUSES = [
  "active",
  "active",
  "pending",
  "paused",
  "active",
  "rejected",
];

/** Listings owned by the demo user. Replace with `GET /me/listings`. */
export async function getMyListings() {
  return PROPERTIES.slice(0, MY_STATUSES.length).map((property, i) => ({
    property,
    status: MY_STATUSES[i],
  }));
}
