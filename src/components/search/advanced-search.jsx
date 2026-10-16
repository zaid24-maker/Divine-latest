import { Search } from "lucide-react";
import { Field, Select } from "@/components/ui/form";
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
import { CITIES } from "@/data/locations";
import { getCurrencyFor, getSelectedCountry } from "@/lib/country";

/** Server-rendered GET form: works without JavaScript and produces the same URLs as the filters. */
export async function AdvancedSearch() {
  const country = await getSelectedCountry();
  const currency = getCurrencyFor(country);
  const cities = CITIES.filter((c) => c.country === country);
  const saleLadder = priceLadder(currency, "sale");
  const priceOptions = [
    ...saleLadder,
    ...priceLadder(currency, "rent").filter(
      (p) => p.value < saleLadder[0].value,
    ),
  ];
  return (
    <form action="/properties" method="get" className="space-y-10">
      <fieldset className="grid gap-4 md:grid-cols-4">
        <legend className="mb-4 font-display text-2xl">
          What are you looking for?
        </legend>
        <Field label="Purpose" htmlFor="adv-purpose">
          <Select id="adv-purpose" name="purpose" defaultValue="">
            <option value="">Buy or rent</option>
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
          </Select>
        </Field>
        <Field label="Category" htmlFor="adv-category">
          <Select id="adv-category" name="category" defaultValue="">
            <option value="">Residential &amp; commercial</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </Select>
        </Field>
        <Field label="City" htmlFor="adv-city">
          <Select id="adv-city" name="city" defaultValue="">
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Area or keyword" htmlFor="adv-q">
          <input
            id="adv-q"
            name="q"
            className="field"
            placeholder="e.g. Dubai Marina"
          />
        </Field>
      </fieldset>

      <fieldset>
        <legend className="mb-4 font-display text-2xl">Property type</legend>
        <p className="label">Residential</p>
        <div className="mb-5 flex flex-wrap gap-2">
          {RESIDENTIAL_TYPES.map((t) => (
            <label key={t.value} className="cursor-pointer">
              <input
                type="checkbox"
                name="type"
                value={t.value}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-emerald">
                {t.label}
              </span>
            </label>
          ))}
        </div>
        <p className="label">Commercial</p>
        <div className="flex flex-wrap gap-2">
          {COMMERCIAL_TYPES.map((t) => (
            <label key={t.value} className="cursor-pointer">
              <input
                type="checkbox"
                name="type"
                value={t.value}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-emerald">
                {t.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <legend className="mb-4 font-display text-2xl">
          Budget &amp; size
        </legend>
        <Field label="Min price" htmlFor="adv-min">
          <Select id="adv-min" name="minPrice" defaultValue="">
            <option value="">No min</option>
            {priceOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Max price" htmlFor="adv-max">
          <Select id="adv-max" name="maxPrice" defaultValue="">
            <option value="">No max</option>
            {priceOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Bedrooms" htmlFor="adv-beds">
          <Select id="adv-beds" name="beds" defaultValue="">
            <option value="">Any</option>
            {BED_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Bathrooms (min)" htmlFor="adv-baths">
          <Select id="adv-baths" name="baths" defaultValue="">
            <option value="">Any</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Min area (sq ft)" htmlFor="adv-minarea">
          <Select id="adv-minarea" name="minArea" defaultValue="">
            <option value="">No min</option>
            {AREA_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a.toLocaleString("en-US")}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Max area (sq ft)" htmlFor="adv-maxarea">
          <Select id="adv-maxarea" name="maxArea" defaultValue="">
            <option value="">No max</option>
            {AREA_OPTIONS.map((a) => (
              <option key={a} value={a}>
                {a.toLocaleString("en-US")}
              </option>
            ))}
          </Select>
        </Field>
      </fieldset>

      <div className="grid gap-10 md:grid-cols-3">
        <fieldset>
          <legend className="mb-3 font-display text-2xl">Furnishing</legend>
          {FURNISHING_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="flex items-center gap-2.5 py-1.5 text-sm"
            >
              <input
                type="checkbox"
                name="furnishing"
                value={o.value}
                className="h-4 w-4 accent-emerald"
              />{" "}
              {o.label}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend className="mb-3 font-display text-2xl">Possession</legend>
          {POSSESSION_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="flex items-center gap-2.5 py-1.5 text-sm"
            >
              <input
                type="checkbox"
                name="possession"
                value={o.value}
                className="h-4 w-4 accent-emerald"
              />{" "}
              {o.label}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend className="mb-3 font-display text-2xl">Amenities</legend>
          <div className="grid grid-cols-2 gap-x-3">
            {AMENITIES.map((a) => (
              <label
                key={a.id}
                className="flex items-center gap-2.5 py-1.5 text-sm"
              >
                <input
                  type="checkbox"
                  name="amenities"
                  value={a.id}
                  className="h-4 w-4 accent-emerald"
                />{" "}
                {a.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-2 rounded-md bg-emerald px-8 font-semibold text-white hover:bg-emerald-dark"
        >
          <Search className="h-5 w-5" aria-hidden /> Show results
        </button>
        <button
          type="reset"
          className="h-12 rounded-md px-5 text-sm font-semibold text-muted hover:text-ink"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
