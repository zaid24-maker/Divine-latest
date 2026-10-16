"use client";

import { Building2, Check, Home, KeyRound, Tag } from "lucide-react";
import {
  AMENITIES,
  COMMERCIAL_TYPES,
  COUNTRIES,
  COUNTRY_CURRENCY,
  FURNISHING_OPTIONS,
  POSSESSION_OPTIONS,
  PROPERTY_TYPE_LABEL,
  RESIDENTIAL_TYPES,
} from "@/data/constants";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { AMENITY_ICONS } from "@/components/property/property-amenities";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ImageUploader } from "./image-uploader";

function ChoiceCard({ selected, onClick, icon, title, text }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col items-start gap-3 rounded-lg border-2 p-6 text-left transition-all",
        selected
          ? "border-emerald bg-emerald-light"
          : "border-line bg-white hover:border-ink",
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          selected ? "bg-emerald text-white" : "bg-sand text-ink",
        )}
      >
        {icon}
      </span>
      <span className="font-display text-2xl font-medium">{title}</span>
      <span className="text-sm text-muted">{text}</span>
      {selected && (
        <Check
          className="absolute right-4 top-4 h-5 w-5 text-emerald"
          aria-hidden
        />
      )}
    </button>
  );
}

const ErrorLine = ({ text }) =>
  text ? (
    <p role="alert" className="mt-3 text-sm font-medium text-red-600">
      {text}
    </p>
  ) : null;

export function PurposeStep({ draft, errors, update }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ChoiceCard
          selected={draft.purpose === "sale"}
          onClick={() => update({ purpose: "sale" })}
          icon={<Tag className="h-5 w-5" />}
          title="Sell"
          text="Find a buyer for your property."
        />
        <ChoiceCard
          selected={draft.purpose === "rent"}
          onClick={() => update({ purpose: "rent" })}
          icon={<KeyRound className="h-5 w-5" />}
          title="Rent out"
          text="Find a tenant or lessee."
        />
      </div>
      <ErrorLine text={errors.purpose} />
    </div>
  );
}

export function CategoryStep({ draft, errors, update }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ChoiceCard
          selected={draft.category === "residential"}
          onClick={() =>
            update({ category: "residential", propertyType: undefined })
          }
          icon={<Home className="h-5 w-5" />}
          title="Residential"
          text="Apartments, villas, townhouses, land and more."
        />
        <ChoiceCard
          selected={draft.category === "commercial"}
          onClick={() =>
            update({ category: "commercial", propertyType: undefined })
          }
          icon={<Building2 className="h-5 w-5" />}
          title="Commercial"
          text="Offices, shops, warehouses, hotels and more."
        />
      </div>
      <ErrorLine text={errors.category} />
    </div>
  );
}

