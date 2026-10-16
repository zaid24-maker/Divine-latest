import { PropertiesView } from "@/components/search/properties-view";
import { parseFilters } from "@/lib/search";
import { listingMetadata } from "@/lib/seo";

const PRESET = { purpose: "sale" };
const PATH = "/properties/buy";

export async function generateMetadata({ searchParams }) {
  return listingMetadata(parseFilters(await searchParams, PRESET), PATH);
}

export default async function Page({ searchParams }) {
  const filters = parseFilters(await searchParams, PRESET);
  return (
    <PropertiesView
      filters={filters}
      basePath={PATH}
      lockedPurpose="sale"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Properties", href: "/properties" },
        { label: "Buy" },
      ]}
      intro="Homes, land and commercial spaces for sale, filtered the way you want."
    />
  );
}
