import Image from "next/image";

export const metadata = {
  title: "Our Team | Divine Bricks",
  description:
    "Meet the leadership and team behind Divine Bricks — real estate experts across the GCC.",
};

const TEAM_MEMBERS = [
  {
    name: "Team Member",
    role: "CEO",
    bio: "Leads Divine Bricks with a clear vision and long-term strategy for growth across the GCC real estate market.",
    image: null,
  },
  {
    name: "Team Member",
    role: "Founder",
    bio: "Founded Divine Bricks with a mission to bring transparency, trust, and modern technology to property transactions.",
    image: null,
  },
  {
    name: "Team Member",
    role: "Admin",
    bio: "Oversees daily operations, listings compliance, and platform quality to ensure every property meets our standards.",
    image: null,
  },
  {
    name: "Team Member",
    role: "HR (Human Resources)",
    bio: "Builds and nurtures the Divine Bricks team, focusing on culture, talent development, and employee wellbeing.",
    image: null,
  },
  {
    name: "Team Member",
    role: "Listing Head",
    bio: "Manages the entire listings pipeline and agent network across Dubai, Abu Dhabi, and the wider GCC.",
    image: null,
  },
  {
    name: "Team Member",
    role: "Developer",
    bio: "Leads engineering and product at Divine Bricks, building the technology that powers search, listings, and UX.",
    image: null,
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function TeamCard({ member }) {
  const hasPhoto = Boolean(member.image);

  return (
    <article className="group flex flex-col items-center overflow-hidden rounded-2xl border border-line bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-emerald/40 hover:shadow-lg">
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-emerald/30 bg-emerald/10 transition-colors group-hover:border-emerald/60 group-hover:bg-emerald/15">
        {hasPhoto ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <span className="font-display text-2xl font-semibold text-emerald">
            {getInitials(member.name)}
          </span>
        )}
      </div>

      <h3 className="mt-5 font-display text-base font-semibold text-ink">
        {member.name}
      </h3>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald">
        {member.role}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-ink/65">
        {member.bio}
      </p>
    </article>
  );
}

export default function TeamPage() {
  return (
    <main className="bg-paper pt-10 lg:pt-14">
      <section className="py-4 lg:py-6">
        <div className="container-page">
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
              Our Team
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-ink lg:text-4xl">
              Meet Our Team
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ink/65 lg:text-base">
              The leadership and core team behind Divine Bricks — real estate
              and technology professionals dedicated to elevating your
              property journey across the GCC.
            </p>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((m) => (
              <TeamCard key={m.role} member={m} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}