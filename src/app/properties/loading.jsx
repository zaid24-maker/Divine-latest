import { PropertyGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-page py-10">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="mt-6 h-12 w-2/3 max-w-xl" />
      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <Skeleton className="hidden h-[480px] lg:block" />
        <PropertyGridSkeleton count={6} />
      </div>
    </div>
  );
}
