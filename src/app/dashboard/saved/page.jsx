import { SavedProperties } from "@/components/dashboard/saved-properties";
import { getAllProperties } from "@/lib/api";

export const metadata = { title: "Saved Properties" };

export default async function SavedPage() {
  const catalogue = await getAllProperties();
  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow mb-1">Shortlist</p>
        <h1 className="text-3xl sm:text-4xl">Saved properties</h1>
      </header>
      <SavedProperties catalogue={catalogue} />
    </div>
  );
}
