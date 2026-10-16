import { SettingsForm } from "@/components/dashboard/account-forms";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow mb-1">Account</p>
        <h1 className="text-3xl sm:text-4xl">Settings</h1>
      </header>
      <SettingsForm />
    </div>
  );
}
