import { Bookmark, Clock, Eye, MessageSquare, Radio } from "lucide-react";
import { formatNumber } from "@/lib/format";

export function DashboardStats({ active, pending, views, leads, saved }) {
  const stats = [
    {
      label: "Active listings",
      value: active,
      icon: Radio,
      hint: "Live on the site",
    },
    {
      label: "Pending review",
      value: pending,
      icon: Clock,
      hint: "Awaiting approval",
    },
    { label: "Total views", value: views, icon: Eye, hint: "All time" },
    {
      label: "Total leads",
      value: leads,
      icon: MessageSquare,
      hint: "Calls & enquiries",
    },
    {
      label: "Saved properties",
      value: saved,
      icon: Bookmark,
      hint: "On your shortlist",
    },
  ];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 xl:grid-cols-5">
      {stats.map(({ label, value, icon: Icon, hint }) => (
        <div key={label} className="bg-white p-5">
          <Icon className="mb-3 h-5 w-5 text-gold-dark" aria-hidden />
          <dd className="font-display text-3xl font-semibold leading-none">
            {formatNumber(value)}
          </dd>
          <dt className="mt-2 text-sm font-medium">{label}</dt>
          {hint && <p className="text-xs text-muted">{hint}</p>}
        </div>
      ))}
    </dl>
  );
}
