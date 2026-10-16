import { cookies } from "next/headers";
import {
  COUNTRY_COOKIE,
  COUNTRY_CURRENCY,
  CURRENCIES,
  DEFAULT_COUNTRY,
  GULF_MARKETS,
} from "@/data/constants";

export { COUNTRY_COOKIE };

export function isValidCountry(name) {
  return GULF_MARKETS.some((m) => m.name === name);
}

export function getCountryByCode(code) {
  return GULF_MARKETS.find((m) => m.code === code);
}

/**
 * Read the country the visitor selected in the footer. Invalid or missing
 * cookies fall back to the UAE. Calling this opts the route into dynamic
 * rendering, which is what makes the whole page re-render on switch.
 */
export async function getSelectedCountry() {
  const store = await cookies();
  const value = store.get(COUNTRY_COOKIE)?.value;
  return value && isValidCountry(value) ? value : DEFAULT_COUNTRY;
}

/** ISO currency code for a country name, e.g. "Saudi Arabia" -> "SAR". */
export function getCurrencyFor(country) {
  return COUNTRY_CURRENCY[country] ?? CURRENCIES.AED.code;
}
