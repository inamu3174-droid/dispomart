import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://dispomart.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/build-tokri",
    "/mahraaz-traem",
    "/common-traem",
    "/dry-fruits",
    "/bags",
    "/about",
    "/contact",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
    "/cart",
    "/checkout",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
