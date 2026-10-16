import { ListLanding } from "@/components/listing/list-landing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sell Your Property",
  description:
    "Sell residential or commercial property to serious buyers. Publish a listing in minutes on Divine Bricks.",
  path: "/sell",
});

export default function SellPage() {
  return <ListLanding mode="sale" />;
}
