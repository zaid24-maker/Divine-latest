import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PropertyGrid } from "@/components/property/property-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { AREAS } from "@/data/areas";
import { getAreaBySlug, searchProperties } from "@/lib/api";
import { DEFAULT_FILTER } from "@/lib/search";
import { areaSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await getAreaBySlug(slug);
  if (!a) return { title: "Area not found" };
  return pageMetadata({
    title: `Properties for Sale & Rent in ${a.name}`,
    description: `${a.tagline}. Average price ${a.avgPriceSqft}. Browse ${a.propertyCount} live listings in ${a.name}.`,
    path: `/areas/${a.slug}`,
    image: a.image,
  });
}

export default async function AreaPage({ params }) {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) notFound();

  const [sale, rent] = await Promise.all([
    searchProperties(
      { ...DEFAULT_FILTER, city: area.slug, purpose: "sale" },
      undefined,
      6,
    ),
    searchProperties(
      { ...DEFAULT_FILTER, city: area.slug, purpose: "rent" },
      undefined,
      6,
    ),
  ]);

  return (
    <>
      <JsonLd data={areaSchema(area)} />
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <Image
          src={area.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-50"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="container-page py-20 lg:py-28">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-paper/70">
            <Link href="/areas" className="hover:text-paper">
              Areas
            </Link>{" "}
            / <span className="text-paper">{area.name}</span>
          </nav>
          <h1 className="text-5xl leading-tight lg:text-7xl">{area.name}</h1>
          <p className="mt-3 max-w-xl text-xl text-paper/80">{area.tagline}</p>
        </div>
      </section>

      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="mb-3 text-2xl">About {area.name}</h2>
            <p className="leading-relaxed text-ink-soft">{area.description}</p>
          </div>
          <aside className="rounded-lg bg-sand p-6">
            <p className="text-xs uppercase tracking-wide text-muted">
              Typical price
            </p>
            <p className="font-display text-3xl font-semibold">
              {area.avgPriceSqft}
            </p>
            <ul className="mt-4 space-y-2">
              {area.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
                    aria-hidden
                  />{" "}
                  {h}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section aria-labelledby="sale" className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="sale" className="text-3xl">
              For sale in {area.name}
            </h2>
            <Link
              href={`/properties?city=${area.slug}&purpose=sale`}
              className="text-sm font-semibold text-emerald hover:underline"
            >
              View all →
            </Link>
          </div>
          {sale.items.length ? (
            <PropertyGrid properties={sale.items} />
          ) : (
            <EmptyState title={`No homes for sale in ${area.name} yet`} />
          )}
        </section>

        <section aria-labelledby="rent" className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="rent" className="text-3xl">
              For rent in {area.name}
            </h2>
            <Link
              href={`/properties?city=${area.slug}&purpose=rent`}
              className="text-sm font-semibold text-emerald hover:underline"
            >
              View all →
            </Link>
          </div>
          {rent.items.length ? (
            <PropertyGrid properties={rent.items} />
          ) : (
            <EmptyState title={`No rentals in ${area.name} yet`} />
          )}
        </section>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href={`/map-search?city=${area.slug}`}
            className={buttonStyles({ variant: "dark" })}
          >
            Open map search
          </Link>
          <Link
            href="/list-property"
            className={buttonStyles({ variant: "outline" })}
          >
            List a property here
          </Link>
        </div>
      </div>
    </>
  );
}
