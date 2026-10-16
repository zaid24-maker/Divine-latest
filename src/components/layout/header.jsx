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

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300",
          scrolled ? "bg-[#374456] shadow-lg" : "bg-transparent",
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-3 lg:h-[72px] lg:gap-5">
          <Logo variant={scrolled ? "white" : "black"} />

          {/* ✅ CENTER GROUP — nav + auth pills */}
          <div className="hidden flex-1 items-center justify-center gap-1.5 lg:flex">
            <nav aria-label="Main" className="flex items-center gap-1.5">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium leading-none transition-colors",
                    isActive(item.href)
                      ? "bg-emerald text-white"
                      : "bg-[#374456] text-white hover:bg-emerald",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-2 flex items-center gap-1.5">
              <Link
                href="/login"
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium leading-none transition-colors",
                  isActive("/login")
                    ? "bg-emerald text-white"
                    : "bg-[#374456] text-white hover:bg-emerald",
                )}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  "whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium leading-none transition-colors",
                  isActive("/register")
                    ? "bg-emerald text-white"
                    : "bg-[#374456] text-white hover:bg-emerald",
                )}
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* ✅ RIGHT GROUP — CTA button (chhota kiya) */}
          <div className="hidden items-center lg:flex">
            <Link
              href="/list-property"
              className={buttonStyles({
                variant: "dark",
                size: "sm", // ← md se sm kar diya
              })}
            >
              <Plus className="h-4 w-4" aria-hidden />
              <span className="whitespace-nowrap">List Property</span>
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <Link
              href="/search"
              aria-label="Search properties"
              className="rounded-md p-2.5 text-white transition-colors hover:text-emerald"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/list-property"
              className={buttonStyles({ variant: "dark", size: "sm" })}
            >
              List Property
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="rounded-md p-2.5 text-white transition-colors hover:text-emerald"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (unchanged) */}
      {open && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-dvh w-[84%] max-w-sm animate-fade-up flex-col overflow-y-auto bg-paper p-6 shadow-lift">
            <div className="mb-6 flex items-center justify-between">
              <Logo variant="black" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-2 hover:bg-sand"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-line py-4 font-display text-2xl"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/sell"
                className="border-b border-line py-4 font-display text-2xl"
              >
                Sell
              </Link>
            </nav>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                href="/login"
                className={buttonStyles({ variant: "outline" })}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={buttonStyles({ variant: "primary" })}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}