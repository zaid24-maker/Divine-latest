import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { LEADS } from "@/data/dashboard";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Leads" };

const iconLink =
  "flex h-9 w-9 items-center justify-center rounded-md border border-line bg-white hover:border-ink";

const columns = [
  {
    key: "who",
    header: "Lead",
    cell: (l) => (
      <>
        <p className="font-semibold">{l.name}</p>
        <p className="text-xs text-muted">{l.email}</p>
      </>
    ),
  },
  {
    key: "property",
    header: "Property",
    cell: (l) => (
      <Link
        href={`/properties?q=${encodeURIComponent(l.propertyTitle)}`}
        className="block max-w-[240px] truncate hover:text-emerald"
      >
        {l.propertyTitle}
      </Link>
    ),
  },
  {
    key: "message",
    header: "Message",
    cell: (l) => (
      <p className="line-clamp-2 max-w-[280px] text-ink-soft">{l.message}</p>
    ),
  },
  {
    key: "time",
    header: "Prefers",
    cell: (l) => (
      <span className="whitespace-nowrap text-muted">{l.preferredTime}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (l) => <StatusBadge status={l.status} kind="lead" />,
  },
  {
    key: "date",
    header: "Received",
    cell: (l) => (
      <span className="whitespace-nowrap text-muted">
        {formatDate(l.createdAt)}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Contact",
    align: "right",
    cell: (l) => (
      <div className="flex justify-end gap-1.5">
        <a
          href={`tel:${l.phone.replace(/\s/g, "")}`}
          aria-label={`Call ${l.name}`}
          className={iconLink}
        >
          <Phone className="h-4 w-4" />
        </a>
        <a
          href={`https://wa.me/${l.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${l.name}`}
          className={iconLink}
        >
          <MessageCircle className="h-4 w-4 text-emerald" />
        </a>
        <a
          href={`mailto:${l.email}`}
          aria-label={`Email ${l.name}`}
          className={iconLink}
        >
          <Mail className="h-4 w-4" />
        </a>
      </div>
    ),
  },
];

export default function LeadsPage() {
  return (
    <div>
      <header className="mb-6">
        <p className="eyebrow mb-1">Enquiries</p>
        <h1 className="text-3xl sm:text-4xl">Leads</h1>
      </header>
      <DataTable
        columns={columns}
        rows={LEADS}
        rowKey={(l) => l.id}
        caption="Leads from your listings"
      />
    </div>
  );
}
