import Link from "next/link";
import { Briefcase, MapPin, Star } from "lucide-react";
import { AgentAvatar } from "./agent-avatar";
import { VerifiedMark } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";

export function AgentCard({ agent, listings }) {
  return (
    <article className="group flex flex-col rounded-lg border border-line bg-white p-5 transition-shadow hover:shadow-soft">
      <div className="flex items-start gap-4">
        <AgentAvatar name={agent.name} size="lg" />
        <div className="min-w-0">
          <h3 className="font-sans text-lg font-semibold leading-tight">
            <Link href={`/agents/${agent.slug}`} className="hover:text-emerald">
              {agent.name}
            </Link>
          </h3>
          <p className="truncate text-sm text-muted">{agent.company}</p>
          {agent.verified && (
            <VerifiedMark label="Verified Agent" className="mt-1" />
          )}
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-3 gap-2 border-y border-line py-4 text-center">
        <li>
          <p className="flex items-center justify-center gap-1 font-display text-xl font-semibold">
            <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />
            {agent.rating.toFixed(1)}
          </p>
          <p className="text-xs text-muted">{agent.reviewCount} reviews</p>
        </li>
        <li>
          <p className="font-display text-xl font-semibold">
            {agent.experienceYears}
          </p>
          <p className="text-xs text-muted">Years exp.</p>
        </li>
        <li>
          <p className="font-display text-xl font-semibold">{listings}</p>
          <p className="text-xs text-muted">Listings</p>
        </li>
      </ul>

      <div className="mt-4 space-y-2 text-sm text-ink-soft">
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          {agent.city}
        </p>
        <p className="flex items-start gap-2">
          <Briefcase
            className="mt-0.5 h-4 w-4 shrink-0 text-muted"
            aria-hidden
          />
          {agent.specialization.join(" · ")}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Link
          href={`/agents/${agent.slug}#contact`}
          className={buttonStyles({ variant: "dark", size: "sm" })}
        >
          Contact Agent
        </Link>
        <Link
          href={`/agents/${agent.slug}`}
          className={buttonStyles({ variant: "outline", size: "sm" })}
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}
