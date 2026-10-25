import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "Returns and refunds policy for DispoMart, Anantnag, Kashmir.",
};

export default function ReturnsPage() {
  return (
    <div className="pb-20">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight">
            Returns & Refunds
          </h1>
          <p className="mt-2 text-muted">
            Our approach to returns for disposable and custom products.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 text-sm leading-relaxed text-charcoal-soft sm:px-6 lg:px-8">
        <section>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Custom Tokri & personalised items
          </h2>
          <p className="mt-3">
            Custom-built Tokri and personalised arrangements are prepared to
            order. These are generally not returnable once confirmed, unless
            there is a clear defect attributable to us.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Standard catalogue products
          </h2>
          <p className="mt-3">
            If you receive damaged or incorrect items, please contact us as soon
            as possible with your Order ID and a description of the issue. We
            will work with you on a fair resolution, which may include
            replacement or a refund of the affected items.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            Traem packages
          </h2>
          <p className="mt-3">
            Fixed Traem packages are prepared for events. Changes or
            cancellations should be requested before we begin packing. After
            confirmation and packing, cancellations may not be possible.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            How to reach us
          </h2>
          <p className="mt-3">
            Use the{" "}
            <Link href="/contact" className="text-crimson hover:underline">
              contact form
            </Link>{" "}
            or visit the shop at Mattan Chowk, Anantnag, and quote your Order ID.
          </p>
        </section>
      </div>
    </div>
  );
}
