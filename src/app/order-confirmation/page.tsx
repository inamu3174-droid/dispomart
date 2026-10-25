"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

type LastOrder = {
  orderId: string;
  total: number;
  status: string;
  name: string;
  itemCount: number;
};

function ConfirmationContent() {
  const params = useSearchParams();
  const idFromUrl = params.get("id") || "";
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("dispomart-last-order");
      if (raw) {
        const parsed = JSON.parse(raw) as LastOrder;
        if (!idFromUrl || parsed.orderId === idFromUrl) {
          setOrder(parsed);
        } else {
          setOrder({
            orderId: idFromUrl,
            total: 0,
            status: "pending_review",
            name: "",
            itemCount: 0,
          });
        }
      } else if (idFromUrl) {
        setOrder({
          orderId: idFromUrl,
          total: 0,
          status: "pending_review",
          name: "",
          itemCount: 0,
        });
      }
    } catch {
      if (idFromUrl) {
        setOrder({
          orderId: idFromUrl,
          total: 0,
          status: "pending_review",
          name: "",
          itemCount: 0,
        });
      }
    }
  }, [idFromUrl]);

  if (!order && !idFromUrl) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold">No order found</h1>
        <p className="mt-2 text-muted">
          If you just submitted an order, check your email for the Order ID.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const orderId = order?.orderId || idFromUrl;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:py-20">
      <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl text-green-700"
          aria-hidden
        >
          ✓
        </div>
        <h1 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
          Your order request has been submitted successfully
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {order?.name ? `Thank you, ${order.name}. ` : ""}
          DispoMart has received your request and will review it shortly.
        </p>

        <div className="mt-8 rounded-xl bg-cream-dark/80 px-5 py-4 text-left text-sm">
          <p className="flex justify-between gap-3">
            <span className="text-muted">Order ID</span>
            <span className="font-mono font-semibold tracking-wide">
              {orderId}
            </span>
          </p>
          {order && order.total > 0 && (
            <p className="mt-2 flex justify-between gap-3">
              <span className="text-muted">Estimated total</span>
              <span className="font-semibold text-crimson">
                {formatPrice(order.total)}
              </span>
            </p>
          )}
          <p className="mt-2 flex justify-between gap-3">
            <span className="text-muted">Status</span>
            <span className="font-medium">Pending review</span>
          </p>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          This is <strong>not</strong> a confirmed order yet. We will contact
          you to confirm availability, final amount and delivery or collection
          details. Please keep your Order ID for reference.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white hover:bg-crimson-dark"
          >
            Back to home
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-cream-dark"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted">Loading…</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
