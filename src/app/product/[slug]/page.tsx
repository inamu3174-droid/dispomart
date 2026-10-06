"use client";

import { useParams } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addProduct } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="font-serif text-2xl">Product not found</h1>
        <Link href="/shop" className="mt-4 inline-block text-crimson hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addProduct(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const placeholder =
    product.mainCategory === "baskets"
      ? "placeholder-basket"
      : product.mainCategory === "wedding"
      ? "placeholder-wedding"
      : product.mainCategory === "dry-fruits"
      ? "placeholder-dryfruit"
      : "placeholder-bag";

  return (
    <div className="pb-24 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/shop" className="hover:text-crimson">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div
            className={cn(
              "flex aspect-square items-center justify-center rounded-2xl text-7xl",
              placeholder
            )}
          >
            {product.mainCategory === "baskets"
              ? "🧺"
              : product.mainCategory === "wedding"
              ? "🍽"
              : product.mainCategory === "dry-fruits"
              ? "🥜"
              : "🛍"}
          </div>

          <div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-muted">{product.unit}</p>
            <p className="mt-4 font-serif text-3xl font-semibold text-crimson">
              {formatPrice(product.price)}
            </p>
            {product.inStock ? (
              <p className="mt-2 text-sm text-green-700">In stock</p>
            ) : (
              <p className="mt-2 text-sm text-red-700">Out of stock</p>
            )}

            <p className="mt-6 leading-relaxed text-charcoal-soft">
              {product.description}
            </p>

            {product.dimensions && (
              <p className="mt-3 text-sm text-muted">
                Dimensions: {product.dimensions}
              </p>
            )}

            {product.inStock && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center hover:bg-cream-dark"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-medium">{qty}</span>
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center hover:bg-cream-dark"
                    onClick={() => setQty(qty + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className={cn(
                    "rounded-lg px-8 py-3 text-sm font-semibold text-white",
                    added ? "bg-green-700" : "bg-crimson hover:bg-crimson-dark"
                  )}
                >
                  {added ? "Added ✓" : "Add to Cart"}
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-cream-dark"
                >
                  Buy Now
                </button>
              </div>
            )}

            {(product.mainCategory === "dry-fruits" ||
              product.isBasket) && (
              <Link
                href="/build-tokri"
                className="mt-6 inline-flex text-sm font-medium text-crimson hover:underline"
              >
                + Add to Tokri →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
