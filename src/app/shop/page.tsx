"use client";

import { useState, useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "baskets", label: "Baskets" },
  { id: "wedding", label: "Wedding" },
  { id: "dry-fruits", label: "Dry Fruits" },
  { id: "bags", label: "Bags" },
  { id: "other", label: "Other" },
];

export default function ShopPage() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list =
      filter === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.mainCategory === filter);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filter, sort]);

  return (
    <div className="pb-20 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Shop
          </h1>
          <p className="mt-2 text-muted">
            Browse baskets, wedding supplies, dry fruits and bags
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium",
                  filter === f.id
                    ? "bg-crimson text-white"
                    : "bg-white border border-border text-charcoal hover:border-crimson/40"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <p className="mb-4 text-sm text-muted">{filtered.length} products</p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
