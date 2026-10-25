import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Delivery and store collection information for DispoMart, Mattan Chowk, Anantnag, Kashmir.",
};

export default function ShippingPage() {
  return (
    <div className="pb-20">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight">
            Shipping & Delivery
          </h1>
          <p className="mt-2 text-muted">
            How orders from DispoMart are fulfilled.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 text-sm leading-relaxed text-charcoal-soft sm:px-6 lg:px-8">
        <section>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Order process
          </h2>
          <p className="mt-3">
            Orders submitted through this website are treated as{" "}
            <strong>order requests</strong>. DispoMart reviews availability and
            confirms details with you before processing payment or dispatch.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Delivery
          </h2>
          <p className="mt-3">
            We primarily serve Anantnag and surrounding areas in Kashmir.
            Delivery charges, if any, depend on location and order size and will
            be shared when we confirm your order.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Store collection
          </h2>
          <p className="mt-3">
            You may choose to collect your order from our shop at Mattan Chowk,
            Anantnag. We will agree a collection time after confirming your
            order.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Wedding & bulk orders
          </h2>
          <p className="mt-3">
            For Traem, large Tokri orders and wedding quantities, please allow
            extra time for preparation. Share your preferred date in the
            checkout form so we can plan accordingly.
          </p>
        </section>
        <p className="text-muted">
          Questions?{" "}
          <Link href="/contact" className="text-crimson hover:underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
