"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export const MIN_RECOMMENDED = 5;
export const MAX_IMAGES = 30;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

export function ImageUploader({ images, onChange }) {
  const input = useRef(null);
  const [over, setOver] = useState(false);
  const [notice, setNotice] = useState();

  function add(files) {
    const issues = [];
    const next = [...images];
    for (const file of Array.from(files)) {
      if (next.length >= MAX_IMAGES) {
        issues.push(`Only ${MAX_IMAGES} images are allowed.`);
        break;
      }
      if (!ACCEPTED.includes(file.type)) {
        issues.push(`${file.name} is not a JPG, PNG or WEBP image.`);
        continue;
      }
      if (file.size > MAX_BYTES) {
        issues.push(`${file.name} is larger than 10 MB.`);
        continue;
      }
      next.push({
        id: `${file.name}-${file.size}-${next.length}-${Date.now()}`,
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      });
    }
    setNotice(
      issues.length ? Array.from(new Set(issues)).join(" ") : undefined,
    );
    onChange(next);
  }

  function remove(id) {
    const target = images.find((i) => i.id === id);
    if (target) URL.revokeObjectURL(target.url);
    onChange(images.filter((i) => i.id !== id));
  }

  function onDrop(e) {
    e.preventDefault();
    setOver(false);
    add(e.dataTransfer.files);
  }

  const remaining = Math.max(0, MIN_RECOMMENDED - images.length);

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors",
          over ? "border-emerald bg-emerald-light" : "border-line bg-white",
        )}
      >
        <UploadCloud className="mb-3 h-10 w-10 text-gold-dark" aria-hidden />
        <p className="font-display text-xl">Drag &amp; drop photos here</p>
        <p className="mt-1 text-sm text-muted">
          JPG, PNG or WEBP · up to 10 MB each · {MIN_RECOMMENDED} recommended,{" "}
          {MAX_IMAGES} maximum
        </p>
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-paper hover:bg-ink-soft"
        >
          <ImagePlus className="h-4 w-4" aria-hidden /> Choose photos
        </button>
        <input
          ref={input}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="sr-only"
          aria-label="Upload property photos"
          onChange={(e) => {
            if (e.target.files) add(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div
        className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm"
        aria-live="polite"
      >
        <p className={remaining ? "text-muted" : "font-medium text-emerald"}>
          {images.length} of {MAX_IMAGES} uploaded
          {remaining
            ? ` · add ${remaining} more for the best results`
            : " · great, that's plenty"}
        </p>
        {notice && (
          <p role="alert" className="text-red-600">
            {notice}
          </p>
        )}
      </div>

      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img, i) => (
            <li
              key={img.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-md bg-sand"
            >
              {/* Blob URLs cannot go through next/image, so a plain img is intentional here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={`Upload ${i + 1}: ${img.name}`}
                className="h-full w-full object-cover"
              />
              {i === 0 && (
                <span className="absolute left-2 top-2 rounded bg-ink px-2 py-0.5 text-[11px] font-semibold uppercase text-paper">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(img.id)}
                aria-label={`Remove ${img.name}`}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-soft hover:bg-white"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
