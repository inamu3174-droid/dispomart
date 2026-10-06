"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, buildOrderWhatsAppMessage, generateWhatsAppLink } from "@/lib/utils";
import { SITE_SETTINGS } from "@/data/products";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState<"cod" | "online" | "request-confirmation">("cod");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    area: "",
    city: "Anantnag",
    pincode: "",
    instructions: "",
  });

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted">Your cart is empty</p>
        <Link href="/shop" className="mt-4 inline-block text-crimson hover:underline">
          Go to Shop
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="font-serif text-3xl font-semibold">Order Received</h1>
        <p className="mt-3 text-muted">
          Thank you, {form.fullName}. We will contact you shortly to confirm your order.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  const itemsSummary = items
    .map((i) => `• ${i.name} ×${i.quantity} – ₹${i.price}`)
    .join("\n");

  const waMessage = buildOrderWhatsAppMessage({
    customerName: form.fullName || undefined,
    itemsSummary,
    total: subtotal,
    preference: orderType === "pickup" ? "Store Pickup" : "Delivery",
  });

  const waLink = generateWhatsAppLink(SITE_SETTINGS.whatsappNumber, waMessage);

  return (
    <div className="pb-24 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold">Checkout</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-xl border border-border bg-white p-5">
              <h2 className="font-serif text-lg font-semibold mb-4">Contact & Delivery</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Full Name *</label>
                  <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Phone Number *</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">PIN Code</label>
                  <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Delivery Address</label>
                  <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Area / Locality</label>
                  <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">City</label>
                  <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Special Instructions</label>
                  <textarea value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} rows={2} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson" />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-white p-5">
              <h2 className="font-serif text-lg font-semibold mb-4">Order Type</h2>
              <div className="flex gap-3">
                {(["delivery", "pickup"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setOrderType(t)} className={`flex-1 rounded-lg border py-3 text-sm font-medium capitalize ${
                    orderType === t ? "border-crimson bg-crimson-soft text-crimson" : "border-border hover:bg-cream-dark"
                  }`}>{t === "delivery" ? "Delivery" : "Store Pickup"}</button>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-white p-5">
              <h2 className="font-serif text-lg font-semibold mb-4">Payment</h2>
              <div className="space-y-2">
                {[
                  { id: "cod" as const, label: "Cash on Delivery" },
                  { id: "request-confirmation" as const, label: "Request Confirmation Before Processing" },
                  { id: "online" as const, label: "Online Payment (coming soon)" },
                ].map((opt) => (
                  <label key={opt.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${
                    payment === opt.id ? "border-crimson bg-crimson-soft" : "border-border"
                  }`}>
                    <input type="radio" name="payment" checked={payment === opt.id} onChange={() => setPayment(opt.id)} className="accent-crimson" />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <div>
            <div className="sticky top-24 rounded-xl border border-border bg-white p-5 space-y-4">
              <h2 className="font-serif text-lg font-semibold">Order Summary</h2>
              <ul className="max-h-40 space-y-1 overflow-y-auto text-sm">
                {items.map((i) => (
                  <li key={i.id} className="flex justify-between gap-2">
                    <span className="truncate">{i.name}</span>
                    <span>{formatPrice(i.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t border-border pt-3 font-semibold">
                <span>Total</span>
                <span className="font-serif text-xl text-crimson">{formatPrice(subtotal)}</span>
              </div>
              <button type="submit" className="w-full rounded-lg bg-crimson py-3 text-sm font-semibold text-white hover:bg-crimson-dark">
                Place Order
              </button>
              {SITE_SETTINGS.whatsappNumber ? (
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="block w-full rounded-lg border border-green-700 py-2.5 text-center text-sm font-medium text-green-800 hover:bg-green-50">
                  Order on WhatsApp
                </a>
              ) : (
                <p className="text-center text-xs text-muted">
                  WhatsApp ordering available once number is configured in settings.
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
