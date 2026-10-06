"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, itemCount } = useCart();

  return (
    <div className="pb-24 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold">Your Cart</h1>
          <p className="mt-1 text-muted">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted">Your cart is empty</p>
            <Link
              href="/shop"
              className="mt-4 inline-flex rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white hover:bg-crimson-dark"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-border bg-white p-4"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-cream-dark text-3xl">
                    {item.type === "tokri"
                      ? "🧺"
                      : item.type === "traem"
                      ? "🍽"
                      : "📦"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    {item.type === "tokri" && item.tokri && (
                      <div className="mt-1 text-xs text-muted space-y-0.5">
                        <p>Basket: {item.tokri.basket?.name}</p>
                        <p>
                          Products:{" "}
                          {item.tokri.items
                            .map((i) => `${i.product.name} ×${i.quantity}`)
                            .join(", ")}
                        </p>
                        {item.tokri.customization.customMessage && (
                          <p className="italic">
                            “{item.tokri.customization.customMessage}”
                          </p>
                        )}
                      </div>
                    )}
                    {item.type === "traem" && (
                      <p className="mt-1 text-xs text-muted">
                        {item.guestCount} guests · {item.traemItems?.length}{" "}
                        line items
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      {item.type === "product" ? (
                        <div className="flex items-center rounded border border-border">
                          <button
                            type="button"
                            className="h-8 w-8"
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="h-8 w-8"
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted">Qty: 1</span>
                      )}
                      <span className="font-semibold">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="self-start text-muted hover:text-crimson"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-white p-5">
                <h2 className="font-serif text-lg font-semibold">Summary</h2>
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-2 text-xs text-muted">
                  Delivery charges calculated at checkout if applicable.
                </p>
                <Link
                  href="/checkout"
                  className="mt-5 block w-full rounded-lg bg-crimson py-3 text-center text-sm font-semibold text-white hover:bg-crimson-dark"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/shop"
                  className="mt-2 block w-full rounded-lg border border-border py-2.5 text-center text-sm font-medium hover:bg-cream-dark"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
