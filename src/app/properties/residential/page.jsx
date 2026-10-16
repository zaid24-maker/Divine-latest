import { PropertiesView } from "@/components/search/properties-view";
import { parseFilters } from "@/lib/search";
import { listingMetadata } from "@/lib/seo";

const PRESET = { category: "residential" };
const PATH = "/properties/residential";

export async function generateMetadata({ searchParams }) {
  return listingMetadata(parseFilters(await searchParams, PRESET), PATH);
}

export default async function Page({ searchParams }) {
  const filters = parseFilters(await searchParams, PRESET);
  return (
    <PropertiesView
      filters={filters}
      basePath={PATH}
      lockedCategory="residential"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Properties", href: "/properties" },
        { label: "Residential" },
      ]}
      intro="Apartments, villas, townhouses and land for families and investors."
    />
  );
}
