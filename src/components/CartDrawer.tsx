"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, subtotal, updateQty, removeItem, itemCount } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
        onClick={() => toggleCart(false)}
      />
      <aside className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-serif text-xl font-semibold">
            Your Cart ({itemCount})
          </h2>
          <button
            type="button"
            onClick={() => toggleCart(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-cream-dark"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-muted">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={() => toggleCart(false)}
                className="mt-4 rounded-lg bg-crimson px-5 py-2.5 text-sm font-medium text-white hover:bg-crimson-dark"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-border bg-white p-3"
                >
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-cream-dark flex items-center justify-center text-2xl">
                    {item.type === "tokri"
                      ? "🧺"
                      : item.type === "traem"
                      ? "🍽"
                      : item.product?.mainCategory === "dry-fruits"
                      ? "🥜"
                      : "📦"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-charcoal line-clamp-2">
                      {item.name}
                    </h3>
                    {item.type === "tokri" && item.tokri?.basket && (
                      <p className="text-xs text-muted">
                        {item.tokri.basket.name} · {item.tokri.items.length} items
                      </p>
                    )}
                    {item.type === "traem" && (
                      <p className="text-xs text-muted">
                        {item.guestCount} guests · {item.traemItems?.length || 0} line items
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      {item.type === "product" ? (
                        <div className="flex items-center rounded border border-border">
                          <button
                            type="button"
                            className="h-7 w-7 text-sm"
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            className="h-7 w-7 text-sm"
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted">Qty: 1</span>
                      )}
                      <span className="text-sm font-semibold">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="self-start text-muted hover:text-crimson text-sm"
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-white px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Subtotal</span>
              <span className="font-serif text-xl font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={() => toggleCart(false)}
              className="block w-full rounded-lg border border-border py-3 text-center text-sm font-medium hover:bg-cream-dark"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={() => toggleCart(false)}
              className="block w-full rounded-lg bg-crimson py-3 text-center text-sm font-medium text-white hover:bg-crimson-dark"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
