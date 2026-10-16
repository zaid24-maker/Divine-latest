"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastContext = createContext(null);

const ICONS = { success: CheckCircle2, error: XCircle, info: Info };
const COLORS = {
  success: "text-emerald",
  error: "text-red-600",
  info: "text-gold-dark",
};

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const nextId = useRef(0);

  const dismiss = useCallback(
    (id) => setItems((cur) => cur.filter((t) => t.id !== id)),
    [],
  );

  const toast = useCallback(
    (message, tone = "success") => {
      const id = (nextId.current += 1);
      setItems((cur) => [...cur.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-20 z-[100] flex flex-col items-center gap-2 px-4 lg:bottom-6 lg:items-end lg:px-6"
      >
        {items.map((t) => {
          const Icon = ICONS[t.tone];
          return (
            <div
              key={t.id}
              className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-start gap-3 rounded-lg bg-ink px-4 py-3 text-sm text-paper shadow-lift"
            >
              <Icon
                className={cn("mt-0.5 h-4 w-4 shrink-0", COLORS[t.tone])}
                aria-hidden
              />
              <p className="flex-1">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss notification"
                className="text-paper/60 hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
