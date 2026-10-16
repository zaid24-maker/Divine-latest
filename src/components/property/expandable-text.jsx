"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ExpandableText({ text, collapsedLines = 4 }) {
  const [open, setOpen] = useState(false);
  const paragraphs = text.split("\n\n");
  const long = text.length > 320;

  return (
    <div>
      <div
        className={cn(
          "space-y-4 leading-relaxed text-ink-soft",
          !open && long && "overflow-hidden",
        )}
        style={
          !open && long
            ? {
                display: "-webkit-box",
                WebkitLineClamp: collapsedLines,
                WebkitBoxOrient: "vertical",
              }
            : undefined
        }
      >
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-3 text-sm font-semibold text-emerald underline-offset-4 hover:underline"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
