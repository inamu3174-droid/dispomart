"use client";

import { useState } from "react";
import { MAHRAAZ_TRAEM, TRAEM_QTY_PRESETS } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { TraemItemQty } from "@/types";

export default function MahraazTraemPage() {
  const { addTraem } = useCart();
  const [qty, setQty] = useState<number>(20);
  const [customQty, setCustomQty] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [added, setAdded] = useState(false);

  const effectiveQty = useCustom
    ? Math.max(1, Math.min(500, Number(customQty) || 0))
    : qty;

  const unitPrice = MAHRAAZ_TRAEM.price;
  const total = unitPrice * (effectiveQty || 0);

  const handleAdd = () => {
    if (!effectiveQty || effectiveQty < 1) return;
    const scaledItems: TraemItemQty[] = MAHRAAZ_TRAEM.items.map((i) => ({
      productId: i.productId,
      name: i.name,
      unit: "per Traem",
      price: 0,
      quantity: i.quantity * effectiveQty,
    }));
    addTraem(
      `${effectiveQty} × Mahraaz Traem`,
      scaledItems,
      total,
      effectiveQty,
      "mahraaz"
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="pb-20 lg:pb-0">
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#9f1239_0%,_transparent_55%)] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-400">
            Fixed complete package
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Mahraaz Traem
          </h1>
          <p className="mt-3 max-w-xl text-lg text-stone-300">
            A Special Traem for Mahraaz &amp; His People
          </p>
          <p className="mt-4 max-w-2xl text-stone-400 leading-relaxed">
            One complete ready-made package with every essential item included.
            Simply choose how many full Traem sets you need — no individual
            item customization.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-charcoal">
                    {MAHRAAZ_TRAEM.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Everything included in one complete set
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl font-semibold text-crimson">
                    {formatPrice(unitPrice)}
                  </p>
                  <p className="text-xs text-muted">per Traem</p>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-border/70">
                {MAHRAAZ_TRAEM.items.map((item) => (
                  <li
                    key={item.productId + item.name}
                    className="flex items-center justify-between gap-3 py-3 text-sm"
                  >
                    <span className="text-charcoal">{item.name}</span>
                    <span className="shrink-0 rounded-full bg-cream-dark px-2.5 py-0.5 text-xs font-medium text-muted">
                      ×{item.quantity} per Traem
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 rounded-xl bg-cream-dark/80 px-4 py-3 text-xs leading-relaxed text-muted">
                This is a fixed package. Item list and quantities per Traem
                cannot be changed. To order more of any single product, visit
                the Shop.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold">
                How many Traem do you need?
              </h3>
              <p className="mt-1 text-sm text-muted">
                Each selection is a complete Mahraaz Traem set.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-3">
                {TRAEM_QTY_PRESETS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setUseCustom(false);
                      setQty(n);
                    }}
                    className={cn(
                      "rounded-xl border py-3 text-sm font-semibold transition-colors",
                      !useCustom && qty === n
                        ? "border-crimson bg-crimson text-white"
                        : "border-border bg-cream hover:border-crimson/40 hover:bg-cream-dark"
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Custom quantity
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  placeholder="e.g. 40"
                  value={useCustom ? customQty : ""}
                  onChange={(e) => {
                    setUseCustom(true);
                    setCustomQty(e.target.value);
                  }}
                  onFocus={() => setUseCustom(true)}
                  className={cn(
                    "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors",
                    useCustom
                      ? "border-crimson ring-1 ring-crimson/30"
                      : "border-border focus:border-crimson"
                  )}
                />
              </div>

              <div className="mt-6 space-y-2 border-t border-border pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Traem sets</span>
                  <span className="font-medium">{effectiveQty || "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Price per set</span>
                  <span className="font-medium">{formatPrice(unitPrice)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-medium">Total</span>
                  <span className="font-serif text-2xl font-semibold text-crimson">
                    {effectiveQty ? formatPrice(total) : "—"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={!effectiveQty || added}
                className={cn(
                  "mt-5 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-colors",
                  added
                    ? "bg-green-700"
                    : "bg-crimson hover:bg-crimson-dark disabled:opacity-50"
                )}
              >
                {added
                  ? "Added to Cart ✓"
                  : effectiveQty
                    ? `Add ${effectiveQty} Traem to Cart`
                    : "Select quantity"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
