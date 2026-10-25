"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";

type Fulfillment = "delivery" | "pickup";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    area: "",
    city: "Anantnag",
    district: "Anantnag",
    pincode: "",
    specialInstructions: "",
    preferredDeliveryDate: "",
    website: "",
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted">Your cart is empty</p>
        <Link href="/shop" className="mt-4 inline-block text-crimson hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, fulfillment, items }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(
          data.error ||
            "Could not submit your order. Please check your details and try again."
        );
        setSubmitting(false);
        return;
      }
      try {
        sessionStorage.setItem(
          "dispomart-last-order",
          JSON.stringify({
            orderId: data.orderId,
            total: data.total,
            status: data.status,
            name: form.fullName,
            itemCount: items.length,
          })
        );
      } catch {
        /* ignore */
      }
      clearCart();
      router.push(`/order-confirmation?id=${encodeURIComponent(data.orderId)}`);
    } catch {
      setError(
        "Network error. Please check your connection and try again. Your cart has been kept."
      );
      setSubmitting(false);
    }
  };

  const field = (
    label: string,
    key: keyof typeof form,
    opts?: { required?: boolean; type?: string; span?: boolean; placeholder?: string }
  ) => (
    <div className={opts?.span ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">
        {label}
        {opts?.required !== false && (
          <span className="text-crimson" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      <input
        required={opts?.required !== false}
        type={opts?.type || "text"}
        value={form[key]}
        onChange={set(key)}
        placeholder={opts?.placeholder}
        className="w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-crimson focus:ring-1 focus:ring-crimson/30"
      />
    </div>
  );

  return (
    <div className="pb-24 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-crimson">
            Checkout
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight">
            Submit your order request
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Complete the form below. DispoMart will review your request and
            confirm availability before processing.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
              <h2 className="font-serif text-lg font-semibold">Contact details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {field("Full name", "fullName", { span: true })}
                {field("Mobile number", "mobile", { type: "tel", placeholder: "10-digit mobile" })}
                {field("Email address", "email", { type: "email" })}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
              <h2 className="font-serif text-lg font-semibold">Delivery address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {field("Full address", "address", { span: true, placeholder: "House / street" })}
                {field("Area or locality", "area")}
                {field("City or town", "city")}
                {field("District", "district")}
                {field("PIN code", "pincode", { placeholder: "6 digits" })}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
              <h2 className="font-serif text-lg font-semibold">
                How would you like to receive your order?
              </h2>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                {(
                  [
                    {
                      id: "delivery" as const,
                      label: "Home delivery",
                      desc: "We will arrange delivery after confirmation",
                    },
                    {
                      id: "pickup" as const,
                      label: "Collect from shop",
                      desc: "Mattan Chowk, Anantnag",
                    },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFulfillment(opt.id)}
                    className={cn(
                      "flex-1 rounded-xl border p-4 text-left transition-colors",
                      fulfillment === opt.id
                        ? "border-crimson bg-crimson/5 ring-1 ring-crimson/20"
                        : "border-border hover:bg-cream-dark"
                    )}
                  >
                    <span className="block text-sm font-semibold">{opt.label}</span>
                    <span className="mt-0.5 block text-xs text-muted">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-white p-5 sm:p-6">
              <h2 className="font-serif text-lg font-semibold">Optional details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Preferred delivery / collection date
                  </label>
                  <input
                    type="date"
                    value={form.preferredDeliveryDate}
                    onChange={set("preferredDeliveryDate")}
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-crimson"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">
                    Special instructions
                  </label>
                  <textarea
                    value={form.specialInstructions}
                    onChange={set("specialInstructions")}
                    rows={3}
                    placeholder="Wedding date, notes for packaging, etc."
                    className="w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-crimson"
                  />
                </div>
              </div>
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                </label>
              </div>
            </section>

            {error && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}
          </div>

          <div>
            <div className="sticky top-24 space-y-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h2 className="font-serif text-lg font-semibold">Order summary</h2>
              <ul className="max-h-56 space-y-2 overflow-y-auto text-sm">
                {items.map((i) => (
                  <li key={i.id} className="flex justify-between gap-2">
                    <span className="truncate text-charcoal-soft">
                      {i.name}
                      {i.type === "traem" && i.guestCount ? ` (${i.guestCount} sets)` : ""}
                    </span>
                    <span className="shrink-0 font-medium">{formatPrice(i.price)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-medium">Estimated total</span>
                <span className="font-serif text-xl font-semibold text-crimson">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                This is an order <strong>request</strong>. Final confirmation,
                availability and any delivery charges will be shared by DispoMart
                after review.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-colors",
                  submitting ? "bg-charcoal/60 cursor-wait" : "bg-crimson hover:bg-crimson-dark"
                )}
              >
                {submitting ? "Submitting…" : "Submit order request"}
              </button>
              <Link href="/cart" className="block text-center text-sm text-muted hover:text-crimson">
                ← Back to cart
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
