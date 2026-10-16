import Image from "next/image";
import Link from "next/link";
import {
  Building,
  Building2,
  Castle,
  Factory,
  Home,
  LandPlot,
  Landmark,
  Store,
} from "lucide-react";

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=70`;

const CATEGORIES = [
  {
    key: "apartments",
    label: "Apartments",
    icon: Building2,
    href: "/properties?type=apartment,studio,penthouse,duplex",
    image: img("1545324418-cc1a3fa10c00"),
    types: ["apartment", "studio", "penthouse", "duplex"],
  },
  {
    key: "villas",
    label: "Villas",
    icon: Home,
    href: "/properties?type=villa,farmhouse",
    image: img("1564013799919-ab600027ffc6"),
    types: ["villa", "farmhouse"],
  },
  {
    key: "townhouses",
    label: "Townhouses",
    icon: Castle,
    href: "/properties?type=townhouse",
    image: img("1600585154340-be6161a56a0c"),
    types: ["townhouse"],
  },
  {
    key: "land",
    label: "Land",
    icon: LandPlot,
    href: "/properties?type=land,commercial-land",
    image: img("1500382017468-9049fed747ef"),
    types: ["land", "commercial-land"],
  },
  {
    key: "offices",
    label: "Offices",
    icon: Landmark,
    href: "/properties?category=commercial&type=office,business-center,co-working",
    image: img("1497366216548-37526070297c"),
    types: ["office", "business-center", "co-working"],
  },
  {
    key: "shops",
    label: "Shops",
    icon: Store,
    href: "/properties?category=commercial&type=retail-shop,showroom,restaurant",
    image: img("1441986300917-64674bd600d8"),
    types: ["retail-shop", "showroom", "restaurant"],
  },
  {
    key: "warehouses",
    label: "Warehouses",
    icon: Factory,
    href: "/properties?category=commercial&type=warehouse,industrial",
    image: img("1553413077-190dd305871c"),
    types: ["warehouse", "industrial"],
  },
  {
    key: "buildings",
    label: "Commercial Buildings",
    icon: Building,
    href: "/properties?category=commercial&type=commercial-building,hotel",
    image: img("1486406146926-c627a92ad1ab"),
    types: ["commercial-building", "hotel"],
  },
];

export function CategoryCards({ counts }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {CATEGORIES.map((c) => {
        const count = c.types.reduce((sum, t) => sum + (counts[t] ?? 0), 0);
        const Icon = c.icon;
        return (
          <li key={c.key}>
            <Link
              href={c.href}
              className="group relative block aspect-[5/4] overflow-hidden rounded-lg bg-ink sm:aspect-[4/3]"
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <span
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                aria-hidden
              />
              <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/95 text-emerald transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span className="absolute inset-x-4 bottom-3.5 text-paper">
                <span className="block font-display text-xl font-medium leading-tight sm:text-2xl">
                  {c.label}
                </span>
                <span className="mt-0.5 block text-sm text-paper/75">
                  {count} {count === 1 ? "property" : "properties"}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
