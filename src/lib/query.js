/** Small helpers for client components that edit the URL query string. */

export function updateParams(current, updates, options = {}) {
  const next = new URLSearchParams(current.toString());
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || value === undefined || value === "") next.delete(key);
    else next.set(key, value);
  }
  if (!options.keepPage && !("page" in updates)) next.delete("page");
  return next;
}

export function toggleCsv(current, value) {
  const items = (current ?? "").split(",").filter(Boolean);
  const next = items.includes(value)
    ? items.filter((i) => i !== value)
    : [...items, value];
  return next.length ? next.join(",") : null;
}

export function withQuery(path, params) {
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}
