import Link from "next/link";
import { notFound } from "next/navigation";
import { Globe, MapPin, ShieldCheck, Star } from "lucide-react";
import { AgentAvatar } from "@/components/agent/agent-avatar";
import { AgentContactCard } from "@/components/property/contact-agent";
import { LeadForm } from "@/components/property/lead-form";
import { PropertyGrid } from "@/components/property/property-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { EmptyState } from "@/components/ui/empty-state";
import { VerifiedMark } from "@/components/ui/badge";
import { AGENTS } from "@/data/agents";
import { getAgentBySlug, getPropertiesByAgent } from "@/lib/api";
import { agentSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await getAgentBySlug(slug);
  if (!a) return { title: "Agent not found" };
  return pageMetadata({
    title: `${a.name}, ${a.company} in ${a.city}`,
    description: `${a.name} has ${a.experienceYears} years of experience in ${a.city}. ${a.specialization.join(", ")}. Rated ${a.rating}/5.`,
    path: `/agents/${a.slug}`,
  });
}

export default async function AgentPage({ params }) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  if (!agent) notFound();
  const listings = await getPropertiesByAgent(agent.id);

  return (
    <>
      <JsonLd data={agentSchema(agent)} />
      <div className="container-page py-8 lg:py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/agents" className="hover:text-ink">
                Agents
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">
              {agent.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <AgentAvatar name={agent.name} size="xl" />
              <div>
                <h1 className="text-4xl leading-tight">{agent.name}</h1>
                <p className="mt-1 text-lg text-muted">{agent.company}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  {agent.verified && <VerifiedMark label="Verified Agent" />}
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />{" "}
                    {agent.rating.toFixed(1)} ({agent.reviewCount} reviews)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-ink-soft">
                    <MapPin className="h-4 w-4" aria-hidden /> {agent.city}
                  </span>
                </div>
              </div>
            </header>

            <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  Experience
                </dt>
                <dd className="font-display text-2xl font-semibold">
                  {agent.experienceYears} yrs
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  Active listings
                </dt>
                <dd className="font-display text-2xl font-semibold">
                  {listings.length}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  Reviews
                </dt>
                <dd className="font-display text-2xl font-semibold">
                  {agent.reviewCount}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">
                  Rating
                </dt>
                <dd className="font-display text-2xl font-semibold">
                  {agent.rating.toFixed(1)}
                </dd>
              </div>
            </dl>

            <section aria-labelledby="about" className="mt-10">
              <h2 id="about" className="mb-3 text-2xl">
                About {agent.name.split(" ")[0]}
              </h2>
              <p className="leading-relaxed text-ink-soft">{agent.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {agent.specialization.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-sand px-3.5 py-1.5 text-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-center gap-2 text-sm text-ink-soft">
                <Globe className="h-4 w-4 text-muted" aria-hidden /> Speaks{" "}
                {agent.languages.join(", ")}
              </p>
              {agent.licenseNumber && (
                <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                  <ShieldCheck className="h-4 w-4 text-muted" aria-hidden />{" "}
                  License {agent.licenseNumber}
                </p>
              )}
            </section>

            <section aria-labelledby="listings" className="mt-12">
              <h2 id="listings" className="mb-6 text-2xl">
                Properties listed by {agent.name.split(" ")[0]}
              </h2>
              {listings.length ? (
                <PropertyGrid properties={listings} columns={2} />
              ) : (
                <EmptyState
                  title="No active listings"
                  description="This agent has no live properties right now."
                />
              )}
            </section>
          </div>

          <aside id="contact" className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-5 rounded-lg border border-line bg-white p-6 shadow-soft">
              <AgentContactCard agent={agent} />
              <div className="border-t border-line pt-5">
                <h2 className="mb-4 font-display text-xl">Send a message</h2>
                <LeadForm agentName={agent.name} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
