"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/* Saved properties live in localStorage so they work for anonymous visitors.
 * When accounts are connected, mirror writes to `POST /me/saved`. */

const KEY = "divine-bricks:saved";
const EMPTY = "[]";
const listeners = new Set();

function readRaw() {
  try {
    return window.localStorage.getItem(KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function parse(raw) {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((v) => typeof v === "string")
      : [];
  } catch {
    return [];
  }
}

export function useSavedProperties() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => EMPTY);
  const ids = useMemo(() => parse(raw), [raw]);

  const toggle = useCallback((id) => {
    const current = parse(readRaw());
    const saved = !current.includes(id);
    const next = saved ? [...current, id] : current.filter((x) => x !== id);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: keep UI usable without persistence */
    }
    listeners.forEach((l) => l());
    return saved;
  }, []);

  return { ids, toggle, isSaved: (id) => ids.includes(id) };
}
