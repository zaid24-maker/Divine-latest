import Link from "next/link";
import {
  BarChart3,
  Camera,
  Eye,
  Gauge,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

const COPY = {
  any: {
    eyebrow: "For owners, agents & developers",
    title: "List your property on Divine Bricks",
    sub: "Reach serious buyers and tenants looking for their next property.",
    cta: "Start Listing",
    href: "/list-property/new",
  },
  sale: {
    eyebrow: "Sell with confidence",
    title: "Sell your property to serious buyers",
    sub: "Publish a polished listing in minutes and manage every enquiry from one dashboard.",
    cta: "Start Listing",
    href: "/list-property/new?purpose=sale",
  },
  rent: {
    eyebrow: "Rent out faster",
    title: "Find a reliable tenant for your property",
    sub: "Residential or commercial, get verified enquiries from people ready to move.",
    cta: "Start Listing",
    href: "/list-property/new?purpose=rent",
  },
};

const BENEFITS = [
  {
    icon: Eye,
    title: "Visibility",
    text: "Your listing appears in search, map view, area pages and similar-property suggestions.",
  },
  {
    icon: ShieldCheck,
    title: "Trust badges",
    text: "Verified, licensed and owner-listed badges help buyers choose you with confidence.",
  },
  {
    icon: MessageSquare,
    title: "Leads in one inbox",
    text: "Calls, WhatsApp and enquiries arrive in your dashboard with the property attached.",
  },
  {
    icon: BarChart3,
    title: "Performance insight",
    text: "See views and leads for every listing so you know when to adjust the price or photos.",
  },
];

const STEPS = [
  {
    icon: Camera,
    title: "Add details & photos",
    text: "Tell us about the property, set a price and upload photos.",
  },
  {
    icon: Gauge,
    title: "We review it",
    text: "Our team checks every listing, usually within one business day.",
  },
  {
    icon: MessageSquare,
    title: "Receive enquiries",
    text: "Respond to buyers and tenants from your dashboard.",
  },
];

export function ListLanding({ mode = "any" }) {
  const c = COPY[mode];
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow !text-gold">{c.eyebrow}</p>
            <h1 className="mt-3 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              {c.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-paper/75">{c.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={c.href}
                className={buttonStyles({ variant: "gold", size: "lg" })}
              >
                {c.cta}
              </Link>
              <Link
                href="/agents"
                className={buttonStyles({
                  variant: "light",
                  size: "lg",
                  className:
                    "bg-transparent text-paper ring-1 ring-paper/30 hover:bg-paper/10 hover:text-paper",
                })}
              >
                Talk to an agent
              </Link>
            </div>
            <p className="mt-4 text-sm text-paper/55">
              Free for your first listing. No card needed.
            </p>
          </div>
          <ol className="space-y-5 rounded-lg border border-paper/15 bg-paper/5 p-6">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-gold">
                    Step {i + 1}
                  </p>
                  <p className="font-display text-xl">{title}</p>
                  <p className="text-sm text-paper/65">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <h2 className="max-w-xl text-3xl sm:text-4xl">
          Everything you need to close the deal
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon className="h-7 w-7 text-emerald" aria-hidden />
              <h3 className="mt-4 font-sans text-base font-semibold">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {text}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-14 text-center">
          <Link
            href={c.href}
            className={buttonStyles({ variant: "primary", size: "lg" })}
          >
            {c.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
