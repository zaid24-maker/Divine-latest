import Link from "next/link";
import { Suspense } from "react";
import { PropertyFilters } from "./property-filters";
import { SortView } from "./sort-view";
import { PropertyGrid } from "@/components/property/property-grid";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { searchProperties } from "@/lib/api";
import { CITIES } from "@/data/locations";
import { getCurrencyFor, getSelectedCountry } from "@/lib/country";
import { filtersToParams } from "@/lib/search";
import { describeSearch } from "@/lib/seo";

/**
 * Shared server component behind /properties, /properties/buy, /rent, /residential, /commercial.
 * `lockedPurpose` / `lockedCategory` come from the route; everything else comes from the URL.
 */
export async function PropertiesView({
  filters,
  basePath,
  crumbs,
  lockedPurpose,
  lockedCategory,
  intro,
}) {
  const country = await getSelectedCountry();
  const result = await searchProperties(filters, country);
  const cities = CITIES.filter((c) => c.country === country);
  const { heading } = describeSearch(filters);
  const paginationParams = filtersToParams({ ...filters, page: 1 });
  if (lockedPurpose) paginationParams.delete("purpose");
  if (lockedCategory) paginationParams.delete("category");

  return (
    <div className="container-page pt-24 pb-8 lg:pt-28 lg:pb-10">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {crumbs.map((c, i) => (
            <li key={c.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {c.href ? (
                <Link href={c.href} className="hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl leading-tight lg:text-5xl">{heading}</h1>
        {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Suspense fallback={<div className="skeleton hidden h-96 lg:block" />}>
          <div>
            <PropertyFilters
              lockedPurpose={lockedPurpose}
              lockedCategory={lockedCategory}
              total={result.total}
              currency={getCurrencyFor(country)}
              cities={cities}
            />
          </div>
        </Suspense>

        <section aria-label="Search results" className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-lg">
              <span className="font-display text-2xl font-semibold">
                {result.total.toLocaleString("en-US")}
              </span>{" "}
              <span className="text-muted">
                {result.total === 1 ? "Property" : "Properties"} Found
              </span>
            </p>
            <Suspense fallback={<div className="skeleton h-11 w-64" />}>
              <SortView view={filters.view} />
            </Suspense>
          </div>

          {result.items.length ? (
            <>
              <PropertyGrid
                properties={result.items}
                variant={filters.view === "list" ? "list" : "grid"}
                columns={2}
              />
              <Pagination
                page={result.page}
                pageCount={result.pageCount}
                basePath={basePath}
                params={paginationParams}
              />
            </>
          ) : (
            <EmptyState
              title="No properties match your search"
              description="Try widening your budget, removing a filter or searching another city."
              action={
                <Link
                  href={basePath}
                  className={buttonStyles({ variant: "dark" })}
                >
                  Clear all filters
                </Link>
              }
            />
          )}
        </section>
      </div>
    </div>
  );
}