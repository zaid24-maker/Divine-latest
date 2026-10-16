import Link from "next/link";
import { Search } from "lucide-react";
import { AgentCard } from "@/components/agent/agent-card";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { Select } from "@/components/ui/form";
import { getAgents, getAllProperties } from "@/lib/api";
import { getSelectedCountry } from "@/lib/country";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Find a Real Estate Expert",
  description:
    "Browse verified agents and brokers by name, company or city. Compare ratings, experience and active listings.",
  path: "/agents",
});

export default async function AgentsPage({ searchParams }) {
  const { q, city } = await searchParams;
  const country = await getSelectedCountry();
  const [agents, all, everyone] = await Promise.all([
    getAgents({ q, city }, country),
    getAllProperties(country),
    getAgents({}, country),
  ]);
  const counts = all.reduce((acc, p) => {
    acc[p.agent.id] = (acc[p.agent.id] ?? 0) + 1;
    return acc;
  }, {});
  const cities = Array.from(new Set(everyone.map((a) => a.city))).sort();

  return (
    <>
      <section className="bg-sand">
        <div className="container-page py-12 lg:py-16">
          <p className="eyebrow mb-2">Agents</p>
          <h1 className="text-4xl leading-tight lg:text-5xl">
            Find a real estate expert
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted">
            Verified professionals with local knowledge, reviews you can read
            and listings you can browse.
          </p>

          <form
            action="/agents"
            method="get"
            role="search"
            className="mt-8 grid gap-3 rounded-lg bg-paper p-3 shadow-soft sm:grid-cols-[1fr_220px_auto]"
          >
            <div className="relative">
              <label htmlFor="agent-q" className="sr-only">
                Agent name, company or location
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                id="agent-q"
                name="q"
                defaultValue={q}
                placeholder="Agent name, company or location"
                className="field h-12 pl-10"
              />
            </div>
            <div>
              <label htmlFor="agent-city" className="sr-only">
                City
              </label>
              <Select
                id="agent-city"
                name="city"
                defaultValue={city ?? ""}
                className="h-12"
              >
                <option value="">All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <button
              type="submit"
              className={buttonStyles({ variant: "dark", size: "lg" })}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="container-page py-12">
        <p className="mb-6 text-sm text-muted">
          {agents.length} {agents.length === 1 ? "agent" : "agents"} found
        </p>
        {agents.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.map((a) => (
              <AgentCard key={a.id} agent={a} listings={counts[a.id] ?? 0} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No agents match that search"
            description="Try a different name or city."
            action={
              <Link
                href="/agents"
                className={buttonStyles({ variant: "dark" })}
              >
                Show all agents
              </Link>
            }
          />
        )}
      </div>
    </>
  );
}
