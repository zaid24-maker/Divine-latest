import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata = {
  title: "Create an account",
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Save properties, list your own and talk to agents directly."
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
