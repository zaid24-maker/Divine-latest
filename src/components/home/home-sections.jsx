import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { AgentCard } from "@/components/agent/agent-card";
import { ProjectCard } from "@/components/project/project-card";
import { buttonStyles } from "@/components/ui/button";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel,
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
        {description && <p className="mt-2 text-muted">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:text-emerald-dark"
        >
          {hrefLabel ?? "View all"}{" "}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}

const TRUST = [
  {
    icon: BadgeCheck,
    title: "Verified listings",
    text: "Photos, ownership and pricing are checked by our team before a property goes live.",
  },
  {
    icon: ShieldCheck,
    title: "Verified professionals",
    text: "Agents carry verified licenses and a profile with real reviews from past clients.",
  },
  {
    icon: FileCheck2,
    title: "Clear paperwork",
    text: "Ask for documents upfront. Listings show the license number where it applies.",
  },
  {
    icon: MessageSquareText,
    title: "Talk directly",
    text: "Call, WhatsApp or request a callback. No middle layers, no hidden fees for seekers.",
  },
];

export function TrustBand() {
  return (
    <section className="bg-sand">
      <div className="container-page grid gap-10 py-16 lg:grid-cols-[1fr_2fr] lg:py-20">
        <div>
          <p className="eyebrow mb-2">Why Divine Bricks</p>
          <h2 className="text-3xl leading-tight sm:text-4xl">
            A marketplace built on trust, not noise
          </h2>
          <p className="mt-4 text-muted">
            Whether you are buying your first flat or leasing a warehouse, every
            step is designed to be clear and verifiable.
          </p>
        </div>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {TRUST.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-emerald">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-sans text-base font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProjectsStrip({ projects }) {
  return (
    <section className="container-page py-16 lg:py-20">
      <SectionHeading
        eyebrow="New Projects"
        title="Launches and developments to watch"
        description="Pre-launch pricing, payment plans and licensed developers."
        href="/projects"
        hrefLabel="All projects"
      />

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}

export function AreasStrip({ areas }) {
  return (
    <section className="container-page pb-16 lg:pb-20">
      <SectionHeading
        eyebrow="Explore"
        title="Popular places to live and work"
        href="/areas"
        hrefLabel="All locations"
      />
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {areas.map((a, i) => (
          <li key={a.slug} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <Link
              href={`/areas/${a.slug}`}
              className="group relative block h-full min-h-[160px] overflow-hidden rounded-lg bg-ink"
            >
              <Image
                src={a.image}
                alt=""
                fill
                sizes={
                  i === 0
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 50vw"
                }
                className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent"
                aria-hidden
              />
              <span className="absolute inset-x-4 bottom-4 text-paper">
                <span
                  className={`block font-display font-medium ${i === 0 ? "text-3xl" : "text-xl"}`}
                >
                  {a.name}
                </span>
                <span className="text-sm text-paper/75">
                  {a.propertyCount} properties
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ListCta() {
  return (
    <section className="container-page pb-16 lg:pb-20">
      <div className="relative overflow-hidden rounded-xl bg-ink px-6 py-14 text-paper sm:px-12 lg:px-16 lg:py-20">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full border border-gold/20"
          aria-hidden
        />
        <div className="relative max-w-2xl">
          <p className="eyebrow !text-gold">
            For owners, agents &amp; developers
          </p>
          <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
            List your property on Divine Bricks
          </h2>
          <p className="mt-4 text-lg text-paper/75">
            Reach serious buyers and tenants looking for their next property.
            Your first listing is free.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/list-property"
              className={buttonStyles({ variant: "gold", size: "lg" })}
            >
              Start Listing
            </Link>
           <Link
            href="/agents"
            className="inline-flex min-h-12 items-center justify-center rounded-md px-6 text-base font-semibold text-paper ring-1 ring-paper/40 transition-colors hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper"
            >
            Meet our agents
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AgentsStrip({ agents, counts }) {
  return (
    <section className="container-page pb-4">
      <SectionHeading
        eyebrow="Agents"
        title="Work with a real estate expert"
        href="/agents"
        hrefLabel="All agents"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((a) => (
          <AgentCard key={a.id} agent={a} listings={counts[a.id] ?? 0} />
        ))}
      </div>
    </section>
  );
}
