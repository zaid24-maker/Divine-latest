import { ListingWizard } from "@/components/listing/listing-wizard";

export const metadata = {
  title: "Add Your Property",
  robots: { index: false, follow: true },
};

export default async function NewListingPage({ searchParams }) {
  const { purpose } = await searchParams;
  const initial =
    purpose === "sale" || purpose === "rent" ? purpose : undefined;
  return (
    <div className="container-page py-10 lg:py-14">
      <ListingWizard initialPurpose={initial} />
    </div>
  );
}
