"use client";

import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const DRY = PRODUCTS.filter((p) => p.mainCategory === "dry-fruits");

export default function DryFruitsPage() {
  return (
    <div className="pb-20 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Dry Fruits
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Premium almonds, walnuts, cashews, pistachios and mixed packs —
            available by weight or as ready gift boxes. Ideal for Tokri and
            wedding gifting.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DRY.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
