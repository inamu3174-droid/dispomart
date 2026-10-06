import Link from "next/link";

export const metadata = {
  title: "About Us",
  description:
    "DISPOMART – Your trusted destination in Mattan Chowk, Anantnag for everyday essentials, wedding supplies, Traem, baskets, dry fruits, bags and customized gifting solutions.",
};

export default function AboutPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            About DISPOMART
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-charcoal-soft">
            Your trusted destination in Mattan Chowk, Anantnag for everyday
            essentials, wedding supplies, Traem, baskets, dry fruits, bags and
            customized gifting solutions.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            At DISPOMART we believe wedding preparations and daily shopping
            should be simple. Whether you need a complete Mahraaz Traem, exact
            quantities of cups and plates for a gathering, a custom-filled
            wooden Tokri, or everyday packaging — we keep a practical range
            under one roof so you can find what you need without the hassle.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            We serve customers from Anantnag and the surrounding areas of
            Kashmir. Visit us at Mattan Chowk, or order online and choose
            delivery or store pickup.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-crimson px-6 py-2.5 text-sm font-semibold text-white hover:bg-crimson-dark"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-cream-dark"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