export function TypeStep({ draft, errors, update }) {
  const types =
    draft.category === "commercial" ? COMMERCIAL_TYPES : RESIDENTIAL_TYPES;
  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {types.map((t) => (
          <button
            key={t.value}
            type="button"
            aria-pressed={draft.propertyType === t.value}
            onClick={() => update({ propertyType: t.value })}
            className={cn(
              "rounded-full border-2 px-5 py-2.5 text-sm font-medium transition-colors",
              draft.propertyType === t.value
                ? "border-emerald bg-emerald text-white"
                : "border-line bg-white hover:border-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ErrorLine text={errors.propertyType} />
    </div>
  );
}

export function LocationStep({ draft, errors, update }) {
  function placePin(e) {
    const box = e.currentTarget.getBoundingClientRect();
    update({
      pin: {
        x: ((e.clientX - box.left) / box.width) * 100,
        y: ((e.clientY - box.top) / box.height) * 100,
      },
    });
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Country" htmlFor="loc-country" error={errors.country}>
        <Select
          id="loc-country"
          value={draft.country}
          onChange={(e) => update({ country: e.target.value })}
          invalid={!!errors.country}
        >
          {COUNTRIES.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </Select>
      </Field>
      <Field label="State" htmlFor="loc-state" error={errors.state}>
        <Input
          id="loc-state"
          value={draft.state}
          onChange={(e) => update({ state: e.target.value })}
          invalid={!!errors.state}
          placeholder="e.g. New York"
          autoComplete="address-level1"
        />
      </Field>
      <Field label="City" htmlFor="loc-city" error={errors.city}>
        <Input
          id="loc-city"
          value={draft.city}
          onChange={(e) => update({ city: e.target.value })}
          invalid={!!errors.city}
          placeholder="e.g. London"
          autoComplete="address-level2"
        />
      </Field>
      <Field label="Locality" htmlFor="loc-locality" error={errors.locality}>
        <Input
          id="loc-locality"
          value={draft.locality}
          onChange={(e) => update({ locality: e.target.value })}
          invalid={!!errors.locality}
          placeholder="e.g. Tribeca"
        />
      </Field>
      <Field
        label="Full address"
        htmlFor="loc-address"
        error={errors.address}
        className="sm:col-span-2"
      >
        <Input
          id="loc-address"
          value={draft.address}
          onChange={(e) => update({ address: e.target.value })}
          invalid={!!errors.address}
          placeholder="Building, street, landmark"
          autoComplete="street-address"
        />
      </Field>
      <div className="sm:col-span-2">
        <p className="label">Pin the location on the map (optional)</p>
        <button
          type="button"
          onClick={placePin}
          aria-label="Map. Click to drop a pin at the property location"
          className="relative block h-56 w-full cursor-crosshair overflow-hidden rounded-lg border border-line bg-[#eaefe8]"
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 62 C 18 55, 30 70, 52 60 S 86 48, 100 56 L100 100 L0 100 Z"
              fill="#d6e6e4"
            />
            <g stroke="#fff" strokeWidth="1.3" fill="none">
              <path d="M0 30 L100 38 M0 74 L100 80 M22 0 L30 100 M70 0 L62 100" />
            </g>
          </svg>
          {draft.pin ? (
            <span
              className="absolute h-6 w-6 -translate-x-1/2 -translate-y-full"
              style={{ left: `${draft.pin.x}%`, top: `${draft.pin.y}%` }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-emerald"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
            </span>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-sm text-muted">
              Click anywhere to drop a pin
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export function DetailsStep({ draft, errors, update }) {
  const land =
    draft.propertyType === "land" || draft.propertyType === "commercial-land";
  const residential =
    draft.category === "residential" && draft.propertyType !== "land";
  const currency = COUNTRY_CURRENCY[draft.country]?.code ?? "USD";
  const symbol = COUNTRY_CURRENCY[draft.country]?.symbol ?? "$";
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {residential && (
        <>
          <Field label="Bedrooms" htmlFor="d-beds" error={errors.bedrooms}>
            <Select
              id="d-beds"
              value={draft.bedrooms}
              onChange={(e) => update({ bedrooms: e.target.value })}
              invalid={!!errors.bedrooms}
            >
              <option value="">Select</option>
              <option value="0">Studio</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                  {n === 6 ? "+" : ""}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Bathrooms" htmlFor="d-baths" error={errors.bathrooms}>
            <Select
              id="d-baths"
              value={draft.bathrooms}
              onChange={(e) => update({ bathrooms: e.target.value })}
              invalid={!!errors.bathrooms}
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                  {n === 6 ? "+" : ""}
                </option>
              ))}
            </Select>
          </Field>
        </>
      )}
      <Field label="Built-up area (sq ft)" htmlFor="d-area" error={errors.area}>
        <Input
          id="d-area"
          type="number"
          inputMode="numeric"
          min={1}
          value={draft.area}
          onChange={(e) => update({ area: e.target.value })}
          invalid={!!errors.area}
          placeholder="1850"
        />
      </Field>
      <Field
        label={
          draft.purpose === "rent"
            ? `Monthly rent (${symbol})`
            : `Asking price (${symbol})`
        }
        htmlFor="d-price"
        error={errors.price}
      >
        <Input
          id="d-price"
          type="number"
          inputMode="numeric"
          min={1}
          value={draft.price}
          onChange={(e) => update({ price: e.target.value })}
          invalid={!!errors.price}
          placeholder={draft.purpose === "rent" ? "2850" : "1250000"}
        />
      </Field>
      {!land && (
        <Field
          label="Floor"
          htmlFor="d-floor"
          hint="Leave blank for independent houses"
        >
          <Input
            id="d-floor"
            type="number"
            inputMode="numeric"
            min={0}
            value={draft.floor}
            onChange={(e) => update({ floor: e.target.value })}
            placeholder="7"
          />
        </Field>
      )}
      <Field label="Furnishing" htmlFor="d-furn" error={errors.furnishing}>
        <Select
          id="d-furn"
          value={draft.furnishing ?? ""}
          onChange={(e) => update({ furnishing: e.target.value || undefined })}
          invalid={!!errors.furnishing}
        >
          <option value="">Select</option>
          {FURNISHING_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Possession" htmlFor="d-poss" error={errors.possession}>
        <Select
          id="d-poss"
          value={draft.possession ?? ""}
          onChange={(e) => update({ possession: e.target.value || undefined })}
          invalid={!!errors.possession}
        >
          <option value="">Select</option>
          {POSSESSION_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>
    </div>
  );
}

export function AmenitiesStep({ draft, update }) {
  const toggle = (id) =>
    update({
      amenities: draft.amenities.includes(id)
        ? draft.amenities.filter((a) => a !== id)
        : [...draft.amenities, id],
    });
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {AMENITIES.map((a) => {
        const Icon = AMENITY_ICONS[a.id];
        const on = draft.amenities.includes(a.id);
        return (
          <li key={a.id}>
            <button
              type="button"
              aria-pressed={on}
              onClick={() => toggle(a.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3.5 text-left text-sm font-medium transition-colors",
                on
                  ? "border-emerald bg-emerald-light"
                  : "border-line bg-white hover:border-ink",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  on ? "text-emerald" : "text-muted",
                )}
                aria-hidden
              />
              {a.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function ImagesStep({ draft, errors, update }) {
  return (
    <div>
      <ImageUploader
        images={draft.images}
        onChange={(images) => update({ images })}
      />
      <ErrorLine text={errors.images} />
    </div>
  );
}

export function DescriptionStep({ draft, errors, update }) {
  return (
    <div className="space-y-4">
      <Field
        label="Listing title"
        htmlFor="desc-title"
        error={errors.title}
        hint="e.g. Spacious 3-bedroom with park views near the subway"
      >
        <Input
          id="desc-title"
          value={draft.title}
          maxLength={100}
          onChange={(e) => update({ title: e.target.value })}
          invalid={!!errors.title}
        />
      </Field>
      <Field
        label="Description"
        htmlFor="desc-body"
        error={errors.description}
        hint={`${draft.description.length}/2000 characters`}
      >
        <Textarea
          id="desc-body"
          rows={8}
          maxLength={2000}
          value={draft.description}
          onChange={(e) => update({ description: e.target.value })}
          invalid={!!errors.description}
          placeholder="Describe the layout, light, nearby facilities, what is included in the price…"
        />
      </Field>
    </div>
  );
}

export function ContactStep({ draft, errors, update }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="I am a" htmlFor="c-role" className="sm:col-span-2">
        <Select
          id="c-role"
          value={draft.contactRole}
          onChange={(e) => update({ contactRole: e.target.value })}
        >
          <option value="owner">Owner</option>
          <option value="agent">Agent / Broker</option>
          <option value="builder">Builder / Developer</option>
        </Select>
      </Field>
      <Field label="Full name" htmlFor="c-name" error={errors.contactName}>
        <Input
          id="c-name"
          value={draft.contactName}
          onChange={(e) => update({ contactName: e.target.value })}
          invalid={!!errors.contactName}
          autoComplete="name"
        />
      </Field>
      <Field label="Phone" htmlFor="c-phone" error={errors.contactPhone}>
        <Input
          id="c-phone"
          type="tel"
          value={draft.contactPhone}
          onChange={(e) => update({ contactPhone: e.target.value })}
          invalid={!!errors.contactPhone}
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
        />
      </Field>
      <Field
        label="Email"
        htmlFor="c-email"
        error={errors.contactEmail}
        className="sm:col-span-2"
      >
        <Input
          id="c-email"
          type="email"
          value={draft.contactEmail}
          onChange={(e) => update({ contactEmail: e.target.value })}
          invalid={!!errors.contactEmail}
          autoComplete="email"
        />
      </Field>
    </div>
  );
}

export function PreviewStep({ draft }) {
  const currency = COUNTRY_CURRENCY[draft.country]?.code ?? "USD";
  const price = draft.price
    ? formatPrice(Number(draft.price), currency, draft.purpose ?? "sale")
    : "—";
  const rows = [
    ["Purpose", draft.purpose === "rent" ? "For rent" : "For sale"],
    [
      "Type",
      draft.propertyType
        ? `${draft.category === "commercial" ? "Commercial" : "Residential"} · ${PROPERTY_TYPE_LABEL[draft.propertyType]}`
        : "—",
    ],
    [
      "Location",
      [draft.locality, draft.city, draft.state].filter(Boolean).join(", "),
    ],
    [
      "Area",
      draft.area ? `${Number(draft.area).toLocaleString("en-US")} sq ft` : "—",
    ],
    ...(draft.bedrooms !== ""
      ? [
          [
            "Bedrooms / Baths",
            `${draft.bedrooms === "0" ? "Studio" : draft.bedrooms} / ${draft.bathrooms || "—"}`,
          ],
        ]
      : []),
    [
      "Amenities",
      draft.amenities.length ? `${draft.amenities.length} selected` : "None",
    ],
    ["Contact", `${draft.contactName} · ${draft.contactPhone}`],
  ];
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
      <div>
        {draft.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={draft.images[0].url}
            alt="Cover photo preview"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        ) : (
          <div className="aspect-[4/3] rounded-lg bg-sand" />
        )}
        <p className="mt-2 text-xs text-muted">
          {draft.images.length} photo{draft.images.length === 1 ? "" : "s"}{" "}
          attached
        </p>
      </div>
      <div>
        <p className="font-display text-3xl font-semibold">{price}</p>
        <h3 className="mt-1 font-sans text-lg font-semibold">{draft.title}</h3>
        <dl className="mt-4 divide-y divide-line border-y border-line text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 line-clamp-4 text-sm text-ink-soft">
          {draft.description}
        </p>
      </div>
    </div>
  );
}
