"use client";

import { useState } from "react";
import {
  PLASTIC_TRAEM,
  BIO_TRAEM,
  TRAEM_QTY_PRESETS,
} from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import type { TraemPackage, TraemItemQty } from "@/types";

type OptionId = "plastic" | "bio";

const OPTIONS: {
  id: OptionId;
  label: string;
  badge: string;
  pkg: TraemPackage;
  accent: string;
}[] = [
  {
    id: "plastic",
    label: "Plastic Disposable Items",
    badge: "Option 1",
    pkg: PLASTIC_TRAEM,
    accent: "border-charcoal/20",
  },
  {
    id: "bio",
    label: "Biodegradable Disposable Items",
    badge: "Option 2",
    pkg: BIO_TRAEM,
    accent: "border-emerald-600/30",
  },
];

function QtyPanel({
  pkg,
  traemType,
  onAdded,
}: {
  pkg: TraemPackage;
  traemType: string;
  onAdded: () => void;
}) {
  const { addTraem } = useCart();
  const [qty, setQty] = useState(20);
  const [customQty, setCustomQty] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [added, setAdded] = useState(false);

  const effectiveQty = useCustom
    ? Math.max(1, Math.min(500, Number(customQty) || 0))
    : qty;
  const total = pkg.price * (effectiveQty || 0);

  const handleAdd = () => {
    if (!effectiveQty || effectiveQty < 1) return;
    const scaledItems: TraemItemQty[] = pkg.items.map((i) => ({
      productId: i.productId,
      name: i.name,
      unit: "per Traem",
      price: 0,
      quantity: i.quantity * effectiveQty,
    }));
    addTraem(
      `${effectiveQty} × ${pkg.name}`,
      scaledItems,
      total,
      effectiveQty,
      traemType
    );
    setAdded(true);
    onAdded();
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="mt-6 rounded-xl border border-border bg-cream/50 p-5">
      <h4 className="text-sm font-semibold text-charcoal">
        How many Traem do you need?
      </h4>
      <p className="mt-0.5 text-xs text-muted">
        Each selection is one complete {pkg.name} set.
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {TRAEM_QTY_PRESETS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setUseCustom(false);
              setQty(n);
            }}
            className={cn(
              "rounded-lg border py-2.5 text-sm font-semibold transition-colors",
              !useCustom && qty === n
                ? "border-crimson bg-crimson text-white"
                : "border-border bg-white hover:border-crimson/40"
            )}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs font-medium text-muted">
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
            "w-full max-w-[160px] rounded-lg border px-3 py-2 text-sm outline-none",
            useCustom
              ? "border-crimson ring-1 ring-crimson/30"
              : "border-border focus:border-crimson"
          )}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted">
            {effectiveQty || "—"} set{effectiveQty === 1 ? "" : "s"} ×{" "}
            {formatPrice(pkg.price)}
          </p>
          <p className="font-serif text-2xl font-semibold text-crimson">
            {effectiveQty ? formatPrice(total) : "—"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!effectiveQty || added}
          className={cn(
            "rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors",
            added
              ? "bg-green-700"
              : "bg-crimson hover:bg-crimson-dark disabled:opacity-50"
          )}
        >
          {added
            ? "Added ✓"
            : effectiveQty
              ? `Add ${effectiveQty} Traem`
              : "Select quantity"}
        </button>
      </div>
    </div>
  );
}

export default function CommonTraemPage() {
  const [selected, setSelected] = useState<OptionId | null>(null);

  return (
    <div className="pb-20 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-crimson">
            Ready-made packages
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Common Traem
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Choose one of two complete Traem options, then select how many full
            sets you need. Individual items cannot be customized.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {OPTIONS.map((opt) => {
            const isOpen = selected === opt.id;
            return (
              <article
                key={opt.id}
                className={cn(
                  "rounded-2xl border bg-white overflow-hidden transition-shadow",
                  isOpen
                    ? "border-crimson/40 shadow-md ring-1 ring-crimson/15"
                    : "border-border hover:shadow-sm"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelected(isOpen ? null : opt.id)}
                  className="w-full text-left p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className={cn(
                          "inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                          opt.id === "bio"
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-cream-dark text-charcoal"
                        )}
                      >
                        {opt.badge}
                      </span>
                      <h2 className="mt-2 font-serif text-xl font-semibold text-charcoal sm:text-2xl">
                        {opt.label}
                      </h2>
                      <p className="mt-1.5 text-sm text-muted leading-relaxed">
                        {opt.pkg.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-serif text-xl font-semibold text-crimson">
                        {formatPrice(opt.pkg.price)}
                      </p>
                      <p className="text-[11px] text-muted">per Traem</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {opt.pkg.items.map((item) => (
                      <li
                        key={item.productId + item.name}
                        className="flex justify-between gap-2 text-sm border-b border-border/50 pb-1.5 last:border-0"
                      >
                        <span className="text-charcoal-soft">{item.name}</span>
                        <span className="shrink-0 text-xs text-muted">
                          ×{item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-xs font-medium text-crimson">
                    {isOpen
                      ? "Select quantity below ↓"
                      : "Tap to choose quantity →"}
                  </p>
                </button>

                {isOpen && (
                  <div className="border-t border-border px-6 pb-6 sm:px-7">
                    <QtyPanel
                      pkg={opt.pkg}
                      traemType={
                        opt.id === "plastic" ? "common-plastic" : "common-bio"
                      }
                      onAdded={() => {}}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p className="mt-8 rounded-xl border border-dashed border-border bg-cream-dark/60 px-5 py-4 text-center text-sm text-muted">
          Need a custom basket with chocolates, dry fruits or gifts? Use{" "}
          <a href="/build-tokri" className="font-medium text-crimson underline-offset-2 hover:underline">
            Build Your Tokri
          </a>{" "}
          — fully customizable. Traem packages above are fixed sets only.
        </p>
      </div>
    </div>
  );
}
