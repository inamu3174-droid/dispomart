import Link from "next/link";

export const metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-border bg-cream shadow-sm">
        {/* Official DispoMart logo as default profile DP */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/api/brand/logo"
          alt="DispoMart – Since 2026"
          width={112}
          height={112}
          className="h-full w-full object-cover"
        />
      </div>
      <h1 className="font-serif text-2xl font-semibold text-charcoal">
        DispoMart
      </h1>
      <p className="mt-1 text-sm text-muted">
        Since 2026 · Mattan Chowk, Anantnag
      </p>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Customer accounts will be available soon. For orders and enquiries, use
        WhatsApp or visit our store.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white hover:bg-crimson-dark"
        >
          Continue Shopping
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-cream-dark"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
