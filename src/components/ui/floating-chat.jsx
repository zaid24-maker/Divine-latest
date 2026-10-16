"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Sparkles, X } from "lucide-react";

// ⚙️ CONFIG — apne numbers/email yahan daalo
const WHATSAPP_NUMBER = "97145550100"; // no +, no spaces, country code ke saath
const WHATSAPP_MESSAGE =
  "Hi Divine Bricks, I'd like to know more about your properties.";
const EMAIL = "hello@divinebricks.com";
const EMAIL_SUBJECT = "Enquiry from Divine Bricks website";

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Outside click / Escape pe close
  useEffect(() => {
    if (!open) return;

    function onClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    EMAIL_SUBJECT,
  )}`;

  return (
    <div
      ref={wrapperRef}
      className="fixed right-5 z-40 lg:right-6"
      style={{ bottom: "6rem" }}
    >
      {/* Popup — slide in from bottom-right */}
      <div
        className={`absolute bottom-full right-0 mb-3 w-72 origin-bottom-right transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
        role="dialog"
        aria-label="Contact options"
        aria-hidden={!open}
      >
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-[#374456] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Chat with us</p>
              <p className="text-[11px] text-white/80">
                We usually reply within minutes
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-md p-1 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Options */}
          <div className="p-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-xl border border-line bg-paper p-3 transition-colors hover:border-[#374456]/40 hover:bg-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.15 1.6 5.96L0 24l6.31-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.55 0 11.88-5.33 11.88-11.89 0-3.18-1.24-6.17-3.42-8.44ZM12.06 21.8h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.28c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">WhatsApp</p>
                <p className="truncate text-[11px] text-ink/60">
                  Chat with our team instantly
                </p>
              </div>
            </a>

            <a
              href={emailHref}
              onClick={() => setOpen(false)}
              className="group mt-2 flex items-center gap-3 rounded-xl border border-line bg-paper p-3 transition-colors hover:border-[#374456]/40 hover:bg-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#374456] text-white">
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">Email us</p>
                <p className="truncate text-[11px] text-ink/60">{EMAIL}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat options" : "Open chat options"}
        aria-expanded={open}
        className="group relative flex items-center gap-2 rounded-full bg-[#374456] px-5 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 transition-all hover:bg-[#2E3A48] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#374456] focus-visible:ring-offset-2"
      >
        {open ? (
          <X className="h-4 w-4" aria-hidden />
        ) : (
          <Sparkles className="h-4 w-4" aria-hidden />
        )}
        <span className="whitespace-nowrap">
          {open ? "Close" : "Chat with us"}
        </span>

        {/* Red notification dot */}
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500" />
          </span>
        )}
      </button>
    </div>
  );
}