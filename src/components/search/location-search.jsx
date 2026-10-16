"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Building, MapPin } from "lucide-react";
import { LOCATION_SUGGESTIONS } from "@/data/locations";
import { cn } from "@/lib/utils";

export function LocationSearch({
  value,
  onChange,
  label = "Location",
  placeholder = "Search by city, area or community",
  className,
  inputClassName,
}) {
  const uid = useId();
  const listId = `${uid}-list`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef(null);

  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase();
    const pool = q
      ? LOCATION_SUGGESTIONS.filter((s) =>
          `${s.label} ${s.hint}`.toLowerCase().includes(q),
        )
      : LOCATION_SUGGESTIONS.filter((s) => s.kind === "city");
    return pool.slice(0, 7);
  }, [value]);

  function choose(index) {
    const s = suggestions[index];
    if (!s) return;
    onChange(s.value);
    setOpen(false);
    setActive(-1);
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <label htmlFor={`${uid}-input`} className="sr-only">
        {label}
      </label>
      <MapPin
        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald"
        aria-hidden
      />
      <input
        id={`${uid}-input`}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${uid}-opt-${active}` : undefined}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActive((a) => Math.min(a + 1, suggestions.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter" && open && active >= 0) {
            e.preventDefault();
            choose(active);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={cn("field pl-10", inputClassName)}
      />

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-1.5 max-h-72 overflow-y-auto rounded-lg border border-line bg-white py-1.5 shadow-lift"
        >
          {suggestions.map((s, i) => (
            <li
              key={`${s.kind}-${s.value}`}
              id={`${uid}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-3.5 py-2.5 text-sm",
                i === active && "bg-sand",
              )}
            >
              {s.kind === "city" ? (
                <Building className="h-4 w-4 text-muted" aria-hidden />
              ) : (
                <MapPin className="h-4 w-4 text-muted" aria-hidden />
              )}
              <span className="font-medium">{s.label}</span>
              <span className="ml-auto truncate text-xs text-muted">
                {s.hint}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
