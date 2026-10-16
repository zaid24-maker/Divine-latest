"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { submitLead } from "@/lib/listing-service";
import { isEmail } from "@/lib/validation";

export function ContactForm() {
  const { toast } = useToast();
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = {};
    if (v.name.trim().length < 2) found.name = "Please enter your name.";
    if (!isEmail(v.email)) found.email = "Enter a valid email address.";
    if (v.message.trim().length < 10)
      found.message = "Tell us a little more (at least 10 characters).";
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await submitLead({ ...v, source: "contact" });
    setBusy(false);
    setV({ name: "", email: "", message: "" });
    toast(
      "Thanks for getting in touch. We will reply within one business day.",
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Field label="Name" htmlFor="ct-name" error={errors.name}>
        <Input
          id="ct-name"
          value={v.name}
          onChange={set("name")}
          invalid={!!errors.name}
          autoComplete="name"
        />
      </Field>
      <Field label="Email" htmlFor="ct-email" error={errors.email}>
        <Input
          id="ct-email"
          type="email"
          value={v.email}
          onChange={set("email")}
          invalid={!!errors.email}
          autoComplete="email"
        />
      </Field>
      <Field label="Message" htmlFor="ct-message" error={errors.message}>
        <Textarea
          id="ct-message"
          rows={6}
          value={v.message}
          onChange={set("message")}
          invalid={!!errors.message}
        />
      </Field>
      <Button type="submit" variant="dark" size="lg" disabled={busy}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Send message
      </Button>
    </form>
  );
}
