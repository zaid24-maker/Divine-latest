import Link from "next/link";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { buttonStyles } from "@/components/ui/button";
import { CURRENT_USER, LEADS, VIEWS_LAST_7_DAYS } from "@/data/dashboard";
import { getMyListings } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";

export default async function DashboardPage() {
  const listings = await getMyListings();
  const active = listings.filter((l) => l.status === "active").length;
  const pending = listings.filter((l) => l.status === "pending").length;
  const views = listings.reduce((s, l) => s + l.property.views, 0);
  const leads = listings.reduce((s, l) => s + l.property.leads, 0);
  const peak = Math.max(...VIEWS_LAST_7_DAYS.map((d) => d.views));
  const top = [...listings]
    .sort((a, b) => b.property.views - a.property.views)
    .slice(0, 3);

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Overview</p>
          <h1 className="text-3xl sm:text-4xl">
            Welcome back, {CURRENT_USER.name.split(" ")[0]}
          </h1>
        </div>
        <Link
          href="/dashboard/add"
          className={buttonStyles({ variant: "primary" })}
        >
          Add property
        </Link>
      </header>

      <DashboardStats
        active={active}
        pending={pending}
        views={views}
        leads={leads}
        saved={0}
      />

      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="views-title">
          <h2 id="views-title" className="mb-4 text-xl">
            Views, last 7 days
          </h2>
          <div className="rounded-lg border border-line bg-white p-5">
            <ul className="flex h-44 items-end gap-3" aria-label="Daily views">
              {VIEWS_LAST_7_DAYS.map((d) => (
                <li
                  key={d.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-semibold tabular-nums">
                    {d.views}
                  </span>
                  <span
                    className="w-full rounded-t bg-emerald"
                    style={{
                      height: `${(d.views / peak) * 100}%`,
                      minHeight: 4,
                    }}
                  />
                  <span className="text-xs text-muted">{d.day}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="top-title">
          <h2 id="top-title" className="mb-4 text-xl">
            Top performing
          </h2>
          <ol className="divide-y divide-line rounded-lg border border-line bg-white">
            {top.map(({ property: p, status }) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 p-4"
              >
                <div className="min-w-0">
                  <Link
                    href={`/properties/${p.slug}`}
                    className="block truncate text-sm font-semibold hover:text-emerald"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-muted">
                    {p.views.toLocaleString("en-US")} views · {p.leads} leads ·{" "}
                    {formatPrice(p.price, p.currency, p.purpose)}
                  </p>
                </div>
                <StatusBadge status={status} />
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section aria-labelledby="leads-title">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="leads-title" className="text-xl">
            Recent leads
          </h2>
          <Link
            href="/dashboard/leads"
            className="text-sm font-semibold text-emerald hover:underline"
          >
            View all
          </Link>
        </div>
        <ul className="divide-y divide-line rounded-lg border border-line bg-white">
          {LEADS.slice(0, 3).map((l) => (
            <li
              key={l.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold">{l.name}</p>
                <p className="truncate text-xs text-muted">
                  {l.propertyTitle} · {formatDate(l.createdAt)}
                </p>
              </div>
              <StatusBadge status={l.status} kind="lead" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
