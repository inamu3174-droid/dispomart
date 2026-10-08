import { TraemPackage } from "@/types";

/** Fixed quantity presets for all Traem packages */
export const TRAEM_QTY_PRESETS = [10, 15, 20, 25, 30, 50] as const;

/**
 * Mahraaz Traem — one complete fixed package.
 * Customer only chooses how many full sets they need (no item customization).
 */
export const MAHRAAZ_TRAEM: TraemPackage = {
  id: "mh-complete",
  name: "Mahraaz Traem",
  type: "mahraaz",
  guestCount: 0,
  price: 4200,
  description:
    "Complete ready-made Traem for Mahraaz and his people. Every essential item included — order by number of full sets only.",
  items: [
    { productId: "p-cups-1", quantity: 1, name: "Disposable Cups (pack of 100)" },
    { productId: "p-plates-1", quantity: 1, name: "Disposable Plates (pack of 100)" },
    { productId: "p-bowls-1", quantity: 1, name: "Disposable Bowls (pack of 100)" },
    { productId: "p-salad-1", quantity: 1, name: "Salad Plates (pack of 100)" },
    { productId: "p-goshtab-1", quantity: 1, name: "Goshtab Cups (pack of 100)" },
    { productId: "p-wazwaan-1", quantity: 1, name: "Wazwaan Paper (pack)" },
    { productId: "p-spoons-1", quantity: 1, name: "Disposable Spoons (pack of 100)" },
    { productId: "p-glasses-1", quantity: 1, name: "Disposable Glasses (pack of 100)" },
  ],
};

/**
 * Common Traem — Plastic Disposable (fixed package, no item customization).
 */
export const PLASTIC_TRAEM: TraemPackage = {
  id: "ct-plastic",
  name: "Plastic Disposable Traem",
  type: "common",
  guestCount: 0,
  price: 2800,
  description:
    "Complete plastic disposable set for weddings and events. All essential plastic items included in one Traem.",
  items: [
    { productId: "p-cups-1", quantity: 1, name: "Plastic Cups (pack of 100)" },
    { productId: "p-plates-1", quantity: 1, name: "Plastic Plates (pack of 100)" },
    { productId: "p-bowls-1", quantity: 1, name: "Plastic Bowls (pack of 100)" },
    { productId: "p-salad-1", quantity: 1, name: "Salad Plates (pack of 100)" },
    { productId: "p-goshtab-1", quantity: 1, name: "Goshtab Cups (pack of 100)" },
    { productId: "p-spoons-1", quantity: 1, name: "Plastic Spoons (pack of 100)" },
    { productId: "p-glasses-1", quantity: 1, name: "Plastic Glasses (pack of 100)" },
    { productId: "p-wazwaan-1", quantity: 1, name: "Wazwaan / Serving Paper (pack)" },
  ],
};

/**
 * Common Traem — Biodegradable / eco-friendly (fixed package, no item customization).
 */
export const BIO_TRAEM: TraemPackage = {
  id: "ct-bio",
  name: "Biodegradable Disposable Traem",
  type: "common",
  guestCount: 0,
  price: 3600,
  description:
    "Complete biodegradable / eco-friendly disposable set for weddings and events. All essential green items in one Traem.",
  items: [
    { productId: "p-cups-1", quantity: 1, name: "Biodegradable Cups (pack of 100)" },
    { productId: "p-plates-1", quantity: 1, name: "Biodegradable Plates (pack of 100)" },
    { productId: "p-bowls-1", quantity: 1, name: "Biodegradable Bowls (pack of 100)" },
    { productId: "p-salad-1", quantity: 1, name: "Biodegradable Salad Plates (pack of 100)" },
    { productId: "p-goshtab-1", quantity: 1, name: "Biodegradable Goshtab Cups (pack of 100)" },
    { productId: "p-spoons-1", quantity: 1, name: "Biodegradable Spoons (pack of 100)" },
    { productId: "p-glasses-1", quantity: 1, name: "Biodegradable Glasses (pack of 100)" },
    { productId: "p-wazwaan-1", quantity: 1, name: "Eco Serving / Wazwaan Paper (pack)" },
  ],
};

/** @deprecated use MAHRAAZ_TRAEM */
export const MAHRAAZ_PACKAGES: TraemPackage[] = [MAHRAAZ_TRAEM];
