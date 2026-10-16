"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { PropertyImage } from "@/components/property/property-image";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { formatPrice } from "@/lib/format";
import { useSavedProperties } from "@/lib/saved-store";

/** Reads saved ids from localStorage and filters the catalogue passed in from the server. */
export function SavedProperties({ catalogue }) {
  const { ids, toggle } = useSavedProperties();
  const { toast } = useToast();
  const saved = catalogue.filter((p) => ids.includes(p.id));

  if (!saved.length) {
    return (
      <EmptyState
        icon={<Heart className="h-6 w-6" aria-hidden />}
        title="No saved properties yet"
        description="Tap the heart on any listing to keep it here for later."
        action={
          <Link
            href="/properties"
            className={buttonStyles({ variant: "dark" })}
          >
            Browse properties
          </Link>
        }
      />
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {saved.map((p) => (
        <li
          key={p.id}
          className="group overflow-hidden rounded-lg border border-line bg-white"
        >
          <Link
            href={`/properties/${p.slug}`}
            className="relative block aspect-[4/3] bg-sand"
            aria-label={`View ${p.title}`}
          >
            <PropertyImage
              src={p.images[0].url}
              alt={p.images[0].alt}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
          <div className="p-4">
            <p className="font-display text-2xl font-semibold">
              {formatPrice(p.price, p.currency, p.purpose)}
            </p>
            <p className="mt-1 truncate text-sm font-semibold">{p.title}</p>
            <p className="truncate text-xs text-muted">
              {p.location.locality}, {p.location.city}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/properties/${p.slug}`}
                className={buttonStyles({
                  variant: "dark",
                  size: "sm",
                  className: "flex-1",
                })}
              >
                View Property
              </Link>
              <button
                type="button"
                onClick={() => {
                  toggle(p.id);
                  toast("Removed from your shortlist.", "info");
                }}
                aria-label={`Remove ${p.title} from saved`}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-red-600 hover:border-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
