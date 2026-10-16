"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookmarkCheck,
  Building2,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PlusCircle,
  Search,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Properties", href: "/dashboard/properties", icon: Building2 },
  { label: "Add Property", href: "/dashboard/add", icon: PlusCircle },
  { label: "Saved Properties", href: "/dashboard/saved", icon: BookmarkCheck },
  { label: "Searches", href: "/dashboard/searches", icon: Search },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const active = (href) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  function logout() {
    toast("You have been logged out.", "info");
    router.push("/");
  }

  const link = (item, compact = false) => {
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active(item.href) ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-md text-sm font-medium transition-colors",
          compact ? "shrink-0 whitespace-nowrap px-3.5 py-2" : "px-3.5 py-2.5",
          active(item.href)
            ? "bg-ink text-paper"
            : "text-ink-soft hover:bg-sand",
        )}
      >
        <Icon className="h-[18px] w-[18px]" aria-hidden />
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile: horizontally scrolling tab strip */}
      <nav
        aria-label="Dashboard"
        className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto border-b border-line px-4 pb-3 lg:hidden"
      >
        {ITEMS.map((i) => link(i, true))}
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <nav aria-label="Dashboard" className="sticky top-24 space-y-1">
          {ITEMS.map((i) => link(i))}
          <button
            type="button"
            onClick={logout}
            className="mt-4 flex w-full items-center gap-3 rounded-md border-t border-line px-3.5 py-3 pt-4 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden /> Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
