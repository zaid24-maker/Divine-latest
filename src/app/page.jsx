import { CategoryCards } from "@/components/home/category-cards";
import { FeaturedTabs } from "@/components/home/featured-tabs";
import { Hero } from "@/components/home/hero";
import {
  AgentsStrip,
  AreasStrip,
  ListCta,
  ProjectsStrip,
  SectionHeading,
  TrustBand,
} from "@/components/home/home-sections";
import {
  getAgents,
  getAllProperties,
  getAreas,
  getCategoryCounts,
  getFeaturedProperties,
  getProjects,
} from "@/lib/api";
import { pageMetadata } from "@/lib/seo";
import { getCurrencyFor, getSelectedCountry } from "@/lib/country";

export const metadata = pageMetadata({
  title: "Buy, Rent & List Residential and Commercial Property",
  description:
    "Discover apartments, villas, offices, shops and new projects from verified owners and agents. List your property on Divine Bricks.",
  path: "/",
});

export default async function HomePage() {
  const country = await getSelectedCountry();
  const [featured, counts, projects, areas, agents, all] = await Promise.all([
    getFeaturedProperties(country, 12),
    getCategoryCounts(country),
    getProjects({}, country),
    getAreas(country),
    getAgents({}, country),
    getAllProperties(country),
  ]);

  const topAgents = agents.filter((a) => a.verified).slice(0, 4);
  const listingsByAgent = all.reduce((acc, p) => {
    acc[p.agent.id] = (acc[p.agent.id] ?? 0) + 1;
    return acc;
  }, {});
  const topAreas = [...areas]
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, 5);

  return (
    <>
      <Hero
        listingCount={all.length}
        agentCount={agents.filter((a) => a.verified).length}
        currency={getCurrencyFor(country)}
      />

      <section className="container-page py-16 lg:py-20">
        <SectionHeading
          eyebrow="Browse by type"
          title="Explore properties"
          description="Homes, workspaces and land across the GCC."
        />
        <CategoryCards counts={counts} />
      </section>

      <section className="container-page pb-16 lg:pb-20">
        <SectionHeading eyebrow="Handpicked" title="Featured properties" />
        <FeaturedTabs properties={featured} />
      </section>

      <TrustBand />
      <ProjectsStrip projects={projects.slice(0, 3)} />
      <AreasStrip areas={topAreas} />
      <ListCta />
      <AgentsStrip agents={topAgents} counts={listingsByAgent} />
    </>
  );
}