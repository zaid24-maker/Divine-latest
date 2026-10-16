import { notFound } from "next/navigation";
import { SITE } from "@/data/constants";
import { pageMetadata } from "@/lib/seo";

const DOCS = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      [
        "What we collect",
        "Account details you provide, the properties you list or save, and enquiries you send. We also collect basic usage data to keep the service reliable.",
      ],
      [
        "How we use it",
        "To show you relevant listings, pass your enquiries to the agent or owner you contacted, review listings and prevent misuse. We do not sell personal data.",
      ],
      [
        "Your choices",
        `You can request access, correction or deletion of your data at any time by writing to ${SITE.email}.`,
      ],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    sections: [
      [
        "Using Divine Bricks",
        "Divine Bricks is a marketplace. We connect seekers with owners and agents but are not a party to any property transaction.",
      ],
      [
        "Listings",
        "You must have the right to list a property and provide accurate information. We may remove listings that are misleading, duplicated or unlawful.",
      ],
      [
        "Liability",
        "Please verify documents and registrations independently before paying any money. Listing data is provided by advertisers.",
      ],
    ],
  },
  cookies: {
    title: "Cookie Policy",
    sections: [
      [
        "Essential storage",
        "We store your saved properties and preferences in your browser so the site works as you expect.",
      ],
      [
        "Analytics",
        "With your consent we may measure aggregate usage to improve performance. You can change your choice in your browser settings.",
      ],
    ],
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }) {
  const { doc } = await params;
  const d = DOCS[doc];
  if (!d) return {};
  return pageMetadata({
    title: d.title,
    description: `${d.title} for ${SITE.name}.`,
    path: `/${doc}`,
  });
}

export default async function LegalPage({ params }) {
  const { doc } = await params;
  const d = DOCS[doc];
  if (!d) notFound();
  return (
    <article className="container-page max-w-3xl py-12 lg:py-20">
      <h1 className="text-4xl sm:text-5xl">{d.title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated October 2026</p>
      <div className="mt-10 space-y-8">
        {d.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2 className="text-2xl">{heading}</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
