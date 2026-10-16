import Link from "next/link";
import { Bell, BellOff } from "lucide-react";
import { SAVED_SEARCHES } from "@/data/dashboard";

export const metadata = { title: "Saved Searches" };

export default function SearchesPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow mb-1">Searches</p>
        <h1 className="text-3xl sm:text-4xl">Saved searches</h1>
      </header>
      <ul className="divide-y divide-line rounded-lg border border-line bg-white">
        {SAVED_SEARCHES.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div>
              <Link href={s.href} className="font-semibold hover:text-emerald">
                {s.name}
              </Link>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                {s.alerts ? (
                  <Bell className="h-3.5 w-3.5 text-emerald" aria-hidden />
                ) : (
                  <BellOff className="h-3.5 w-3.5" aria-hidden />
                )}
                {s.alerts ? "Alerts on" : "Alerts off"} · {s.matches} new{" "}
                {s.matches === 1 ? "match" : "matches"}
              </p>
            </div>
            <Link
              href={s.href}
              className="text-sm font-semibold text-emerald hover:underline"
            >
              Run search →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
