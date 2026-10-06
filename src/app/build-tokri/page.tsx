"use client";

import { useState, useMemo } from "react";
import { BASKET_OPTIONS, PRODUCTS } from "@/data/products";
import { BasketOption, Product, TokriCustomization, TokriItem } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const FILLERS = PRODUCTS.filter(
  (p) =>
    p.mainCategory === "dry-fruits" ||
    p.category === "chocolates" ||
    p.category === "kahwa" ||
    p.category === "biscuits"
);

const OCCASIONS = ["Wedding", "Engagement", "Mehndi", "Reception", "Gift", "Eid", "Birthday", "Custom"];
const COLORS = ["Natural", "Walnut Brown", "Ivory", "Crimson Accents", "Gold Trim"];
const WRAPS = ["None", "Cellophane", "Fabric Wrap", "Tissue & Ribbon"];
const RIBBONS = ["None", "Satin Red", "Gold", "Ivory", "Deep Maroon"];
const DECORS = ["None", "Dried Flowers", "Pine Cones", "Simple Bow", "Festive"];
const FILLINGS = ["Paper Shred", "Fabric Liner", "Hay", "None"];
const THEMES = ["Classic", "Rustic", "Luxury", "Kashmiri Traditional", "Minimal"];

const emptyCustom: TokriCustomization = {
  color: "Natural",
  wrappingStyle: "None",
  ribbon: "None",
  decoration: "None",
  filling: "Paper Shred",
  theme: "Classic",
  nameInitials: "",
  occasion: "Wedding",
  customMessage: "",
};

