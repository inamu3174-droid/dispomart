import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold tracking-wide">
              DISPOMART
            </h3>
            <p className="text-sm leading-relaxed text-stone-300">
              Everything You Need, Under One Roof.
            </p>
            <p className="text-sm text-stone-400">
              Mattan Chowk, Anantnag, Kashmir
            </p>
            <a
              href="#whatsapp"
              className="inline-flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
            >
              Order on WhatsApp
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-200">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><Link href="/shop" className="hover:text-cream">All Products</Link></li>
              <li><Link href="/build-tokri" className="hover:text-cream">Build Your Tokri</Link></li>
              <li><Link href="/mahraaz-traem" className="hover:text-cream">Mahraaz Traem</Link></li>
              <li><Link href="/common-traem" className="hover:text-cream">Common Traem</Link></li>
              <li><Link href="/dry-fruits" className="hover:text-cream">Dry Fruits</Link></li>
              <li><Link href="/bags" className="hover:text-cream">Bags & Packaging</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-200">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li><Link href="/about" className="hover:text-cream">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cream">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-cream">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-cream">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-200">
              Visit Us
            </h4>
            <p className="text-sm leading-relaxed text-stone-400">
              Come to our store at Mattan Chowk, Anantnag for the full range of
              wedding supplies, baskets, dry fruits and everyday essentials.
            </p>
            <p className="mt-4 text-sm text-stone-500">
              Serving Anantnag & surrounding areas
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-700 pt-8 sm:flex-row">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} DISPOMART. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
