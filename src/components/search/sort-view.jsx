"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { LayoutGrid, List, Map as MapIcon } from "lucide-react";
import { Select } from "@/components/ui/form";
import { SORT_OPTIONS } from "@/data/constants";
import { updateParams, withQuery } from "@/lib/query";
import { cn } from "@/lib/utils";

export function SortView({ view }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const go = (updates, keepPage = false) =>
    startTransition(() =>
      router.replace(
        withQuery(pathname, updateParams(params, updates, { keepPage })),
        { scroll: false },
      ),
    );

  const mapParams = new URLSearchParams(params.toString());
  mapParams.delete("page");
  mapParams.delete("view");
  mapParams.delete("sort");

  const btn =
    "flex h-11 items-center gap-2 px-3.5 text-sm font-medium transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-[180px]">
        <label htmlFor="sort" className="sr-only">
          Sort by
        </label>
        <Select
          id="sort"
          value={params.get("sort") ?? "relevance"}
          onChange={(e) =>
            go({ sort: e.target.value === "relevance" ? null : e.target.value })
          }
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              Sort: {o.label}
            </option>
          ))}
        </Select>
      </div>

      <div
        role="group"
        aria-label="View"
        className="inline-flex overflow-hidden rounded-md border border-line bg-white"
      >
        <button
          type="button"
          onClick={() => go({ view: "list" })}
          aria-pressed={view === "list"}
          className={cn(
            btn,
            view === "list" ? "bg-ink text-paper" : "hover:bg-sand",
          )}
        >
          <List className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">List</span>
        </button>
        <button
          type="button"
          onClick={() => go({ view: null })}
          aria-pressed={view === "grid"}
          className={cn(
            btn,
            "border-x border-line",
            view === "grid" ? "bg-ink text-paper" : "hover:bg-sand",
          )}
        >
          <LayoutGrid className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Grid</span>
        </button>
        <button
          type="button"
          onClick={() => router.push(withQuery("/map-search", mapParams))}
          className={cn(btn, "hover:bg-sand")}
        >
          <MapIcon className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Map</span>
        </button>
      </div>
    </div>
  );
}
