import { PropertiesView } from "@/components/search/properties-view";
import { parseFilters } from "@/lib/search";
import { listingMetadata } from "@/lib/seo";

const PRESET = { purpose: "rent" };
const PATH = "/properties/rent";

export async function generateMetadata({ searchParams }) {
  return listingMetadata(parseFilters(await searchParams, PRESET), PATH);
}

export default async function Page({ searchParams }) {
  const filters = parseFilters(await searchParams, PRESET);
  return (
    <PropertiesView
      filters={filters}
      basePath={PATH}
      lockedPurpose="rent"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Properties", href: "/properties" },
        { label: "Rent" },
      ]}
      intro="Furnished and unfurnished homes, offices and shops available to lease."
    />
  );
}
