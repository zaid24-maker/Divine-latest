"use client";

import { Share2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export function ShareButton({ title, path }) {
  const { toast } = useToast();

  async function share() {
    const url = new URL(path, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast("Link copied to clipboard.");
    } catch (error) {
      // The user dismissing the native share sheet is not an error worth surfacing.
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast(
        "Could not share this property. Copy the address bar link instead.",
        "error",
      );
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-white px-4 text-sm font-semibold hover:border-ink"
    >
      <Share2 className="h-4 w-4" aria-hidden />
      Share
    </button>
  );
}
