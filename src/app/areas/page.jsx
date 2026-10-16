import Image from "next/image";
import Link from "next/link";
import { getAreas } from "@/lib/api";
import { getSelectedCountry } from "@/lib/country";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Explore Areas & Cities",
  description:
    "Compare average prices, connectivity and available listings across Gulf cities.",
  path: "/areas",
});

export default async function AreasPage() {
  const country = await getSelectedCountry();
  const areas = await getAreas(country);
  return (
    <div className="container-page py-10 lg:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow mb-2">Explore</p>
        <h1 className="text-4xl leading-tight lg:text-5xl">
          Find the right neighbourhood first
        </h1>
        <p className="mt-3 text-lg text-muted">
          City guides with typical prices, connectivity highlights and live
          listings.
        </p>
      </header>
      <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => (
          <li key={a.slug}>
            <Link href={`/areas/${a.slug}`} className="group block">
              <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-ink">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-4 left-4 rounded bg-paper/95 px-2.5 py-1 text-xs font-semibold">
                  {a.propertyCount} properties
                </span>
              </span>
              <span className="mt-4 block font-display text-2xl font-semibold group-hover:text-emerald">
                {a.name}
              </span>
              <span className="mt-1 block text-sm text-muted">{a.tagline}</span>
              <span className="mt-2 block text-sm text-ink-soft">
                Avg. {a.avgPriceSqft}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
