import Link from "next/link";
import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "./logo";
import { FooterLocaleSelector } from "./footer-locale-selector";
import { SITE } from "@/data/constants";
import { getSelectedCountry } from "@/lib/country";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Projects", href: "/projects" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "https://facebook.com/yourpage",    Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/yourpage",   Icon: Instagram },
  { label: "YouTube",   href: "https://youtube.com/@yourchannel", Icon: Youtube },
  { label: "TikTok",    href: "https://tiktok.com/@yourhandle",   Icon: TikTokIcon },
];

const LINK_CLASS =
  "text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald";

const SOCIAL_CLASS =
  "flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/65 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald";

// lucide-react doesn't ship a TikTok icon, so we inline a simple SVG.
function TikTokIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.5 3a4.5 4.5 0 0 0 3.9 4.36v3.02a7.5 7.5 0 0 1-3.9-1.2v6.32a6.5 6.5 0 1 1-6.5-6.5c.17 0 .34.01.5.02v3.05a3.5 3.5 0 1 0 2.5 3.35V3h3.5Z" />
    </svg>
  );
}

export async function Footer() {
  const country = await getSelectedCountry();
  return (
    <footer className="border-t border-white/10 bg-[#050505] text-white">
      <div className="container-page py-12">
        {/* Grid: Mobile pe 2 cols, Desktop pe 4 cols */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          
          {/* Logo Section: Mobile pe full width, Desktop pe 1 col */}
          <div className="col-span-2 min-w-0 md:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              {SITE.tagline}
            </p>

            {/* Social icons — About Divine Bricks ke neeche */}
            <ul className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={SOCIAL_CLASS}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section: Mobile pe full width, Desktop pe 1 col */}
          <section aria-labelledby="footer-contact-title" className="col-span-2 min-w-0 md:col-span-1">
            <h2
              id="footer-contact-title"
              className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              Contact us
            </h2>
            <address className="mt-4 not-italic">
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-white/65">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-white/70"
                    aria-hidden="true"
                  />
                  <span>{SITE.address}</span>
                </li>
                <li>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                  >
                    <Phone
                      className="h-4 w-4 shrink-0 text-white/70"
                      aria-hidden="true"
                    />
                    <span>{SITE.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                  >
                    <Mail
                      className="h-4 w-4 shrink-0 text-white/70"
                      aria-hidden="true"
                    />
                    <span className="break-all">{SITE.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-white/65">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-white/70"
                    aria-hidden="true"
                  />
                  <span>
                    10AM – 6PM
                    <br />
                    Monday to Friday
                  </span>
                </li>
              </ul>
            </address>
          </section>

          {/* Quick Links: Mobile pe 1 col (half width), Desktop pe 1 col */}
          <nav aria-labelledby="footer-links-title" className="min-w-0">
            <h2
              id="footer-links-title"
              className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              Quick links
            </h2>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={LINK_CLASS}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal: Mobile pe 1 col (half width), Desktop pe 1 col */}
          <nav aria-labelledby="footer-legal-title" className="min-w-0">
            <h2
              id="footer-legal-title"
              className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              Legal
            </h2>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={LINK_CLASS}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Divine Bricks. All rights reserved.
          </p>
          <FooterLocaleSelector country={country} />
        </div>
      </div>
    </footer>
  );
}