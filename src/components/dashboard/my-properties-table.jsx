"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, Pause, Pencil, Play, Trash2 } from "lucide-react";
import { PropertyImage } from "@/components/property/property-image";
import { StatusBadge } from "./status-badge";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonStyles } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function MyPropertiesTable({ initial }) {
  const { toast } = useToast();
  const [rows, setRows] = useState(initial);
  const [toDelete, setToDelete] = useState(null);

  function toggle(row) {
    const next = row.status === "paused" ? "active" : "paused";
    setRows((rs) =>
      rs.map((r) => (r.id === row.id ? { ...r, status: next } : r)),
    );
    toast(
      next === "paused"
        ? "Listing paused. It is hidden from search."
        : "Listing is live again.",
      "info",
    );
  }

  function confirmDelete() {
    if (!toDelete) return;
    setRows((rs) => rs.filter((r) => r.id !== toDelete.id));
    toast(`"${toDelete.title}" was deleted.`, "info");
    setToDelete(null);
  }

  if (!rows.length) {
    return (
      <EmptyState
        title="You have no listings yet"
        description="Add your first property and reach thousands of buyers and tenants."
        action={
          <Link
            href="/dashboard/add"
            className={buttonStyles({ variant: "dark" })}
          >
            Add property
          </Link>
        }
      />
    );
  }

  const iconBtn =
    "flex h-9 w-9 items-center justify-center rounded-md border border-line bg-white text-ink-soft transition-colors hover:border-ink hover:text-ink";

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <caption className="sr-only">My property listings</caption>
          <thead className="bg-sand text-xs uppercase tracking-wide text-muted">
            <tr>
              <th scope="col" className="px-4 py-3">
                Property
              </th>
              <th scope="col" className="px-4 py-3">
                Price
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Views
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Leads
              </th>
              <th scope="col" className="px-4 py-3">
                Created
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-paper">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="relative block h-14 w-20 shrink-0 overflow-hidden rounded-md bg-sand">
                      <PropertyImage
                        src={r.image}
                        alt={r.imageAlt}
                        sizes="80px"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block max-w-[260px] truncate font-semibold">
                        {r.title}
                      </span>
                      <span className="block text-xs text-muted">
                        {r.location}
                      </span>
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-display text-base font-semibold">
                  {r.price}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {r.views.toLocaleString("en-US")}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{r.leads}</td>
                <td className="whitespace-nowrap px-4 py-3 text-muted">
                  {r.created}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    <Link
                      href="/dashboard/add"
                      aria-label={`Edit ${r.title}`}
                      title="Edit"
                      className={iconBtn}
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/properties/${r.slug}`}
                      aria-label={`View ${r.title}`}
                      title="View"
                      className={iconBtn}
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggle(r)}
                      disabled={
                        r.status === "pending" || r.status === "rejected"
                      }
                      aria-label={`${r.status === "paused" ? "Resume" : "Pause"} ${r.title}`}
                      title={r.status === "paused" ? "Resume" : "Pause"}
                      className={`${iconBtn} disabled:opacity-40`}
                    >
                      {r.status === "paused" ? (
                        <Play className="h-4 w-4" />
                      ) : (
                        <Pause className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setToDelete(r)}
                      aria-label={`Delete ${r.title}`}
                      title="Delete"
                      className={`${iconBtn} hover:!border-red-500 hover:!text-red-600`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        title="Delete this listing?"
      >
        <p className="text-sm text-muted">
          &ldquo;{toDelete?.title}&rdquo; will be removed permanently along with
          its views and leads. This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setToDelete(null)}
            className={buttonStyles({ variant: "outline" })}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            className="inline-flex h-11 items-center rounded-md bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete listing
          </button>
        </div>
      </Modal>
    </>
  );
}
