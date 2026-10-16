import {
  FURNISHING_LABEL,
  POSSESSION_LABEL,
  PROPERTY_TYPE_LABEL,
} from "@/data/constants";
import { formatArea, formatDate, formatPrice } from "@/lib/format";

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

export function getPropertyDetailRows(p) {
  return [
    ["Price", formatPrice(p.price, p.currency, p.purpose)],
    ["Property type", PROPERTY_TYPE_LABEL[p.propertyType]],
    ["Purpose", p.purpose === "sale" ? "For sale" : "For rent"],
    ...(p.category === "residential"
      ? [
          ["Bedrooms", p.bedrooms === 0 ? "Studio" : String(p.bedrooms)],
          ["Bathrooms", p.bathrooms ? String(p.bathrooms) : undefined],
        ]
      : [
          ["Washrooms", String(p.washrooms)],
          ["Main road facing", p.mainRoad ? "Yes" : "No"],
          ["Corner property", p.cornerProperty ? "Yes" : "No"],
        ]),
    ["Built-up area", formatArea(p.area, p.areaUnit)],
    ["Carpet area", formatArea(p.carpetArea, p.areaUnit)],
    [
      "Parking",
      p.parking > 0 ? `${p.parking} space${p.parking > 1 ? "s" : ""}` : "None",
    ],
    ["Furnishing", FURNISHING_LABEL[p.furnishing]],
    [
      "Floor",
      p.floor !== undefined
        ? p.floor === 0
          ? "Ground"
          : `${ordinal(p.floor)}${p.totalFloors ? ` of ${p.totalFloors}` : ""}`
        : undefined,
    ],
    [
      "Property age",
      p.ageYears === 0
        ? "New construction"
        : `${p.ageYears} year${p.ageYears > 1 ? "s" : ""}`,
    ],
    ["Possession", POSSESSION_LABEL[p.possession]],
    ["Facing", p.facing],
    ["Listed on", formatDate(p.listedAt)],
    ["Reference", p.id],
  ].filter((row) => Boolean(row[1]));
}

export function PropertyDetails({ rows }) {
  return (
    <dl className="grid gap-x-10 sm:grid-cols-2">
      {rows.map(([term, value]) => (
        <div
          key={term}
          className="flex items-baseline justify-between gap-4 border-b border-line py-3"
        >
          <dt className="text-sm text-muted">{term}</dt>
          <dd className="text-right text-sm font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
