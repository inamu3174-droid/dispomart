"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Props {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: Props) {
  const { addProduct } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addProduct(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const placeholderClass =
    product.mainCategory === "baskets"
      ? "placeholder-basket"
      : product.mainCategory === "wedding"
      ? "placeholder-wedding"
      : product.mainCategory === "dry-fruits"
      ? "placeholder-dryfruit"
      : product.mainCategory === "chocolates"
      ? "placeholder-chocolate"
      : "placeholder-bag";

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-md",
        className
      )}
    >
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <div
          className={cn(
            "img-hover absolute inset-0 flex items-center justify-center text-muted/40",
            placeholderClass
          )}
        >
          <span className="text-4xl opacity-50">
            {product.mainCategory === "baskets"
              ? "🧺"
              : product.mainCategory === "wedding"
              ? "🍽"
              : product.mainCategory === "dry-fruits"
              ? "🥜"
              : product.mainCategory === "chocolates"
              ? "🍫"
              : "🛍"}
          </span>
        </div>
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-crimson px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            Featured
          </span>
        )}
        {!product.inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-charcoal/50 text-sm font-medium text-white">
            Out of Stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-charcoal line-clamp-2 group-hover:text-crimson">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-muted">{product.unit}</p>
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <span className="font-serif text-xl font-semibold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.inStock && (
            <span className="text-xs text-green-700">In stock</span>
          )}
        </div>

        {product.inStock && (
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-border">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center text-charcoal hover:bg-cream-dark"
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center text-charcoal hover:bg-cream-dark"
                onClick={() => setQty(qty + 1)}
                aria-label="Increase"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                "flex-1 rounded-lg py-2.5 text-sm font-medium text-white",
                added ? "bg-green-700" : "bg-crimson hover:bg-crimson-dark"
              )}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
