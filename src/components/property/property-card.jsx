import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Camera,
  MapPin,
  Ruler,
  Building,
  Car,
} from "lucide-react";
import { PropertyImage } from "./property-image";
import { FavoriteButton } from "./favorite-button";
import { PropertyBadges, VerifiedMark } from "@/components/ui/badge";
import { PROPERTY_TYPE_LABEL } from "@/data/constants";
import { formatArea, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

function Specs({ property, className }) {
  const item = "inline-flex items-center gap-1.5";
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft",
        className,
      )}
    >
      {property.category === "residential" ? (
        <>
          {property.bedrooms > 0 && (
            <li className={item}>
              <BedDouble className="h-4 w-4 text-muted" aria-hidden />
              {property.bedrooms} <span className="sr-only">bedrooms</span>
            </li>
          )}
          {property.bathrooms > 0 && (
            <li className={item}>
              <Bath className="h-4 w-4 text-muted" aria-hidden />
              {property.bathrooms} <span className="sr-only">bathrooms</span>
            </li>
          )}
        </>
      ) : (
        <>
          <li className={item}>
            <Building className="h-4 w-4 text-muted" aria-hidden />
            {PROPERTY_TYPE_LABEL[property.propertyType]}
          </li>
          <li className={item}>
            <Car className="h-4 w-4 text-muted" aria-hidden />
            {property.parking} <span className="sr-only">parking spaces</span>
          </li>
        </>
      )}
      <li className={item}>
        <Ruler className="h-4 w-4 text-muted" aria-hidden />
        {formatArea(property.area, property.areaUnit)}
      </li>
    </ul>
  );
}

export function PropertyCard({
  property,
  variant = "grid",
  priority = false,
  active = false,
}) {
  const href = `/properties/${property.slug}`;
  const price = formatPrice(
    property.price,
    property.currency,
    property.purpose,
  );
  const typeLabel = PROPERTY_TYPE_LABEL[property.propertyType];
  const where = `${property.location.locality}, ${property.location.city}`;

  if (variant === "compact") {
    return (
      <article
        className={cn(
          "group flex gap-3 rounded-lg p-2 transition-colors",
          active ? "bg-emerald-light" : "hover:bg-sand",
        )}
      >
        <Link
          href={href}
          className="relative block h-24 w-28 shrink-0 overflow-hidden rounded-md bg-sand"
          aria-label={property.title}
        >
          <PropertyImage
            src={property.images[0].url}
            alt={property.images[0].alt}
            sizes="112px"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold leading-tight">
            {price}
          </p>
          <Link
            href={href}
            className="mt-0.5 block truncate text-sm font-medium hover:text-emerald"
          >
            {property.title}
          </Link>
          <p className="truncate text-xs text-muted">{where}</p>
          <Specs property={property} className="mt-1 text-xs" />
        </div>
      </article>
    );
  }

  const media = (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-sand",
        variant === "list"
          ? "aspect-[4/3] w-full md:h-full md:min-h-[220px] md:w-[320px] md:shrink-0 md:aspect-auto"
          : "aspect-[4/3]",
      )}
    >
      <Link
        href={href}
        aria-label={`View ${property.title}`}
        className="absolute inset-0 block"
      >
        <PropertyImage
          src={property.images[0].url}
          alt={property.images[0].alt}
          priority={priority}
          sizes={
            variant === "list" ? "(min-width: 768px) 320px, 100vw" : undefined
          }
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent"
          aria-hidden
        />
      </Link>
      <PropertyBadges
        property={property}
        max={3}
        className="absolute left-3 top-3"
      />
      <FavoriteButton
        propertyId={property.id}
        className="absolute right-3 top-3"
      />
      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-xs font-medium text-white">
        <Camera className="h-3.5 w-3.5" aria-hidden />
        {property.images.length}
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 rounded bg-ink/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
        {property.purpose === "sale" ? "For Sale" : "For Rent"}
      </span>
    </div>
  );

  const body = (
    <div
      className={cn(
        variant === "list"
          ? "flex min-w-0 flex-1 flex-col py-1 md:pl-6"
          : "pt-3.5",
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-[26px] font-semibold leading-none tracking-tight">
          {price}
        </p>
        <span className="text-xs font-medium uppercase tracking-wide text-muted">
          {typeLabel}
        </span>
      </div>
      <h3 className="mt-2 font-sans text-base font-semibold leading-snug">
        <Link href={href} className="hover:text-emerald">
          {property.title}
        </Link>
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="truncate">{where}</span>
      </p>
      {variant === "list" && (
        <p className="mt-3 line-clamp-2 hidden text-sm leading-relaxed text-ink-soft md:block">
          {property.description.split("\n\n")[0]}
        </p>
      )}
      <Specs property={property} className="mt-3" />
      <div
        className={cn(
          "mt-4 flex items-center justify-between gap-3 border-t border-line pt-3",
          variant === "list" && "mt-auto",
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-[11px] font-bold">
            {property.agent.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <span className="truncate text-xs text-muted">
            {property.agent.role === "owner" ? "Owner" : property.agent.company}
          </span>
          {property.agent.verified && (
            <VerifiedMark label="" className="shrink-0" />
          )}
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald hover:gap-2 hover:text-emerald-dark"
          style={{ transition: "gap .2s" }}
        >
          View Details <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        "group",
        variant === "list" &&
          "flex flex-col gap-4 rounded-lg border border-line bg-white p-3 transition-shadow hover:shadow-soft md:flex-row",
        variant === "grid" &&
          "transition-transform duration-300 hover:-translate-y-0.5",
      )}
    >
      {media}
      {body}
    </article>
  );
}
