import Link from "next/link";
import { ArrowRight, CalendarClock, MapPin } from "lucide-react";
import { PropertyImage } from "@/components/property/property-image";
import { Badge } from "@/components/ui/badge";
import { formatMonthYear, formatPrice } from "@/lib/format";

export const PROJECT_STATUS_LABEL = {
  "new-launch": "New Launch",
  "under-construction": "Under Construction",
  ready: "Ready to Move",
};

export function ProjectCard({ project, priority = false }) {
  const href = `/projects/${project.slug}`;
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand">
        <Link
          href={href}
          aria-label={`View ${project.name}`}
          className="absolute inset-0 block"
        >
          <PropertyImage
            src={project.images[0].url}
            alt={project.images[0].alt}
            priority={priority}
            className="transition-transform duration-500 group-hover:scale-[1.04]"
          />

          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent"
            aria-hidden
          />
        </Link>
        <Badge
          tone={
            project.status === "new-launch"
              ? "gold"
              : project.status === "ready"
                ? "emerald"
                : "ink"
          }
          className="absolute left-3 top-3"
        >
          {PROJECT_STATUS_LABEL[project.status]}
        </Badge>
        <div className="pointer-events-none absolute inset-x-4 bottom-4 text-white">
          <p className="text-xs uppercase tracking-wider text-white/80">
            Starting from
          </p>
          <p className="font-display text-2xl font-semibold">
            {formatPrice(project.startingPrice, project.currency)}
          </p>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-display text-2xl font-semibold leading-tight">
          <Link href={href} className="hover:text-emerald">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted">by {project.developer.name}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-soft">
          <MapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          {project.location.locality}, {project.location.city}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft">
          <CalendarClock className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          Possession {formatMonthYear(project.possessionDate)}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.propertyTypes.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-2.5 py-0.5 text-xs"
            >
              {t}
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:gap-2.5"
          style={{ transition: "gap .2s" }}
        >
          View Project <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
