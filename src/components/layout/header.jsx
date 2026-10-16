"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Plus, Search, X } from "lucide-react";
import { Logo } from "./logo";
import { buttonStyles } from "@/components/ui/button";
import { MAIN_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const pillClass = (active) =>
    cn(
      "whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium leading-none transition-colors",
      active
        ? "bg-emerald text-white"
        : "bg-[#374456] text-white hover:bg-emerald",
    );

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-[#374456] shadow-lg" : "bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center gap-3 lg:h-[72px] lg:gap-5">
          {/* LEFT — Logo */}
          <Logo variant={scrolled ? "white" : "black"} />

          {/* CENTER — Nav + Auth (desktop) */}
          <div className="hidden flex-1 items-center justify-center gap-1.5 lg:flex">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={pillClass(isActive(item.href))}
              >
                {item.label}
              </Link>
            ))}

            <span aria-hidden="true" className="mx-1 h-5 w-px bg-white/20" />

            <Link href="/login" className={pillClass(isActive("/login"))}>
              Login
            </Link>
            <Link
              href="/register"
              className={pillClass(isActive("/register"))}
            >
              Sign Up
            </Link>
          </div>

          {/* RIGHT — CTA (desktop) */}
          <div className="hidden items-center lg:flex">
            <Link
              href="/list-property"
              className={cn(
                buttonStyles({ variant: "dark", size: "sm" }),
                "whitespace-nowrap",
              )}
            >
              <Plus className="h-4 w-4" aria-hidden />
              <span>List Property</span>
            </Link>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex flex-1 items-center justify-end gap-3 lg:hidden">
            <Link
              href="/search"
              aria-label="Search properties"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#374456] text-white transition-colors hover:bg-emerald"
            >
              <Search className="h-4 w-4" aria-hidden />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#374456] text-white transition-colors hover:bg-emerald"
            >
              <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setOpen(false)}
          />

          {/* Panel — narrower, slate header */}
          <div className="absolute right-0 top-0 flex h-dvh w-[65%] max-w-[280px] flex-col bg-paper shadow-lift">
            {/* Fixed Header — slate background */}
            <div className="flex shrink-0 items-center justify-between gap-2 bg-[#374456] px-3 py-3">
              <Logo variant="white" />

              <div className="flex items-center gap-1.5">
                <Link
                  href="/list-property"
                  className="flex h-8 items-center gap-1 whitespace-nowrap rounded-full bg-white px-3 text-[11px] font-semibold text-[#374456] transition-colors hover:bg-emerald hover:text-white"
                >
                  <Plus className="h-3 w-3" aria-hidden />
                  <span>List</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/15"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Nav */}
            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-2"
            >
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-line py-3 font-display text-base"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/sell"
                className="block border-b border-line py-3 font-display text-base"
              >
                Sell
              </Link>
            </nav>

            {/* Fixed Footer — Login / Sign Up */}
            <div className="shrink-0 border-t border-line bg-paper px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className={buttonStyles({ variant: "outline", size: "sm" })}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={buttonStyles({ variant: "primary", size: "sm" })}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}