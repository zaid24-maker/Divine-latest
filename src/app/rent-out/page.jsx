import { ListLanding } from "@/components/listing/list-landing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Rent Out Your Property",
  description:
    "Find reliable tenants for your home, office or shop. List your rental on Divine Bricks.",
  path: "/rent-out",
});

export default function RentOutPage() {
  return <ListLanding mode="rent" />;
}
