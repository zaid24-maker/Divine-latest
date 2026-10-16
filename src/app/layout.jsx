import "./globals.css";
import { FloatingChat } from "@/components/ui/floating-chat";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ToastProvider } from "@/components/ui/toast";

export const metadata = {
  title: "Divine Bricks | Homes. Elevated.",
  description:
    "A modern property marketplace to discover, buy, rent, sell and list residential and commercial properties across the GCC.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <ToastProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>

          <Header />

          <main id="main" className="flex-1 pt-16 lg:pt-[72px]">
            {children}
          </main>

          <Footer />

          <FloatingChat />
        </ToastProvider>
      </body>
    </html>
  );
}