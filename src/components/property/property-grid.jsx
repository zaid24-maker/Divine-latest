import { PropertyCard } from "./property-card";
import { cn } from "@/lib/utils";

export function PropertyGrid({ properties, variant = "grid", columns = 3 }) {
  if (variant === "list") {
    return (
      <div className="flex flex-col gap-5">
        {properties.map((p, i) => (
          <PropertyCard
            key={p.id}
            property={p}
            variant="list"
            priority={i < 2}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-10 sm:grid-cols-2",
        columns === 3 && "xl:grid-cols-3",
      )}
    >
      {properties.map((p, i) => (
        <PropertyCard key={p.id} property={p} priority={i < 3} />
      ))}
    </div>
  );
}
