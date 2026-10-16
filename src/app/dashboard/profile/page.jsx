import { ProfileForm } from "@/components/dashboard/account-forms";
import { CURRENT_USER } from "@/data/dashboard";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow mb-1">Account</p>
        <h1 className="text-3xl sm:text-4xl">Profile</h1>
      </header>
      <ProfileForm user={CURRENT_USER} />
    </div>
  );
}
