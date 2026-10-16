import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/auth/contact-form";
import { SITE } from "@/data/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Talk to the Divine Bricks team about listings, partnerships or support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_1.1fr] lg:py-20">
      <div>
        <p className="eyebrow mb-2">Contact</p>
        <h1 className="text-4xl leading-tight sm:text-5xl">
          We&rsquo;d love to hear from you
        </h1>
        <p className="mt-4 text-lg text-muted">
          Questions about a listing, an account or a partnership? Send a note
          and we will reply within one business day.
        </p>
        <ul className="mt-8 space-y-4">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-emerald" aria-hidden />{" "}
            {SITE.address}
          </li>
          <li>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 hover:text-emerald"
            >
              <Phone className="h-5 w-5 text-emerald" aria-hidden />{" "}
              {SITE.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 hover:text-emerald"
            >
              <Mail className="h-5 w-5 text-emerald" aria-hidden /> {SITE.email}
            </a>
          </li>
        </ul>
      </div>
      <div className="rounded-lg border border-line bg-white p-6 shadow-soft sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
