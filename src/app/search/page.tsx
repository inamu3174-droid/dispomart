"use client";

import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Suspense } from "react";

function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") || "";
  const results = searchProducts(q);

  return (
    <div className="pb-20 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold">
            Search results
          </h1>
          {q && (
            <p className="mt-1 text-muted">
              {results.length} result{results.length !== 1 ? "s" : ""} for “{q}”
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {results.length === 0 ? (
          <p className="text-muted">No products found. Try another search.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted">Loading…</div>}>
      <SearchResults />
    </Suspense>
  );
}
