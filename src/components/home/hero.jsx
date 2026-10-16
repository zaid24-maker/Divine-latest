import Image from "next/image";
import { ShieldCheck, Users, Building2 } from "lucide-react";
import { SearchBar } from "@/components/search/search-bar";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=75";

export function Hero({ listingCount, agentCount, currency }) {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-ink">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
      </div>

      {/* ✅ Increased top padding so content sits below the transparent fixed header */}
      <div className="container-page pb-16 pt-24 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32">
        <div className="max-w-3xl animate-fade-up text-paper">
          <p className="eyebrow !text-gold">
            Residential · Commercial · New Projects
          </p>
          <h1 className="mt-4 text-[40px] font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
            Find a place you&rsquo;ll love to call{" "}
            <em className="font-normal italic text-gold">home</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-paper/80">
            Discover residential and commercial properties from trusted owners
            and agents.
          </p>
        </div>

        <div className="mt-10 max-w-5xl">
          <SearchBar currency={currency} />
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-paper/85">
          <li className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gold" aria-hidden />
            {listingCount}+ active listings
          </li>
          <li className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gold" aria-hidden />
            {agentCount} verified professionals
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-gold" aria-hidden />
            Every listing reviewed before it goes live
          </li>
        </ul>
      </div>
    </section>
  );
}