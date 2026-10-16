"use client";

import { Heart } from "lucide-react";
import { useSavedProperties } from "@/lib/saved-store";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function FavoriteButton({ propertyId, variant = "overlay", className }) {
  const { isSaved, toggle } = useSavedProperties();
  const { toast } = useToast();
  const saved = isSaved(propertyId);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved properties" : "Save property"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const nowSaved = toggle(propertyId);
        toast(
          nowSaved
            ? "Saved to your shortlist."
            : "Removed from your shortlist.",
          "info",
        );
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all active:scale-90",
        variant === "overlay"
          ? "h-9 w-9 rounded-full bg-white/95 shadow-soft hover:bg-white"
          : "h-11 rounded-md border border-line bg-white px-4 text-sm font-semibold hover:border-ink",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-[18px] w-[18px] transition-colors",
          saved ? "fill-red-500 text-red-500" : "text-ink",
        )}
        aria-hidden
      />
      {variant === "outline" && <span>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
