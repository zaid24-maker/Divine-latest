import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { withQuery } from "@/lib/query";

function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

export function Pagination({ page, pageCount, basePath, params }) {
  if (pageCount <= 1) return null;

  const href = (p) => {
    const next = new URLSearchParams(params.toString());
    if (p > 1) next.set("page", String(p));
    else next.delete("page");
    return withQuery(basePath, next);
  };

  const base =
    "flex h-10 min-w-10 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors";

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex flex-wrap items-center justify-center gap-1.5"
    >
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          className={cn(base, "border border-line hover:border-ink")}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : null}
      {pageList(page, pageCount).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-muted" aria-hidden>
            …
          </span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              base,
              p === page
                ? "bg-ink text-paper"
                : "border border-line hover:border-ink",
            )}
          >
            {p}
          </Link>
        ),
      )}
      {page < pageCount ? (
        <Link
          href={href(page + 1)}
          className={cn(base, "border border-line hover:border-ink")}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : null}
    </nav>
  );
}
