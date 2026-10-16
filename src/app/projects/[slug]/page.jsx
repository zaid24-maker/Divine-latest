import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarClock, Layers, MapPin, Ruler } from "lucide-react";
import { MapView } from "@/components/map/map-view";
import { PROJECT_STATUS_LABEL } from "@/components/project/project-card";
import { ProjectActions } from "@/components/project/project-actions";
import { PropertyAmenities } from "@/components/property/property-amenities";
import { PropertyGallery } from "@/components/property/property-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/data/projects";
import { PAYMENT_METHOD_LABEL } from "@/data/constants";
import { getProjectBySlug } from "@/lib/api";
import { formatMonthYear, formatPrice } from "@/lib/format";
import { pageMetadata, projectSchema } from "@/lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) return { title: "Project not found" };
  return pageMetadata({
    title: `${p.name} by ${p.developer.name} in ${p.location.city}`,
    description: `${p.name}: ${p.propertyTypes.join(", ")} from ${formatPrice(p.startingPrice, p.currency)}. Possession ${formatMonthYear(p.possessionDate)}.`,
    path: `/projects/${p.slug}`,
    image: p.images[0].url,
  });
}

function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="mb-5 text-2xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = await getProjectBySlug(slug);
  if (!p) notFound();

  const facts = [
    {
      icon: CalendarClock,
      label: "Possession",
      value: formatMonthYear(p.possessionDate),
    },
    {
      icon: Layers,
      label: "Towers / Units",
      value: `${p.towers || "—"} / ${p.totalUnits}`,
    },
    { icon: Ruler, label: "Project area", value: `${p.acres} acres` },
    { icon: BadgeCheck, label: "License ID", value: p.licenseId },
  ];

  // The map surface expects properties, so describe the project as a single marker.
  const marker = {
    id: p.id,
    slug: p.slug,
    title: p.name,
    price: p.startingPrice,
    currency: p.currency,
    purpose: "sale",
    location: p.location,
    images: p.images,
  };

  return (
    <>
      <JsonLd data={projectSchema(p)} />
      <div className="container-page py-6 lg:py-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/projects" className="hover:text-ink">
                Projects
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {p.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <header className="mb-6">
              <Badge
                tone={
                  p.status === "new-launch"
                    ? "gold"
                    : p.status === "ready"
                      ? "emerald"
                      : "ink"
                }
              >
                {PROJECT_STATUS_LABEL[p.status]}
              </Badge>
              <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
                {p.name}
              </h1>
              <p className="mt-2 text-muted">by {p.developer.name}</p>
              <p className="mt-2 flex items-center gap-1.5 text-ink-soft">
                <MapPin className="h-4 w-4" aria-hidden /> {p.location.locality}
                , {p.location.city}
              </p>
            </header>

            <PropertyGallery images={p.images} title={p.name} />

            <ul className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 lg:grid-cols-4">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label}>
                  <Icon className="mb-2 h-5 w-5 text-gold-dark" aria-hidden />
                  <p className="text-xs uppercase tracking-wide text-muted">
                    {label}
                  </p>
                  <p className="mt-0.5 break-words text-sm font-semibold">
                    {value}
                  </p>
                </li>
              ))}
            </ul>

            <Section id="overview" title="Overview">
              <p className="leading-relaxed text-ink-soft">{p.description}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm">
                    <BadgeCheck
                      className="h-4 w-4 shrink-0 text-emerald"
                      aria-hidden
                    />{" "}
                    {h}
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="price" title="Configuration & price">
              <div className="overflow-x-auto rounded-lg border border-line bg-white">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-sand text-xs uppercase tracking-wide text-muted">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Area
                      </th>
                      <th scope="col" className="px-4 py-3 text-right">
                        Starting price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.configurations.map((c) => (
                      <tr key={c.label} className="border-t border-line">
                        <th scope="row" className="px-4 py-3.5 font-semibold">
                          {c.label}
                        </th>
                        <td className="px-4 py-3.5 text-ink-soft">
                          {c.areaRange}
                        </td>
                        <td className="px-4 py-3.5 text-right font-display text-lg font-semibold">
                          {formatPrice(c.priceFrom, p.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="floor-plans" title="Floor plans">
              <ul className="grid gap-4 sm:grid-cols-3">
                {p.floorPlans.map((f) => (
                  <li
                    key={f.name}
                    className="rounded-lg border border-line bg-white p-4"
                  >
                    <div
                      className="relative mb-3 aspect-[4/3] rounded-md bg-sand"
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 120 90"
                        className="absolute inset-0 h-full w-full p-3 text-ink/40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="6" y="6" width="108" height="78" />
                        <path d="M6 44h50M56 6v38M56 44v40M84 44h30M84 44v40M30 44v18" />
                        <path d="M94 6v14" strokeDasharray="3 3" />
                      </svg>
                    </div>
                    <p className="font-semibold">{f.name}</p>
                    <p className="text-sm text-muted">
                      {f.bedrooms === 0 ? "Studio" : `${f.bedrooms} bedroom`} ·{" "}
                      {f.area.toLocaleString("en-US")} sq ft
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold">
                      {formatPrice(f.price, p.currency)}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="amenities" title="Amenities">
              <PropertyAmenities amenities={p.amenities} />
            </Section>

            <Section id="construction" title="Construction status">
              <div className="rounded-lg border border-line bg-white p-5">
                <div className="mb-2 flex items-baseline justify-between">
                  <p className="text-sm text-muted">
                    {p.status === "ready" ? "Completed" : "Overall progress"}
                  </p>
                  <p className="font-display text-2xl font-semibold">
                    {p.progress}%
                  </p>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={p.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Construction progress"
                  className="h-2.5 overflow-hidden rounded-full bg-sand"
                >
                  <div
                    className="h-full rounded-full bg-emerald"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-muted">
                  Launched {formatMonthYear(p.launchDate)} · Possession{" "}
                  {formatMonthYear(p.possessionDate)}
                </p>
              </div>
            </Section>

            <Section id="payment" title="Payment plan">
              {p.paymentPlan ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        label: "Down payment",
                        value: p.paymentPlan.downPayment,
                      },
                      {
                        label: "During construction",
                        value: p.paymentPlan.duringConstruction,
                      },
                      { label: "On handover", value: p.paymentPlan.onHandover },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-lg border border-line bg-white p-5 text-center"
                      >
                        <p className="font-display text-3xl font-semibold text-emerald">
                          {value}%
                        </p>
                        <p className="mt-1 text-sm font-medium">{label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mb-3 mt-7 text-xs font-semibold uppercase tracking-wide text-muted">
                    Milestone schedule
                  </p>
                  <ol className="space-y-2">
                    {p.paymentPlan.milestones.map((s) => (
                      <li key={s.stage} className="flex items-center gap-4">
                        <span className="w-14 shrink-0 font-display text-xl font-semibold text-emerald">
                          {s.percent}%
                        </span>
                        <span className="flex-1 border-b border-dotted border-line pb-1 text-sm">
                          {s.stage}
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <p className="text-sm text-ink-soft">
                  {p.name} is ready to move in — pay outright or finance the
                  purchase, with no construction-linked instalments.
                </p>
              )}

              <p className="mb-3 mt-7 text-xs font-semibold uppercase tracking-wide text-muted">
                Ways to pay
              </p>
              <ul className="flex flex-wrap gap-2">
                {p.paymentMethods.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-line bg-sand px-4 py-1.5 text-sm font-medium"
                  >
                    {PAYMENT_METHOD_LABEL[m] ?? m}
                  </li>
                ))}
              </ul>

              {p.serviceCharge && (
                <p className="mt-6 rounded-lg bg-sand p-4 text-sm text-ink-soft">
                  Service charge:{" "}
                  <span className="font-semibold text-ink">
                    {p.currency}{" "}
                    {p.serviceCharge.amount.toLocaleString("en-US")} per sq ft
                    per {p.serviceCharge.period}
                  </span>
                  , payable to the owners&rsquo; association.
                </p>
              )}
            </Section>

            <Section id="location" title="Location">
              <MapView
                properties={[marker]}
                interactive={false}
                className="h-72 rounded-lg"
              />
            </Section>

            <Section id="developer" title="About the developer">
              <div className="flex gap-4 rounded-lg border border-line bg-white p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-ink font-display text-lg font-semibold text-gold">
                  {p.developer.initials}
                </span>
                <div>
                  <p className="font-display text-xl font-semibold">
                    {p.developer.name}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {p.developer.description}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Est. {p.developer.established} ·{" "}
                    {p.developer.projectsDelivered} projects delivered
                  </p>
                </div>
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-line bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-wide text-muted">
                Starting from
              </p>
              <p className="font-display text-4xl font-semibold">
                {formatPrice(p.startingPrice, p.currency)}
              </p>
              <p className="mt-1 text-sm text-muted">
                {p.propertyTypes.join(" · ")}
              </p>
              <div className="mt-5">
                <ProjectActions
                  projectId={p.id}
                  projectName={p.name}
                  developer={p.developer.name}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
