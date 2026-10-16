import { ListLanding } from "@/components/listing/list-landing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "List Your Property",
  description:
    "Reach serious buyers and tenants. List residential or commercial property on Divine Bricks in minutes.",
  path: "/list-property",
});

export default function ListPropertyPage() {
  return <ListLanding />;
}
