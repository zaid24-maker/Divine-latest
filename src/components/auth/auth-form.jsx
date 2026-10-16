"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Field, Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { hasErrors, validateAuth } from "@/lib/validation";

/** Mock auth. Swap the timeout for a call to your auth provider (NextAuth, Clerk, custom API). */
export function AuthForm({ mode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const register = mode === "register";

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateAuth(values, mode);
    setErrors(found);
    if (hasErrors(found)) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    toast(
      register ? "Account created. Welcome to Divine Bricks!" : "Welcome back!",
    );
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {register && (
        <Field label="Full name" htmlFor="auth-name" error={errors.name}>
          <Input
            id="auth-name"
            value={values.name}
            onChange={set("name")}
            invalid={!!errors.name}
            autoComplete="name"
          />
        </Field>
      )}
      <Field label="Email" htmlFor="auth-email" error={errors.email}>
        <Input
          id="auth-email"
          type="email"
          value={values.email}
          onChange={set("email")}
          invalid={!!errors.email}
          autoComplete="email"
        />
      </Field>
      <Field
        label="Password"
        htmlFor="auth-password"
        error={errors.password}
        hint={register ? "At least 8 characters" : undefined}
      >
        <Input
          id="auth-password"
          type="password"
          value={values.password}
          onChange={set("password")}
          invalid={!!errors.password}
          autoComplete={register ? "new-password" : "current-password"}
        />
      </Field>
      <Button
        type="submit"
        variant="dark"
        size="lg"
        className="w-full"
        disabled={busy}
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {register ? "Create account" : "Log in"}
      </Button>
      <p className="text-center text-sm text-muted">
        {register ? "Already have an account?" : "New to Divine Bricks?"}{" "}
        <Link
          href={register ? "/login" : "/register"}
          className="font-semibold text-emerald hover:underline"
        >
          {register ? "Log in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
