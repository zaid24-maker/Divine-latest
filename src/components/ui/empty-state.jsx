import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({ title, description, action, icon, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border border-dashed border-line px-6 py-16 text-center",
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sand text-muted">
        {icon ?? <SearchX className="h-6 w-6" aria-hidden />}
      </div>
      <h3 className="text-xl font-medium">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
