import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return <div aria-hidden className={cn("skeleton", className)} />;
}

export function PropertyCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/3] w-full rounded-lg" />
      <Skeleton className="mt-3 h-6 w-1/2" />
      <Skeleton className="mt-2 h-4 w-4/5" />
      <Skeleton className="mt-2 h-4 w-2/3" />
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }) {
  return (
    <div
      className="grid gap-x-6 gap-y-9 sm:grid-cols-2 xl:grid-cols-3"
      role="status"
      aria-label="Loading properties"
    >
      {Array.from({ length: count }, (_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
