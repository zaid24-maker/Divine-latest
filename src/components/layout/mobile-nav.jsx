"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, MessageSquare, Search, UserRound } from "lucide-react";
import { MOBILE_TABS } from "@/lib/nav";
import { cn } from "@/lib/utils";

const ICONS = {
  home: Home,
  search: Search,
  heart: Heart,
  message: MessageSquare,
  user: UserRound,
};

/** App-style bottom navigation, visible below the `lg` breakpoint. */
export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="z-50  border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-md grid-cols-5">
        {MOBILE_TABS.map((tab) => {
          const Icon = ICONS[tab.icon];
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium",
                  active ? "text-emerald" : "text-muted",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
