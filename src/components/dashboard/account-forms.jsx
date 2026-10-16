"use client";

import { useState } from "react";
import { Field, Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { isEmail, isPhone } from "@/lib/validation";

export function ProfileForm({ user }) {
  const { toast } = useToast();
  const [v, setV] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
  });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  function onSubmit(e) {
    e.preventDefault();
    const found = {};
    if (v.name.trim().length < 2) found.name = "Please enter your name.";
    if (!isEmail(v.email)) found.email = "Enter a valid email address.";
    if (!isPhone(v.phone)) found.phone = "Enter a valid phone number.";
    setErrors(found);
    if (Object.keys(found).length) return;
    toast("Profile saved.");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-4">
      <Field label="Full name" htmlFor="pf-name" error={errors.name}>
        <Input
          id="pf-name"
          value={v.name}
          onChange={set("name")}
          invalid={!!errors.name}
          autoComplete="name"
        />
      </Field>
      <Field label="Email" htmlFor="pf-email" error={errors.email}>
        <Input
          id="pf-email"
          type="email"
          value={v.email}
          onChange={set("email")}
          invalid={!!errors.email}
          autoComplete="email"
        />
      </Field>
      <Field label="Phone" htmlFor="pf-phone" error={errors.phone}>
        <Input
          id="pf-phone"
          type="tel"
          value={v.phone}
          onChange={set("phone")}
          invalid={!!errors.phone}
          autoComplete="tel"
        />
      </Field>
      <Button type="submit" variant="dark">
        Save changes
      </Button>
    </form>
  );
}

const PREFS = [
  { id: "email-leads", label: "Email me when I get a new lead", on: true },
  { id: "email-digest", label: "Weekly performance summary", on: true },
  { id: "search-alerts", label: "Alerts for my saved searches", on: true },
  { id: "marketing", label: "Product news and tips", on: false },
];

export function SettingsForm() {
  const { toast } = useToast();
  const [prefs, setPrefs] = useState(
    Object.fromEntries(PREFS.map((p) => [p.id, p.on])),
  );

  return (
    <div className="max-w-xl">
      <h2 className="mb-2 text-xl">Notifications</h2>
      <ul className="divide-y divide-line border-y border-line">
        {PREFS.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-4 py-4"
          >
            <label htmlFor={p.id} className="text-sm font-medium">
              {p.label}
            </label>
            <button
              id={p.id}
              type="button"
              role="switch"
              aria-checked={prefs[p.id]}
              onClick={() => {
                setPrefs((s) => ({ ...s, [p.id]: !s[p.id] }));
                toast("Preference updated.", "info");
              }}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${prefs[p.id] ? "bg-emerald" : "bg-sand-deep"}`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${prefs[p.id] ? "translate-x-5" : ""}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
