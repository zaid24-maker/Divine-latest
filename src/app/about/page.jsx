import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { SITE } from "@/data/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Divine Bricks",
  description:
    "Divine Bricks is a modern property marketplace connecting buyers, tenants, owners and agents across residential and commercial real estate.",
  path: "/about",
});

const VALUES = [
  {
    title: "Verified first",
    text: "We review listings and professionals so that what you see is what you get.",
  },
  {
    title: "Clear by design",
    text: "Straightforward search, honest pricing and no maze of upsells for seekers.",
  },
  {
    title: "Built for every property",
    text: "From a studio flat to a warehouse, residential and commercial deserve equal care.",
  },
];

const APPROACH = [
  {
    title: "1. Understand the need",
    text: "We listen carefully to budgets, lifestyle goals, property use cases and local realities before matching people with opportunities.",
  },
  {
    title: "2. Match with intention",
    text: "Our platform brings together listings, agents and neighbourhood insight so buyers, renters and investors can compare with confidence.",
  },
  {
    title: "3. Support the journey",
    text: "From first enquiry to final signature, we make the process smoother with clarity, communication and a human touch.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-12 lg:py-20">
      <header className="max-w-4xl">
        <p className="eyebrow mb-2">About us</p>
        <h1 className="text-4xl leading-tight sm:text-6xl">
          A property marketplace that feels like it was made for people
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted">
          {SITE.tagline}
        </p>
      </header>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
            Our story
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl">
            Real estate should feel less transactional and more thoughtful.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Divine Bricks was built to bring clarity to a market that is often crowded,
            complex and overwhelming. We believe a property decision is about far more
            than square footage or price—it is about lifestyle, trust, future plans and
            peace of mind.
          </p>
          <p className="mt-5 text-lg leading-8 text-muted">
            That is why we created a platform that helps people discover the right
            spaces, connect with trusted experts and move forward with confidence. From
            first-time buyers to established investors and landlords, we want every
            interaction to feel informed, straightforward and genuinely helpful.
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-soft p-6 sm:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
            What drives us
          </p>
          <ul className="mt-6 space-y-5 text-base text-muted">
            <li className="border-b border-line pb-4 last:border-b-0 last:pb-0">
              <span className="font-semibold text-foreground">Honest guidance.</span> We value
              straightforward advice over pressure and jargon.
            </li>
            <li className="border-b border-line pb-4 last:border-b-0 last:pb-0">
              <span className="font-semibold text-foreground">Better matching.</span> We connect the
              right person with the right opportunity, not just the fastest listing.
            </li>
            <li className="border-b border-line pb-4 last:border-b-0 last:pb-0">
              <span className="font-semibold text-foreground">Human service.</span> The experience should
              feel personal, respectful and genuinely supportive.
            </li>
          </ul>
        </div>
      </section>

      <ul className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
        {VALUES.map((v) => (
          <li key={v.title}>
            <h2 className="text-2xl">{v.title}</h2>
            <p className="mt-2 text-muted">{v.text}</p>
          </li>
        ))}
      </ul>

      <section className="mt-20">
        <p className="eyebrow">How we work</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {APPROACH.map((item) => (
            <article key={item.title} className="rounded-3xl border border-line p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-line bg-soft p-8 sm:p-10">
        <p className="eyebrow">Why it matters</p>
        <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl">
          The right property can change how people live, work and grow.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Whether someone is buying a family home, expanding a portfolio, finding a
          place to rent or selling a valuable asset, the process should feel empowering.
          We work to make every step more transparent, more efficient and more aligned
          with the real goals of the people behind the search.
        </p>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href="/properties"
          className={buttonStyles({ variant: "dark", size: "lg" })}
        >
          Browse properties
        </Link>
        <Link
          href="/contact"
          className={buttonStyles({ variant: "outline", size: "lg" })}
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
