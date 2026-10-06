import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = [
  { href: "/build-tokri", title: "Custom Tokri", emoji: "🧺", desc: "Build your own basket" },
  { href: "/mahraaz-traem", title: "Mahraaz Traem", emoji: "👑", desc: "For Mahraaz & his people" },
  { href: "/common-traem", title: "Common Traem", emoji: "🍽", desc: "Exact quantities you need" },
  { href: "/dry-fruits", title: "Dry Fruits", emoji: "🥜", desc: "Premium & gift packs" },
  { href: "/bags", title: "Bags", emoji: "🛍", desc: "Packaging & carry bags" },
  { href: "/shop", title: "Wedding Essentials", emoji: "🎁", desc: "Cups, plates & more" },
];

const FEATURED = PRODUCTS.filter((p) => p.featured).slice(0, 4);

export default function HomePage() {
  return (
    <div className="pb-20 lg:pb-0">
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-crimson)_0%,_transparent_50%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-stone-400">
              Mattan Chowk · Anantnag · Kashmir
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              YOUR WEDDING.
              <br />
              YOUR TRAEM.
              <br />
              <span className="text-crimson">YOUR WAY.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
              From beautifully customized Tokri to complete wedding Traem —
              everything you need, available at DISPOMART.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/build-tokri"
                className="inline-flex items-center justify-center rounded-full bg-crimson px-7 py-3.5 text-sm font-semibold text-white hover:bg-crimson-dark"
              >
                BUILD YOUR TOKRI
              </Link>
              <Link
                href="/mahraaz-traem"
                className="inline-flex items-center justify-center rounded-full border border-stone-500 px-7 py-3.5 text-sm font-semibold text-cream hover:border-cream hover:bg-white/5"
              >
                SHOP WEDDING TRAEM
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-medium text-stone-300 hover:text-cream"
              >
                EXPLORE PRODUCTS →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Shop by Need
          </h2>
          <p className="mt-2 text-muted">
            Everything for your wedding and everyday essentials
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex flex-col items-center rounded-2xl border border-border bg-white p-5 text-center transition-all hover:border-crimson/30 hover:shadow-md"
            >
              <span className="mb-3 text-3xl transition-transform group-hover:scale-110">
                {cat.emoji}
              </span>
              <h3 className="text-sm font-semibold text-charcoal group-hover:text-crimson">
                {cat.title}
              </h3>
              <p className="mt-1 text-xs text-muted">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cream-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-crimson">
                Made Your Way
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Build a Tokri exactly how you want it
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                Choose your basket, fill it with dry fruits, Kahwa, chocolates
                and more, then personalize with colour, ribbon, message and
                occasion. See your estimated total live as you build.
              </p>
              <Link
                href="/build-tokri"
                className="mt-8 inline-flex rounded-full bg-crimson px-7 py-3.5 text-sm font-semibold text-white hover:bg-crimson-dark"
              >
                START CUSTOMIZING
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Wooden Basket", emoji: "🪵" },
                { label: "Premium Fill", emoji: "🥜" },
                { label: "Ribbon & Wrap", emoji: "🎀" },
                { label: "Custom Message", emoji: "✉️" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center rounded-xl border border-border bg-white p-6 text-center"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="mt-2 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight">
              Featured
            </h2>
            <p className="mt-1 text-muted">Popular choices from DISPOMART</p>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-medium text-crimson hover:underline sm:block"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-serif text-3xl font-semibold">
            Why DISPOMART?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "Wide Selection", text: "Everything from everyday essentials to complete wedding supplies." },
              { title: "Flexible Quantities", text: "Buy exactly what you need — no forced packages." },
              { title: "Customizable", text: "Build your own Tokri and Traem the way you want." },
              { title: "Local & Convenient", text: "Serving customers from Anantnag and surrounding areas." },
              { title: "Value Focused", text: "Practical products at genuine, competitive rates." },
            ].map((item) => (
              <div key={item.title} className="text-center sm:text-left">
                <h3 className="font-semibold text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Ready for your wedding Traem?
          </h2>
          <p className="mt-4 text-stone-300">
            Plan quantities for any number of guests, or start building a
            custom Tokri in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/common-traem"
              className="rounded-full bg-crimson px-7 py-3.5 text-sm font-semibold text-white hover:bg-crimson-dark"
            >
              Plan Common Traem
            </Link>
            <Link
              href="/mahraaz-traem"
              className="rounded-full border border-stone-500 px-7 py-3.5 text-sm font-semibold hover:border-cream"
            >
              Mahraaz Traem
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
