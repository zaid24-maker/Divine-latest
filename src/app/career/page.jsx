import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Clock,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Careers | Divine Bricks",
  description:
    "Join Divine Bricks — build the future of real estate across the GCC. Explore open roles in sales, marketing, technology, and operations.",
};

const PERKS = [
  {
    title: "Growth & Learning",
    description:
      "Continuous training, mentorship, and clear career paths across sales, tech, and operations.",
  },
  {
    title: "Competitive Pay",
    description:
      "Market-leading salaries, performance bonuses, and commission structures for sales roles.",
  },
  {
    title: "Health & Wellbeing",
    description:
      "Comprehensive medical insurance and wellness support for you and your family.",
  },
  {
    title: "Modern Workplace",
    description:
      "Work from our Downtown Dubai office with a collaborative, tech-first culture.",
  },
];

const OPEN_ROLES = [
  {
    title: "Senior Property Consultant",
    department: "Sales",
    location: "Dubai, UAE",
    type: "Full-time",
  },
  {
    title: "Off-Plan Sales Specialist",
    department: "Sales",
    location: "Dubai, UAE",
    type: "Full-time",
  },
  {
    title: "Listing Coordinator",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Full-time",
  },
  {
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Dubai, UAE",
    type: "Full-time",
  },
  {
    title: "Full-Stack Developer",
    department: "Technology",
    location: "Dubai / Remote",
    type: "Full-time",
  },
  {
    title: "HR & Talent Acquisition",
    department: "People",
    location: "Dubai, UAE",
    type: "Full-time",
  },
];

export default function CareerPage() {
  return (
    <main className="bg-paper pt-10 lg:pt-14">
      {/* Hero */}
      <section className="py-10 lg:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
              Careers
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-5xl">
              Build the future of real estate with us
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ink/65 lg:text-base">
              At Divine Bricks, we're a team of dreamers and doers reshaping how
              properties are discovered, bought, and sold across the GCC. If
              you're passionate about real estate, technology, or customer
              experience — we'd love to hear from you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#open-roles"
                className="inline-flex items-center gap-2 rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
              >
                View Open Roles
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="mailto:careers@divinebricks.com"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-emerald/40 hover:text-emerald"
              >
                Send Your CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-10 lg:py-16">
        <div className="container-page">
          <header className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold text-ink lg:text-3xl">
              Why work with Divine Bricks
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              We invest in our people, because great teams build great
              companies.
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald/40 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {perk.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/65">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-10 lg:py-16">
        <div className="container-page">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
              Open Positions
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink lg:text-3xl">
              Find your next role
            </h2>
          </header>

          <div className="mx-auto mt-10 max-w-4xl space-y-4">
            {OPEN_ROLES.map((role) => (
              <article
                key={role.title}
                className="group flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:border-emerald/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {role.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink/65">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden />
                      {role.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {role.type}
                    </span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@divinebricks.com?subject=Application for ${encodeURIComponent(
                    role.title,
                  )}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-white p-8 text-center shadow-sm lg:p-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald">
              <Users className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold text-ink lg:text-3xl">
              Don't see the right role?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/65">
              We're always looking for talented people. Send your CV and a
              short note about what you'd love to do — we'll reach out when
              there's a fit.
            </p>
            <a
              href="mailto:careers@divinebricks.com"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
            >
              careers@divinebricks.com
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}