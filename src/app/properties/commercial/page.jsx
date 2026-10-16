import { PropertiesView } from "@/components/search/properties-view";
import { parseFilters } from "@/lib/search";
import { listingMetadata } from "@/lib/seo";

const PRESET = { category: "commercial" };
const PATH = "/properties/commercial";

export async function generateMetadata({ searchParams }) {
  return listingMetadata(parseFilters(await searchParams, PRESET), PATH);
}

export default async function Page({ searchParams }) {
  const filters = parseFilters(await searchParams, PRESET);
  return (
    <PropertiesView
      filters={filters}
      basePath={PATH}
      lockedCategory="commercial"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Properties", href: "/properties" },
        { label: "Commercial" },
      ]}
      intro="Offices, retail, warehouses and hospitality assets for business."
    />
  );
}
