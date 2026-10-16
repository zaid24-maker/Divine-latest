import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata = {
  title: "Log in",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your listings, saved homes and enquiries."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
