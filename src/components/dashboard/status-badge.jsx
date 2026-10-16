import { cn } from "@/lib/utils";

const LISTING = {
  active: { label: "Active", cls: "bg-emerald-light text-emerald-dark" },
  pending: { label: "Pending review", cls: "bg-gold-light text-gold-dark" },
  paused: { label: "Paused", cls: "bg-sand text-muted" },
  rejected: { label: "Rejected", cls: "bg-red-50 text-red-700" },
  sold: { label: "Sold", cls: "bg-ink text-paper" },
};

const LEAD = {
  new: { label: "New", cls: "bg-emerald-light text-emerald-dark" },
  contacted: { label: "Contacted", cls: "bg-gold-light text-gold-dark" },
  "visit-scheduled": { label: "Visit scheduled", cls: "bg-sand text-ink" },
  closed: { label: "Closed", cls: "bg-ink text-paper" },
};

export function StatusBadge({ status, kind = "listing" }) {
  const entry = kind === "lead" ? LEAD[status] : LISTING[status];
  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        entry.cls,
      )}
    >
      {entry.label}
    </span>
  );
}
