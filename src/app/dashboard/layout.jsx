import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export const metadata = {
  title: { default: "Dashboard", template: "%s | Dashboard | Divine Bricks" },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }) {
  return (
    <div className="container-page grid gap-6 py-6 lg:grid-cols-[240px_1fr] lg:gap-12 lg:py-10">
      <DashboardSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
