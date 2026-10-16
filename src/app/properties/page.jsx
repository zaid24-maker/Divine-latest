import { PropertiesView } from "@/components/search/properties-view";
import { parseFilters } from "@/lib/search";
import { listingMetadata } from "@/lib/seo";

export async function generateMetadata({ searchParams }) {
  return listingMetadata(parseFilters(await searchParams), "/properties");
}

export default async function PropertiesPage({ searchParams }) {
  const filters = parseFilters(await searchParams);
  return (
    <PropertiesView
      filters={filters}
      basePath="/properties"
      crumbs={[{ label: "Home", href: "/" }, { label: "Properties" }]}
      intro="Search homes, offices, shops and land from verified owners and agents."
    />
  );
}
