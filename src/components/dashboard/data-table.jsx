import { cn } from "@/lib/utils";

/** Generic, accessible table. Scrolls horizontally on small screens instead of breaking layout. */
export function DataTable({ columns, rows, rowKey, caption, empty }) {
  if (!rows.length && empty) return <>{empty}</>;
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-sand text-xs uppercase tracking-wide text-muted">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={cn(
                  "px-4 py-3 font-semibold",
                  c.align === "right" && "text-right",
                  c.className,
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row) => (
            <tr key={rowKey(row)} className="transition-colors hover:bg-paper">
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={cn(
                    "px-4 py-3.5 align-middle",
                    c.align === "right" && "text-right",
                    c.className,
                  )}
                >
                  {c.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
