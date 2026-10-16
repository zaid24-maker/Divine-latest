import { PROPERTY_TYPE_LABEL, SITE } from "@/data/constants";
import { CITIES } from "@/data/locations";
import { filtersToParams } from "./search";

export const absoluteUrl = (path) =>
  `${SITE.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

export function pageMetadata(opts) {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | ${SITE.name}`,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
      images: opts.image ? [{ url: opts.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} | ${SITE.name}`,
      description: opts.description,
    },
  };
}

export function cityName(slug) {
  return CITIES.find((c) => c.slug === slug)?.name;
}

const plural = (label) =>
  label.endsWith("y")
    ? `${label.slice(0, -1)}ies`
    : label.endsWith("s")
      ? label
      : `${label}s`;

/** "Apartments for Sale in New York" style heading for any filter combination. */
export function describeSearch(f) {
  const typeLabel =
    f.types.length === 1
      ? plural(PROPERTY_TYPE_LABEL[f.types[0]])
      : f.category === "commercial"
        ? "Commercial Properties"
        : f.category === "residential"
          ? "Residential Properties"
          : "Properties";
  const purpose =
    f.purpose === "sale"
      ? " for Sale"
      : f.purpose === "rent"
        ? " for Rent"
        : "";
  const place = cityName(f.city) ?? (f.q ? f.q : undefined);
  const heading = `${typeLabel}${purpose}${place ? ` in ${place}` : ""}`;
  return { heading, short: heading };
}

export function listingMetadata(f, basePath) {
  const { heading } = describeSearch(f);
  const params = filtersToParams({
    ...f,
    page: 1,
    sort: "relevance",
    view: "grid",
  });
  const qs = params.toString();
  return pageMetadata({
    title: heading,
    description: `Browse ${heading.toLowerCase()} on ${SITE.name}. Compare prices, photos, amenities and verified agents, then contact owners directly.`,
    path: qs ? `${basePath}?${qs}` : basePath,
  });
}

export function propertySeoTitle(p) {
  const beds =
    p.category === "residential" && p.bedrooms > 0
      ? `${p.bedrooms} Bedroom `
      : "";
  const intent = p.purpose === "sale" ? "for Sale" : "for Rent";
  return `${beds}${PROPERTY_TYPE_LABEL[p.propertyType]} ${intent} in ${p.location.city}`;
}

function schemaTypeFor(p) {
  if (p.category === "commercial") return "Accommodation";
  if (
    p.propertyType === "apartment" ||
    p.propertyType === "studio" ||
    p.propertyType === "penthouse"
  )
    return "Apartment";
  if (p.propertyType === "land") return "Residence";
  return "House";
}

export function breadcrumbSchema(crumbs) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function propertySchema(p, crumbs) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": schemaTypeFor(p),
        name: p.title,
        description: p.description.split("\n\n")[0],
        url: absoluteUrl(`/properties/${p.slug}`),
        image: p.images.map((i) => i.url),
        address: {
          "@type": "PostalAddress",
          addressLocality: p.location.locality,
          addressRegion: p.location.state,
          addressCountry: p.location.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: p.location.lat,
          longitude: p.location.lng,
        },
        ...(p.category === "residential" && p.bedrooms > 0
          ? { numberOfBedrooms: p.bedrooms }
          : {}),
        ...(p.category === "residential"
          ? { numberOfBathroomsTotal: p.bathrooms }
          : {}),
        floorSize: {
          "@type": "QuantitativeValue",
          value: p.area,
          unitCode: "FTK",
        },
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: p.currency,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(`/properties/${p.slug}`),
          seller: {
            "@type": "RealEstateAgent",
            name: p.agent.name,
            telephone: p.agent.phone,
          },
        },
      },
      breadcrumbSchema(crumbs),
    ],
  };
}

export function agentSchema(a) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: a.name,
    description: a.bio,
    url: absoluteUrl(`/agents/${a.slug}`),
    telephone: a.phone,
    email: a.email,
    areaServed: a.city,
    worksFor: { "@type": "Organization", name: a.company },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: a.rating,
      reviewCount: a.reviewCount,
    },
  };
}

export function projectSchema(p) {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: p.name,
    description: p.description,
    url: absoluteUrl(`/projects/${p.slug}`),
    image: p.images.map((i) => i.url),
    address: {
      "@type": "PostalAddress",
      addressLocality: p.location.locality,
      addressRegion: p.location.state,
      addressCountry: p.location.country,
    },
  };
}

export function areaSchema(a) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        name: a.name,
        description: a.description,
        url: absoluteUrl(`/areas/${a.slug}`),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Areas", path: "/areas" },
        { name: a.name, path: `/areas/${a.slug}` },
      ]),
    ],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: SITE.address,
  };
}
