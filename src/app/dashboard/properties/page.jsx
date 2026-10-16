import Link from "next/link";
import { MyPropertiesTable } from "@/components/dashboard/my-properties-table";
import { buttonStyles } from "@/components/ui/button";
import { getMyListings } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/format";

export const metadata = { title: "My Properties" };

export default async function MyPropertiesPage() {
  const listings = await getMyListings();
  const rows = listings.map(({ property: p, status }) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: `${p.location.locality}, ${p.location.city}`,
    price: formatPrice(p.price, p.currency, p.purpose),
    status,
    views: p.views,
    leads: p.leads,
    created: formatDate(p.listedAt),
    image: p.images[0].url,
    imageAlt: p.images[0].alt,
  }));

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Listings</p>
          <h1 className="text-3xl sm:text-4xl">My properties</h1>
        </div>
        <Link
          href="/dashboard/add"
          className={buttonStyles({ variant: "primary" })}
        >
          Add property
        </Link>
      </header>
      <MyPropertiesTable initial={rows} />
    </div>
  );
}
