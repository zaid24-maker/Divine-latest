"use client";

import { useId, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { submitLead } from "@/lib/listing-service";
import { hasErrors, validateLead } from "@/lib/validation";

const TIMES = [
  "Anytime",
  "Morning (9am - 12pm)",
  "Afternoon (12pm - 4pm)",
  "Evening (4pm - 8pm)",
];

export function LeadForm({
  agentName,
  propertyId,
  propertyTitle,
  mode = "enquiry",
  onDone,
}) {
  const uid = useId();
  const { toast } = useToast();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    message:
      propertyTitle && mode === "enquiry"
        ? `Hi, I'm interested in "${propertyTitle}". Please share more details.`
        : "",
    preferredTime: TIMES[0],
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const set = (key) => (e) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));
  const id = (key) => `${uid}-${key}`;

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateLead(values);
    setErrors(found);
    if (hasErrors(found)) return;

    setStatus("sending");
    try {
      await submitLead({ ...values, propertyId: propertyId ?? "", mode });
      setStatus("sent");
      toast(
        mode === "callback"
          ? `${agentName} will call you back soon.`
          : `Your enquiry was sent to ${agentName}.`,
      );
      onDone?.();
    } catch {
      setStatus("idle");
      toast("Something went wrong. Please try again.", "error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-center gap-2 py-8 text-center"
        role="status"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald" aria-hidden />
        <p className="font-display text-xl">
          Thank you, {values.name.split(" ")[0]}.
        </p>
        <p className="text-sm text-muted">
          {agentName} will be in touch{" "}
          {mode === "callback" ? "at your preferred time" : "shortly"}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <Field label="Full name" htmlFor={id("name")} error={errors.name}>
        <Input
          id={id("name")}
          value={values.name}
          onChange={set("name")}
          invalid={!!errors.name}
          autoComplete="name"
          placeholder="Your name"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Field label="Phone" htmlFor={id("phone")} error={errors.phone}>
          <Input
            id={id("phone")}
            type="tel"
            value={values.phone}
            onChange={set("phone")}
            invalid={!!errors.phone}
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
          />
        </Field>
        <Field label="Email" htmlFor={id("email")} error={errors.email}>
          <Input
            id={id("email")}
            type="email"
            value={values.email}
            onChange={set("email")}
            invalid={!!errors.email}
            autoComplete="email"
            placeholder="you@email.com"
          />
        </Field>
      </div>
      <Field label="Preferred contact time" htmlFor={id("time")}>
        <Select
          id={id("time")}
          value={values.preferredTime}
          onChange={set("preferredTime")}
        >
          {TIMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Field>
      {mode === "enquiry" && (
        <Field label="Message" htmlFor={id("message")} error={errors.message}>
          <Textarea
            id={id("message")}
            value={values.message}
            onChange={set("message")}
            invalid={!!errors.message}
            rows={3}
          />
        </Field>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === "sending"}
      >
        {status === "sending" && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        )}
        {mode === "callback" ? "Request a Callback" : "Contact Agent"}
      </Button>
      <p className="text-center text-xs text-muted">
        By submitting you agree to be contacted about this property.
      </p>
    </form>
  );
}
