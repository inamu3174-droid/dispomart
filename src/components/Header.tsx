"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/build-tokri", label: "Build Your Tokri" },
  { href: "/mahraaz-traem", label: "Mahraaz Traem" },
  { href: "/common-traem", label: "Common Traem" },
  { href: "/dry-fruits", label: "Dry Fruits" },
  { href: "/bags", label: "Bags" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "bg-cream/95 backdrop-blur-md border-border shadow-sm"
            : "bg-cream border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-18">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-semibold tracking-wide text-charcoal">
                DISPOMART
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
                Everything Under One Roof
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-crimson"
                      : "text-charcoal-soft hover:text-crimson"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-cream-dark"
              >
                <SearchIcon />
              </button>
              <Link
                href="/wishlist"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-cream-dark sm:flex"
                aria-label="Wishlist"
              >
                <HeartIcon />
              </Link>
              <button
                type="button"
                aria-label="Cart"
                onClick={() => toggleCart(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-cream-dark"
              >
                <CartIcon />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-crimson px-1 text-[11px] font-semibold text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>
              <Link
                href="/account"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-cream-dark sm:flex"
                aria-label="Account"
              >
                <UserIcon />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal hover:bg-cream-dark lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="border-t border-border py-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cups, baskets, dry fruits, traem…"
                  className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-crimson"
                  autoFocus
                />
                <button
                  type="submit"
                  className="rounded-lg bg-crimson px-5 py-2.5 text-sm font-medium text-white hover:bg-crimson-dark"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-cream lg:hidden">
            <nav className="mx-auto max-w-7xl space-y-0.5 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-base font-medium",
                    pathname === link.href
                      ? "bg-crimson-soft text-crimson"
                      : "text-charcoal hover:bg-cream-dark"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M6 6h15l-1.5 9h-12z" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M6 6L5 2H2" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
