"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { COUNTRY_COOKIE, DEFAULT_COUNTRY_CODE, GULF_MARKETS } from "@/data/constants";

function flagUrl(countryCode) {
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
}

function marketFor(country) {
  return GULF_MARKETS.find((m) => m.name === country);
}

function persistCountry(name) {
  document.cookie = `${COUNTRY_COOKIE}=${encodeURIComponent(
    name,
  )}; path=/; max-age=31536000; samesite=lax`;
  try {
    window.localStorage.setItem("divine-bricks-country", name);
  } catch {
    /* Storage can be unavailable in private modes; the cookie is what matters. */
  }
  document.documentElement.dataset.country = name;
}

export function FooterLocaleSelector({ country }) {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState(
    () => marketFor(country)?.code ?? DEFAULT_COUNTRY_CODE,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const selectorRef = useRef(null);
  const buttonRef = useRef(null);
  const selectedOptionRef = useRef(null);

  const selected =
    GULF_MARKETS.find((m) => m.code === selectedCode) ?? GULF_MARKETS[0];

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event) {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  function selectCountry(market) {
    setMenuOpen(false);
    if (market.code === selectedCode) {
      buttonRef.current?.focus();
      return;
    }
    setSelectedCode(market.code);
    persistCountry(market.name);
    router.refresh();
    buttonRef.current?.focus();
  }

  function handleMenuKeyDown(event) {
    const options = Array.from(
      selectorRef.current?.querySelectorAll('[role="option"]') ?? [],
    );
    const currentIndex = options.indexOf(document.activeElement);
    let nextIndex;

    if (event.key === "Escape") {
      event.preventDefault();
      setMenuOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      nextIndex = (currentIndex + direction + options.length) % options.length;
      options[nextIndex]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      options[event.key === "Home" ? 0 : options.length - 1]?.focus();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Globe className="h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
      <div className="relative" ref={selectorRef}>
        <span id="footer-country-label" className="sr-only">
          Country or region
        </span>
        <button
          ref={buttonRef}
          type="button"
          aria-labelledby="footer-country-label"
          aria-haspopup="listbox"
          aria-expanded={menuOpen}
          aria-controls="footer-country-options"
          onClick={() => setMenuOpen((open) => !open)}
          onKeyDown={(event) => {
            if (
              event.key === "ArrowDown" ||
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              setMenuOpen(true);
            }
          }}
          className="flex min-h-11 max-w-[14rem] items-center gap-2.5 rounded-md border border-white/20 bg-[#050505] px-3 py-2 text-left text-xs text-white transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
        >
          <img
            src={flagUrl(selected.code)}
            alt=""
            aria-hidden="true"
            width="24"
            height="18"
            className="h-[18px] w-6 shrink-0 rounded-sm object-cover"
          />
          <span className="truncate">{selected.name}</span>
          <ChevronDown
            className="ml-auto h-4 w-4 shrink-0 text-white/65"
            aria-hidden="true"
          />
        </button>
        {menuOpen && (
          <div
            id="footer-country-options"
            role="listbox"
            aria-labelledby="footer-country-label"
            onKeyDown={handleMenuKeyDown}
            className="absolute bottom-full end-0 z-50 mb-2 max-h-64 w-64 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-md border border-white/20 bg-[#050505] p-1 shadow-lg"
          >
            {GULF_MARKETS.map((market) => (
              <button
                key={market.code}
                ref={market.code === selectedCode ? selectedOptionRef : null}
                type="button"
                role="option"
                aria-selected={market.code === selectedCode}
                tabIndex={market.code === selectedCode ? 0 : -1}
                onClick={() => selectCountry(market)}
                className="flex min-h-10 w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-white/85 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
              >
                <img
                  src={flagUrl(market.code)}
                  alt=""
                  aria-hidden="true"
                  width="24"
                  height="18"
                  loading="lazy"
                  className="h-[18px] w-6 shrink-0 rounded-sm object-cover"
                />
                <span className="flex-1">{market.name}</span>
                <span className="text-[11px] font-medium text-white/45">
                  {market.currency}
                </span>
                {market.code === selectedCode && (
                  <Check
                    className="h-4 w-4 shrink-0 text-emerald"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      <span className="sr-only" aria-live="polite">
        {selected.name}. Prices shown in {selected.currency}.
      </span>
    </div>
  );
}