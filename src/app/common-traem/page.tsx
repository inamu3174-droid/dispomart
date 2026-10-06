"use client";

import { useState, useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { TraemItemQty } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const TRAEM_PRODUCTS = PRODUCTS.filter((p) => p.mainCategory === "wedding");

function suggestQty(guests: number, productId: string): number {
  if (productId.includes("goshtab")) return Math.ceil(guests * 1.2);
  if (productId.includes("bowls")) return Math.ceil(guests * 0.8);
  if (productId.includes("wazwaan")) return Math.max(1, Math.ceil(guests / 40));
  if (productId.includes("spoons")) return Math.ceil(guests * 1.1);
  return guests;
}

export default function CommonTraemPage() {
  const [guests, setGuests] = useState(100);
  const [items, setItems] = useState<TraemItemQty[]>(() =>
    TRAEM_PRODUCTS.map((p) => ({
      productId: p.id,
      name: p.name,
      unit: p.unit,
      price: p.price,
      quantity: 0,
      suggested: 0,
    }))
  );
  const { addTraem } = useCart();
  const [added, setAdded] = useState(false);

  const applySuggestions = () => {
    setItems((prev) =>
      prev.map((item) => {
        const packsNeeded = Math.ceil(suggestQty(guests, item.productId) / 100);
        const qty =
          item.productId.includes("wazwaan")
            ? Math.max(1, Math.ceil(guests / 40))
            : Math.max(0, packsNeeded);
        return { ...item, quantity: qty, suggested: qty };
      })
    );
  };

  const updateQty = (productId: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(0, qty) } : i
      )
    );
  };

  const total = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items]
  );
  const activeItems = items.filter((i) => i.quantity > 0);

  const handleAdd = () => {
    if (activeItems.length === 0) return;
    addTraem(
      `Common Traem – ${guests} guests`,
      activeItems,
      total,
      guests,
      "common"
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pb-24 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-crimson">
            Flexible quantities
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Common Traem
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Everything you need for your wedding gathering. Enter the number of
            guests, get suggested quantities, then adjust every item exactly as
            you need.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-semibold">
            Plan Your Wedding Traem
          </h2>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Number of Guests
              </label>
              <input
                type="number"
                min={1}
                max={2000}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value) || 0)}
                className="w-32 rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson"
              />
            </div>
            <button
              type="button"
              onClick={applySuggestions}
              className="rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white hover:bg-crimson-dark"
            >
              Suggest Quantities
            </button>
          </div>
          <p className="mt-3 text-xs text-muted">
            Suggestions are approximate. Edit any quantity freely before adding
            to cart.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-white p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg placeholder-wedding text-xl">
                  🍽
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-muted">
                    {formatPrice(item.price)} / {item.unit}
                    {item.suggested !== undefined && item.suggested > 0 && (
                      <span className="ml-2 text-crimson">
                        · Suggested: {item.suggested}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center text-sm hover:bg-cream-dark"
                    onClick={() => updateQty(item.productId, item.quantity - 1)}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={0}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQty(item.productId, Number(e.target.value) || 0)
                    }
                    className="w-14 border-x border-border py-1.5 text-center text-sm outline-none"
                  />
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center text-sm hover:bg-cream-dark"
                    onClick={() => updateQty(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="w-20 text-right text-sm font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="sticky top-24 rounded-xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-serif text-lg font-semibold">Order Summary</h3>
              <p className="mt-1 text-sm text-muted">{guests} guests</p>
              <ul className="mt-4 max-h-48 space-y-1 overflow-y-auto text-sm">
                {activeItems.length === 0 ? (
                  <li className="text-muted">No items selected yet</li>
                ) : (
                  activeItems.map((i) => (
                    <li key={i.productId} className="flex justify-between gap-2">
                      <span className="truncate">{i.name}</span>
                      <span className="shrink-0">
                        ×{i.quantity} · {formatPrice(i.price * i.quantity)}
                      </span>
                    </li>
                  ))
                )}
              </ul>
              <div className="mt-4 flex justify-between border-t border-border pt-3">
                <span className="font-medium">Total</span>
                <span className="font-serif text-xl font-semibold text-crimson">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={activeItems.length === 0 || added}
                className={cn(
                  "mt-4 w-full rounded-lg py-3 text-sm font-semibold text-white",
                  added
                    ? "bg-green-700"
                    : "bg-crimson hover:bg-crimson-dark disabled:opacity-50"
                )}
              >
                {added ? "Added to Cart ✓" : "Add Traem to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