export default function BuildTokriPage() {
  const [step, setStep] = useState(1);
  const [basket, setBasket] = useState<BasketOption | null>(null);
  const [items, setItems] = useState<TokriItem[]>([]);
  const [custom, setCustom] = useState<TokriCustomization>(emptyCustom);
  const { addTokri } = useCart();
  const [added, setAdded] = useState(false);

  const productsTotal = useMemo(
    () => items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    [items]
  );
  const customFee = useMemo(() => {
    let fee = 0;
    if (custom.wrappingStyle !== "None") fee += 80;
    if (custom.ribbon !== "None") fee += 50;
    if (custom.decoration !== "None") fee += 100;
    if (custom.nameInitials) fee += 60;
    if (custom.customMessage) fee += 40;
    return fee;
  }, [custom]);
  const basketPrice = basket?.price ?? 0;
  const total = basketPrice + productsTotal + customFee;

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { productId: product.id, quantity: 1, product }];
    });
  };

  const updateItemQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i))
      );
    }
  };

  const handleAddToCart = () => {
    if (!basket) return;
    addTokri({ basket, items, customization: custom }, total);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pb-24 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-crimson">Customize</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Build Your Tokri
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Create a personalized basket step by step. Choose the basket, fill it,
            customize the look, and see the estimated total live.
          </p>
        </div>
      </div>

      <div className="border-b border-border bg-cream-dark">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8 no-scrollbar">
          {[
            { n: 1, label: "Choose Basket" },
            { n: 2, label: "Add Products" },
            { n: 3, label: "Customize" },
            { n: 4, label: "Review & Add" },
          ].map((s) => (
            <button
              key={s.n}
              type="button"
              onClick={() => setStep(s.n)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
                step === s.n ? "bg-crimson text-white" : step > s.n ? "bg-white text-charcoal border border-border" : "bg-transparent text-muted"
              )}
            >
              <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs", step === s.n ? "bg-white/20" : "bg-border")}>
                {s.n}
              </span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div>
                <h2 className="mb-6 font-serif text-2xl font-semibold">Choose Your Basket</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {BASKET_OPTIONS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => { setBasket(b); setStep(2); }}
                      className={cn(
                        "flex flex-col rounded-xl border p-4 text-left transition-all hover:shadow-md",
                        basket?.id === b.id ? "border-crimson bg-crimson-soft ring-1 ring-crimson" : "border-border bg-white"
                      )}
                    >
                      <div className="mb-3 flex aspect-[4/3] items-center justify-center rounded-lg placeholder-basket text-4xl">🧺</div>
                      <h3 className="font-medium">{b.name}</h3>
                      <p className="mt-1 text-xs text-muted">{b.dimensions}</p>
                      <p className="mt-2 font-serif text-lg font-semibold">{formatPrice(b.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-semibold">Choose What Goes Inside</h2>
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-muted hover:text-crimson">← Change basket</button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {FILLERS.map((p) => {
                    const inTokri = items.find((i) => i.productId === p.id);
                    return (
                      <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-white p-3">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg placeholder-dryfruit text-2xl">🥜</div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-medium line-clamp-1">{p.name}</h3>
                          <p className="text-xs text-muted">{formatPrice(p.price)} / {p.unit}</p>
                        </div>
                        {inTokri ? (
                          <div className="flex items-center rounded-lg border border-border">
                            <button type="button" className="h-8 w-8 text-sm" onClick={() => updateItemQty(p.id, inTokri.quantity - 1)}>−</button>
                            <span className="w-7 text-center text-sm">{inTokri.quantity}</span>
                            <button type="button" className="h-8 w-8 text-sm" onClick={() => updateItemQty(p.id, inTokri.quantity + 1)}>+</button>
                          </div>
                        ) : (
                          <button type="button" onClick={() => addItem(p)} className="rounded-lg bg-crimson px-3 py-1.5 text-xs font-medium text-white hover:bg-crimson-dark">+ Add</button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="button" onClick={() => setStep(3)} className="rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white hover:bg-crimson-dark">
                    Continue to Customize →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mb-6 font-serif text-2xl font-semibold">Customize Your Tokri</h2>
                <div className="space-y-5 rounded-xl border border-border bg-white p-5">
                  {["color", "wrappingStyle", "ribbon", "decoration", "filling", "theme", "occasion"].map((field) => {
                    const opts = field === "color" ? COLORS : field === "wrappingStyle" ? WRAPS : field === "ribbon" ? RIBBONS : field === "decoration" ? DECORS : field === "filling" ? FILLINGS : field === "theme" ? THEMES : OCCASIONS;
                    const labels: Record<string, string> = { color: "Basket Colour", wrappingStyle: "Wrapping Style", ribbon: "Ribbon", decoration: "Decoration", filling: "Filling Material", theme: "Theme", occasion: "Occasion" };
                    return (
                      <div key={field}>
                        <label className="mb-1.5 block text-sm font-medium">{labels[field]}</label>
                        <select
                          value={(custom as any)[field]}
                          onChange={(e) => setCustom({ ...custom, [field]: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-crimson"
                        >
                          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    );
                  })}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Name / Initials</label>
                    <input type="text" value={custom.nameInitials} onChange={(e) => setCustom({ ...custom, nameInitials: e.target.value })} placeholder="e.g. A & S" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Custom Message</label>
                    <textarea value={custom.customMessage} onChange={(e) => setCustom({ ...custom, customMessage: e.target.value })} placeholder='e.g. "Congratulations on your wedding"' rows={3} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button type="button" onClick={() => setStep(2)} className="text-sm text-muted hover:text-crimson">← Back</button>
                  <button type="button" onClick={() => setStep(4)} className="rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white hover:bg-crimson-dark">Review Your Tokri →</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="mb-6 font-serif text-2xl font-semibold">Your Tokri Preview</h2>
                <div className="rounded-xl border border-border bg-white p-6">
                  <div className="mb-6 flex aspect-video items-center justify-center rounded-xl placeholder-basket text-6xl">🧺</div>
                  {items.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {items.map((i) => (
                        <div key={i.productId} className="flex items-center gap-1.5 rounded-full border border-border bg-cream px-3 py-1 text-xs">
                          🥜 {i.product.name} × {i.quantity}
                        </div>
                      ))}
                    </div>
                  )}
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-muted">Basket</dt><dd className="font-medium">{basket?.name ?? "—"} · {formatPrice(basketPrice)}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted">Products</dt><dd className="font-medium">{formatPrice(productsTotal)}</dd></div>
                    <div className="flex justify-between"><dt className="text-muted">Customization</dt><dd className="font-medium">{formatPrice(customFee)}</dd></div>
                    {custom.customMessage && <div className="pt-2 text-muted italic">“{custom.customMessage}”</div>}
                  </dl>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setStep(3)} className="text-sm text-muted hover:text-crimson">← Edit</button>
                  <button type="button" onClick={handleAddToCart} disabled={!basket || added} className={cn("rounded-full px-7 py-3 text-sm font-semibold text-white", added ? "bg-green-700" : "bg-crimson hover:bg-crimson-dark disabled:opacity-50")}>
                    {added ? "Added to Cart ✓" : "ADD CUSTOM TOKRI TO CART"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-serif text-lg font-semibold">Your Tokri</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted">Basket</dt><dd>{formatPrice(basketPrice)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Products</dt><dd>{formatPrice(productsTotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Customization</dt><dd>{formatPrice(customFee)}</dd></div>
                <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
                  <dt>Estimated Total</dt>
                  <dd className="font-serif text-xl text-crimson">{formatPrice(total)}</dd>
                </div>
              </dl>
              {basket && <p className="mt-3 text-xs text-muted">{basket.name} · {items.length} product{items.length !== 1 ? "s" : ""}</p>}
              {step < 4 && basket && (
                <button type="button" onClick={() => setStep(Math.min(4, step + 1))} className="mt-4 w-full rounded-lg bg-crimson py-2.5 text-sm font-medium text-white hover:bg-crimson-dark">Continue</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
