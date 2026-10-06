"use client";

import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const BAGS = PRODUCTS.filter((p) => p.mainCategory === "bags");

export default function BagsPage() {
  return (
    <div className="pb-20 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Bags & Packaging
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Paper bags, gift bags, wedding carry bags and premium packaging —
            for retail and events.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {BAGS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-dashed border-border bg-cream-dark p-6 text-center">
          <p className="font-medium">Need a larger quantity?</p>
          <p className="mt-1 text-sm text-muted">
            Request a wholesale quote for bulk packaging needs.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-medium text-cream hover:bg-charcoal-soft"
          >
            Request Wholesale Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
