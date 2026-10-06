"use client";

import { MAHRAAZ_PACKAGES } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function MahraazTraemPage() {
  const { addTraem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddPackage = (pkg: (typeof MAHRAAZ_PACKAGES)[0]) => {
    const items = pkg.items.map((i) => ({
      productId: i.productId,
      name: i.name,
      unit: "pack",
      price: 0,
      quantity: i.quantity,
    }));
    addTraem(pkg.name, items, pkg.price, pkg.guestCount, "mahraaz");
    setAddedId(pkg.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="pb-20 lg:pb-0">
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#9f1239_0%,_transparent_55%)] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-400">
            Special collection
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Mahraaz Traem
          </h1>
          <p className="mt-3 max-w-xl text-lg text-stone-300">
            A Special Traem for Mahraaz & His People
          </p>
          <p className="mt-4 max-w-2xl text-stone-400 leading-relaxed">
            Specially curated wedding Traem collections designed for Mahraaz,
            family members and their people. Choose a complete package or build
            your own quantities.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {MAHRAAZ_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={cn(
                "flex flex-col rounded-2xl border bg-white overflow-hidden transition-shadow hover:shadow-lg",
                pkg.type === "premium"
                  ? "border-crimson/40 ring-1 ring-crimson/20"
                  : "border-border"
              )}
            >
              {pkg.type === "premium" && (
                <div className="bg-crimson px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
                  Most Popular
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-xl font-semibold">{pkg.name}</h2>
                <p className="mt-1 text-sm text-muted">{pkg.description}</p>
                <p className="mt-4 font-serif text-3xl font-semibold text-charcoal">
                  {formatPrice(pkg.price)}
                </p>
                <p className="text-sm text-muted">
                  Supports ~{pkg.guestCount} guests
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {pkg.items.map((item) => (
                    <li
                      key={item.productId + item.name}
                      className="flex justify-between gap-2 border-b border-border/60 pb-1.5"
                    >
                      <span className="text-muted">{item.name}</span>
                      <span className="font-medium">×{item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddPackage(pkg)}
                    className={cn(
                      "w-full rounded-lg py-3 text-sm font-semibold text-white",
                      addedId === pkg.id
                        ? "bg-green-700"
                        : "bg-crimson hover:bg-crimson-dark"
                    )}
                  >
                    {addedId === pkg.id ? "Added ✓" : "Add to Cart"}
                  </button>
                  <Link
                    href="/common-traem"
                    className="w-full rounded-lg border border-border py-2.5 text-center text-sm font-medium hover:bg-cream-dark"
                  >
                    Customize Quantities
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-border bg-cream-dark p-8 text-center">
          <h3 className="font-serif text-2xl font-semibold">
            Build Your Own Mahraaz Traem
          </h3>
          <p className="mt-2 text-muted">
            Prefer exact quantities? Use the Common Traem planner and select
            only what you need for Mahraaz and guests.
          </p>
          <Link
            href="/common-traem"
            className="mt-6 inline-flex rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-cream hover:bg-charcoal-soft"
          >
            Open Traem Planner
          </Link>
        </div>
      </div>
    </div>
  );
}
