/** Tiny className joiner (keeps the dependency list short). */
export function cn(...values) {
  return values.filter(Boolean).join(" ");
}

export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count.toLocaleString("en-US")} ${count === 1 ? singular : plural}`;
}

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
