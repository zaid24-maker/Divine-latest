import { absoluteUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/login", "/register", "/list-property/new"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
