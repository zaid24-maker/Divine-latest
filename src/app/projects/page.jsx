import Link from "next/link";
import {
  ProjectCard,
  PROJECT_STATUS_LABEL,
} from "@/components/project/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getProjects } from "@/lib/api";
import { getSelectedCountry } from "@/lib/country";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "New Projects & Developments",
  description:
    "Explore new launches, under-construction and ready projects from licensed developers.",
  path: "/projects",
});

const STATUSES = ["new-launch", "under-construction", "ready"];

export default async function ProjectsPage({ searchParams }) {
  const { status } = await searchParams;
  const active = STATUSES.find((s) => s === status);
  const country = await getSelectedCountry();
  const projects = await getProjects({ status: active }, country);

  const chip = (href, label, on) => (
    <Link
      key={label}
      href={href}
      aria-current={on ? "true" : undefined}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        on
          ? "border-ink bg-ink text-paper"
          : "border-line bg-white hover:border-ink",
      )}
    >
      {label}
    </Link>
  );

  return (
    <div className="container-page py-10 lg:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow mb-2">New projects</p>
        <h1 className="text-4xl leading-tight lg:text-5xl">
          Launches and developments
        </h1>
        <p className="mt-3 text-lg text-muted">
          Compare configurations, payment plans and possession dates before you
          book.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {chip("/projects", "All projects", !active)}
        {STATUSES.map((s) =>
          chip(`/projects?status=${s}`, PROJECT_STATUS_LABEL[s], active === s),
        )}
      </div>

      <div className="mt-10">
        {projects.length ? (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} priority={i < 3} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects in this stage yet"
            description="Check back soon or browse every project."
          />
        )}
      </div>
    </div>
  );
}
