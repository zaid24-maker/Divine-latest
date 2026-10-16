import { CURRENCIES } from "@/data/constants";

const trim = (n) => Number(n.toFixed(2)).toString();

const symbolFor = (currency) => CURRENCIES[currency]?.symbol ?? "$";

function compact(n) {
  if (n >= 1e6) return `${trim(n / 1e6)}M`;
  if (n >= 1e3) return `${trim(n / 1e3)}K`;
  return n.toLocaleString("en-US");
}

export function formatPrice(price, currency, purpose = "sale") {
  const symbol = symbolFor(currency);
  if (purpose === "rent") return `${symbol}${price.toLocaleString("en-US")}/mo`;
  return `${symbol}${compact(price)}`;
}

/** Short label used on map markers, e.g. $3.95M, £1.85M, ¥185M, CHF 2.45M, $2.85K/mo. */
export function formatPriceCompact(price, currency, purpose = "sale") {
  const symbol = symbolFor(currency);
  if (purpose === "rent") {
    return price >= 1000
      ? `${symbol}${trim(price / 1000)}K/mo`
      : `${symbol}${price}/mo`;
  }
  return `${symbol}${compact(price)}`;
}

/** Unabridged price with grouping, e.g. $3,950,000 or AED 2,450,000/mo. */
export function formatPriceFull(price, currency, purpose = "sale") {
  const suffix = purpose === "rent" ? "/mo" : "";
  return `${symbolFor(currency)}${price.toLocaleString("en-US")}${suffix}`;
}

export function formatArea(area, unit) {
  return `${area.toLocaleString("en-US")} ${unit === "sqft" ? "sq ft" : unit === "sqm" ? "sq m" : "sq yd"}`;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatMonthYear(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatNumber(value) {
  return value.toLocaleString("en-US");
}
