import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { MapView } from "@/components/map/map-view";
import { AgentContactCard } from "@/components/property/contact-agent";
import { ExpandableText } from "@/components/property/expandable-text";
import { FavoriteButton } from "@/components/property/favorite-button";
import { LeadForm } from "@/components/property/lead-form";
import { NearbyPlaces } from "@/components/property/nearby-places";
import { PropertyAmenities } from "@/components/property/property-amenities";
import { getPropertyDetailRows } from "@/components/property/property-details";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyOverviewTabs } from "@/components/property/property-overview-tabs";
import { PropertyGrid } from "@/components/property/property-grid";
import { ShareButton } from "@/components/property/share-button";
import { JsonLd } from "@/components/seo/json-ld";
import { PropertyBadges } from "@/components/ui/badge";
import { PROPERTIES } from "@/data/properties";
import { getPropertyBySlug, getSimilarProperties } from "@/lib/api";
import { formatArea, formatPrice } from "@/lib/format";
import { getNearby } from "@/lib/nearby";
import { pageMetadata, propertySchema, propertySeoTitle } from "@/lib/seo";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) return { title: "Property not found" };
  return pageMetadata({
    title: propertySeoTitle(p),
    description: `${p.title} in ${p.location.locality}, ${p.location.city}. ${formatArea(p.area, p.areaUnit)} · ${formatPrice(p.price, p.currency, p.purpose)}. Contact ${p.agent.name} on Divine Bricks.`,
    path: `/properties/${p.slug}`,
    image: p.images[0].url,
  });
}

export default async function PropertyPage({ params }) {
  const { slug } = await params;
  const p = await getPropertyBySlug(slug);
  if (!p) notFound();

  const similar = await getSimilarProperties(p, 3);
  const nearby = getNearby(p);
  const listPath =
    p.purpose === "sale" ? "/properties/buy" : "/properties/rent";
  const crumbs = [
    { name: "Home", path: "/" },
    { name: p.purpose === "sale" ? "Buy" : "Rent", path: listPath },
    {
      name: p.location.city,
      path: `/properties?city=${p.location.citySlug}&purpose=${p.purpose}`,
    },
    { name: p.title, path: `/properties/${p.slug}` },
  ];
  const price = formatPrice(p.price, p.currency, p.purpose);
  const propertyDetailRows = getPropertyDetailRows(p);
  const wa = `https://wa.me/${p.agent.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in "${p.title}" on Divine Bricks.`)}`;

  return (
    <>
      <JsonLd data={propertySchema(p, crumbs)} />
      <div className="container-page py-6 lg:py-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {i < crumbs.length - 1 ? (
                  <Link href={c.path} className="hover:text-ink">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="line-clamp-1 text-ink">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <header className="mb-6">
              <PropertyBadges property={p} max={6} className="mb-3" />
              <h1 className="text-3xl leading-tight sm:text-4xl">{p.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-muted">
                <MapPin className="h-4 w-4" aria-hidden />
                {p.location.address ??
                  `${p.location.locality}, ${p.location.city}`}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <p className="font-display text-4xl font-semibold tracking-tight">
                  {price}
                </p>
                <div className="flex gap-2">
                  <FavoriteButton propertyId={p.id} variant="outline" />
                  <ShareButton title={p.title} path={`/properties/${p.slug}`} />
                </div>
              </div>
            </header>

            <PropertyGallery
              images={p.images}
              title={p.title}
              hasVideo={Boolean(p.videoUrl)}
              hasTour={Boolean(p.virtualTourUrl)}
            />

            <section aria-label="Property information" className="mt-10">
              <PropertyOverviewTabs
                rows={propertyDetailRows}
                property={{
                  price: p.price,
                  currency: p.currency,
                  purpose: p.purpose,
                  possession: p.possession,
                }}
              />
            </section>

            <section aria-labelledby="about" className="mt-10">
              <h2 id="about" className="mb-4 text-2xl">
                About this property
              </h2>
              <ExpandableText text={p.description} />
            </section>

            <section aria-labelledby="amenities" className="mt-10">
              <h2 id="amenities" className="mb-5 text-2xl">
                Amenities
              </h2>
              <PropertyAmenities amenities={p.amenities} />
            </section>

            <section aria-labelledby="location" className="mt-10">
              <h2 id="location" className="mb-4 text-2xl">
                Location
              </h2>
              <MapView
                properties={[p]}
                selectedId={null}
                interactive={false}
                className="mb-6 h-72 rounded-lg"
              />
              <NearbyPlaces groups={nearby} />
            </section>

            <section aria-labelledby="agent" className="mt-10 lg:hidden">
              <h2 id="agent" className="mb-4 text-2xl">
                Listed by
              </h2>
              <div className="rounded-lg border border-line bg-white p-5">
                <AgentContactCard
                  agent={p.agent}
                  propertyId={p.id}
                  propertyTitle={p.title}
                />
              </div>
            </section>
          </div>

          <aside id="contact" className="hidden lg:block">
            <div className="sticky top-24 space-y-5 rounded-lg border border-line bg-white p-6 shadow-soft">
              <AgentContactCard
                agent={p.agent}
                propertyId={p.id}
                propertyTitle={p.title}
              />
              <div className="border-t border-line pt-5">
                <h2 className="mb-4 font-display text-xl">Send an enquiry</h2>
                <LeadForm
                  agentName={p.agent.name}
                  propertyId={p.id}
                  propertyTitle={p.title}
                />
              </div>
            </div>
          </aside>
        </div>

        <section
          id="enquiry-mobile"
          aria-labelledby="enquiry-mobile-heading"
          className="mt-10 lg:hidden"
        >
          <h2 id="enquiry-mobile-heading" className="mb-4 text-2xl">
            Send an enquiry
          </h2>
          <div className="rounded-lg border border-line bg-white p-5">
            <LeadForm
              agentName={p.agent.name}
              propertyId={p.id}
              propertyTitle={p.title}
            />
          </div>
        </section>

        {similar.length > 0 && (
          <section
            aria-labelledby="similar"
            className="mt-16 border-t border-line pt-12"
          >
            <h2 id="similar" className="mb-8 text-3xl">
              Similar properties
            </h2>
            <PropertyGrid properties={similar} />
          </section>
        )}
      </div>

      {/* Mobile quick-contact bar, sits above the bottom navigation.
      <div className="fixed inset-x-0 bottom-16 z-40 flex gap-2 border-t border-line bg-paper/95 p-3 backdrop-blur lg:hidden">
        <a
          href={`tel:${p.agent.phone.replace(/\s/g, "")}`}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-ink text-sm font-semibold text-paper"
        >
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-emerald text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
        </a>
      </div> */}
    </>
  );
}
