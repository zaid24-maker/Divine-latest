import { PropertyGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-page py-10">
      <Skeleton className="mb-8 h-10 w-64" />
      <PropertyGridSkeleton />
    </div>
  );
}
