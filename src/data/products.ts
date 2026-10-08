import { Product, BasketOption, TraemPackage } from "@/types";
import { CHOCOLATE_PRODUCTS } from "./chocolates";

export const BASKET_OPTIONS: BasketOption[] = [
  { id: "wb-small", name: "Wooden Basket – Small", type: "wooden", size: "small", price: 350, dimensions: "20 × 15 × 10 cm", image: "/images/baskets/wooden-small.jpg", description: "Handcrafted wooden basket ideal for intimate gifting." },
  { id: "wb-medium", name: "Wooden Basket – Medium", type: "wooden", size: "medium", price: 550, dimensions: "30 × 22 × 14 cm", image: "/images/baskets/wooden-medium.jpg", description: "Classic Kashmiri wooden basket for wedding Tokri." },
  { id: "wb-large", name: "Wooden Basket – Large", type: "wooden", size: "large", price: 850, dimensions: "40 × 30 × 18 cm", image: "/images/baskets/wooden-large.jpg", description: "Spacious premium wooden basket for grand arrangements." },
  { id: "pb-small", name: "Plastic Basket – Small", type: "plastic", size: "small", price: 120, dimensions: "22 × 16 × 10 cm", image: "/images/baskets/plastic-small.jpg", description: "Durable plastic basket, practical and lightweight." },
  { id: "pb-medium", name: "Plastic Basket – Medium", type: "plastic", size: "medium", price: 180, dimensions: "32 × 24 × 14 cm", image: "/images/baskets/plastic-medium.jpg", description: "Versatile medium plastic basket for everyday and events." },
  { id: "pb-large", name: "Plastic Basket – Large", type: "plastic", size: "large", price: 280, dimensions: "42 × 32 × 18 cm", image: "/images/baskets/plastic-large.jpg", description: "Large capacity plastic basket for bulk needs." },
  { id: "prem-medium", name: "Premium Basket – Medium", type: "premium", size: "medium", price: 950, dimensions: "32 × 24 × 15 cm", image: "/images/baskets/premium-medium.jpg", description: "Elegant premium finish basket with refined detailing." },
  { id: "prem-large", name: "Premium Basket – Large", type: "premium", size: "large", price: 1450, dimensions: "42 × 32 × 20 cm", image: "/images/baskets/premium-large.jpg", description: "Luxury large basket for special occasions and Mahraaz gifting." },
];

export const PRODUCTS: Product[] = [
  { id: "p-wb-1", slug: "wooden-basket-medium", name: "Wooden Basket Medium", description: "Beautifully crafted wooden basket perfect for custom Tokri and wedding gifting.", price: 550, unit: "piece", category: "wooden-baskets", mainCategory: "baskets", image: "/images/baskets/wooden-medium.jpg", inStock: true, stockQty: 40, featured: true, isBasket: true, basketSize: "medium", dimensions: "30 × 22 × 14 cm", tags: ["basket", "wooden", "wedding", "tokri"] },
  { id: "p-wb-2", slug: "wooden-basket-large", name: "Wooden Basket Large", description: "Spacious handcrafted wooden basket for grand wedding arrangements.", price: 850, unit: "piece", category: "wooden-baskets", mainCategory: "baskets", image: "/images/baskets/wooden-large.jpg", inStock: true, stockQty: 25, isBasket: true, basketSize: "large", dimensions: "40 × 30 × 18 cm", tags: ["basket", "wooden", "large"] },
  { id: "p-pb-1", slug: "plastic-basket-medium", name: "Plastic Basket Medium", description: "Practical and sturdy plastic basket for everyday and event use.", price: 180, unit: "piece", category: "plastic-baskets", mainCategory: "baskets", image: "/images/baskets/plastic-medium.jpg", inStock: true, stockQty: 100, isBasket: true, basketSize: "medium", dimensions: "32 × 24 × 14 cm", tags: ["basket", "plastic"] },
  { id: "p-prem-1", slug: "premium-basket-large", name: "Premium Basket Large", description: "Luxury finish basket ideal for Mahraaz and special gifting.", price: 1450, unit: "piece", category: "premium-baskets", mainCategory: "baskets", image: "/images/baskets/premium-large.jpg", inStock: true, stockQty: 15, featured: true, isBasket: true, basketSize: "large", dimensions: "42 × 32 × 20 cm", tags: ["basket", "premium", "luxury"] },
  { id: "p-cups-1", slug: "disposable-cups-standard", name: "Disposable Cups (Standard)", description: "High-quality disposable cups suitable for wedding gatherings and Wazwaan.", price: 180, unit: "pack of 100", category: "cups", mainCategory: "wedding", image: "/images/wedding/cups.jpg", inStock: true, stockQty: 200, featured: true, tags: ["cups", "disposable", "wedding", "traem"] },
  { id: "p-plates-1", slug: "disposable-plates-standard", name: "Disposable Plates (Standard)", description: "Sturdy disposable plates for wedding and event catering.", price: 220, unit: "pack of 100", category: "plates", mainCategory: "wedding", image: "/images/wedding/plates.jpg", inStock: true, stockQty: 180, featured: true, tags: ["plates", "disposable", "wedding"] },
  { id: "p-bowls-1", slug: "disposable-bowls", name: "Disposable Bowls", description: "Deep disposable bowls perfect for Wazwaan dishes.", price: 200, unit: "pack of 100", category: "bowls", mainCategory: "wedding", image: "/images/wedding/bowls.jpg", inStock: true, stockQty: 150, tags: ["bowls", "disposable", "wazwaan"] },
  { id: "p-salad-1", slug: "salad-plates", name: "Salad Plates", description: "Elegant salad plates for side dishes and starters.", price: 190, unit: "pack of 100", category: "salad-plates", mainCategory: "wedding", image: "/images/wedding/salad-plates.jpg", inStock: true, stockQty: 120, tags: ["salad", "plates", "wedding"] },
  { id: "p-goshtab-1", slug: "goshtab-cups", name: "Goshtab Cups", description: "Special cups designed for serving Goshtab at Kashmiri weddings.", price: 250, unit: "pack of 100", category: "goshtab-cups", mainCategory: "wedding", image: "/images/wedding/goshtab-cups.jpg", inStock: true, stockQty: 90, featured: true, tags: ["goshtab", "cups", "wazwaan", "wedding"] },
  { id: "p-wazwaan-1", slug: "wazwaan-paper", name: "Wazwaan Paper / Serving Sheets", description: "Traditional serving paper essential for authentic Wazwaan presentation.", price: 350, unit: "pack of 50", category: "wazwaan-supplies", mainCategory: "wedding", image: "/images/wedding/wazwaan-paper.jpg", inStock: true, stockQty: 60, tags: ["wazwaan", "paper", "serving"] },
  { id: "p-spoons-1", slug: "disposable-spoons", name: "Disposable Spoons", description: "Strong disposable spoons for complete table settings.", price: 90, unit: "pack of 100", category: "serving-items", mainCategory: "wedding", image: "/images/wedding/spoons.jpg", inStock: true, stockQty: 200, tags: ["spoons", "cutlery", "disposable"] },
  { id: "p-glasses-1", slug: "disposable-glasses", name: "Disposable Glasses", description: "Clear disposable glasses for beverages at events.", price: 160, unit: "pack of 100", category: "disposable-glasses", mainCategory: "wedding", image: "/images/wedding/glasses.jpg", inStock: true, stockQty: 140, tags: ["glasses", "disposable"] },
  { id: "p-almond-1", slug: "almonds-premium", name: "Premium Almonds", description: "High-quality almonds, perfect for Tokri and gifting.", price: 850, unit: "kg", category: "almonds", mainCategory: "dry-fruits", image: "/images/dryfruits/almonds.jpg", inStock: true, stockQty: 50, featured: true, allowCustomQty: true, tokriFillable: true, tokriGroup: "dry-fruits", tags: ["almonds", "dry fruits", "gift", "tokri"] },
  { id: "p-walnut-1", slug: "walnuts-kashmir", name: "Kashmiri Walnuts", description: "Fresh Kashmiri walnuts, a local favourite for gifts and Traem.", price: 780, unit: "kg", category: "walnuts", mainCategory: "dry-fruits", image: "/images/dryfruits/walnuts.jpg", inStock: true, stockQty: 40, featured: true, allowCustomQty: true, tokriFillable: true, tokriGroup: "dry-fruits", tags: ["walnuts", "kashmir", "dry fruits"] },
  { id: "p-cashew-1", slug: "cashews-premium", name: "Premium Cashews", description: "Whole premium cashews for elegant gift arrangements.", price: 950, unit: "kg", category: "cashews", mainCategory: "dry-fruits", image: "/images/dryfruits/cashews.jpg", inStock: true, stockQty: 35, allowCustomQty: true, tokriFillable: true, tokriGroup: "dry-fruits", tags: ["cashews", "dry fruits"] },
  { id: "p-pista-1", slug: "pistachios", name: "Pistachios", description: "Roasted or raw pistachios for premium Tokri filling.", price: 1200, unit: "kg", category: "pistachios", mainCategory: "dry-fruits", image: "/images/dryfruits/pistachios.jpg", inStock: true, stockQty: 25, allowCustomQty: true, tokriFillable: true, tokriGroup: "dry-fruits", tags: ["pistachios", "dry fruits"] },
  { id: "p-raisin-1", slug: "raisins", name: "Raisins", description: "Sweet seedless raisins ideal for mixed dry fruit packs.", price: 320, unit: "kg", category: "raisins", mainCategory: "dry-fruits", image: "/images/dryfruits/raisins.jpg", inStock: true, stockQty: 60, allowCustomQty: true, tokriFillable: true, tokriGroup: "dry-fruits", tags: ["raisins", "dry fruits"] },
  { id: "p-mixed-1", slug: "mixed-dry-fruits", name: "Mixed Dry Fruits Pack", description: "Carefully balanced mix of almonds, cashews, walnuts and raisins.", price: 900, unit: "kg", category: "mixed-dry-fruits", mainCategory: "dry-fruits", image: "/images/dryfruits/mixed.jpg", inStock: true, stockQty: 45, featured: true, allowCustomQty: true, tokriFillable: true, tokriGroup: "dry-fruits", tags: ["mixed", "dry fruits", "gift"] },
  { id: "p-giftbox-1", slug: "premium-dry-fruit-gift-box", name: "Premium Dry Fruit Gift Box", description: "Beautifully packed gift box of premium dry fruits – ready to gift.", price: 1499, unit: "box", category: "premium-gift-packs", mainCategory: "dry-fruits", image: "/images/dryfruits/gift-box.jpg", inStock: true, stockQty: 30, featured: true, tags: ["gift", "box", "premium"] },
  { id: "p-bag-1", slug: "paper-shopping-bags", name: "Paper Shopping Bags", description: "Eco-friendly paper bags for retail and event packaging.", price: 8, unit: "piece", category: "paper-bags", mainCategory: "bags", image: "/images/bags/paper-bag.jpg", inStock: true, stockQty: 500, tags: ["bags", "paper", "shopping"] },
  { id: "p-bag-2", slug: "gift-bags-premium", name: "Premium Gift Bags", description: "Elegant gift bags suitable for wedding and festive gifting.", price: 45, unit: "piece", category: "gift-bags", mainCategory: "bags", image: "/images/bags/gift-bag.jpg", inStock: true, stockQty: 200, featured: true, tags: ["gift", "bags", "wedding"] },
  { id: "p-bag-3", slug: "wedding-bags", name: "Wedding Carry Bags", description: "Durable carry bags designed for wedding supplies and Traem.", price: 25, unit: "piece", category: "wedding-bags", mainCategory: "bags", image: "/images/bags/wedding-bag.jpg", inStock: true, stockQty: 300, tags: ["wedding", "bags"] },
  { id: "p-bag-4", slug: "plastic-carry-bags", name: "Plastic Carry Bags", description: "Strong plastic bags for everyday and bulk packaging.", price: 5, unit: "piece", category: "plastic-bags", mainCategory: "bags", image: "/images/bags/plastic-bag.jpg", inStock: true, stockQty: 800, tags: ["plastic", "bags"] },
  ...CHOCOLATE_PRODUCTS,
  { id: "p-kahwa-1", slug: "kashmiri-kahwa", name: "Kashmiri Kahwa", description: "Authentic Kashmiri Kahwa – a must-have in traditional gifts.", price: 380, unit: "pack", category: "kahwa", mainCategory: "other", image: "/images/other/kahwa.jpg", inStock: true, stockQty: 55, featured: true, tokriFillable: true, tokriGroup: "kahwa", tags: ["kahwa", "tea", "kashmir", "tokri"] },
  { id: "p-biscuit-1", slug: "premium-biscuits", name: "Premium Biscuits Assortment", description: "Selection of fine biscuits for gift baskets.", price: 280, unit: "pack", category: "biscuits", mainCategory: "other", image: "/images/other/biscuits.jpg", inStock: true, stockQty: 70, tokriFillable: true, tokriGroup: "biscuits", tags: ["biscuits", "snacks", "tokri"] },
];

export const MAHRAAZ_PACKAGES: TraemPackage[] = [
  { id: "mh-basic", name: "Mahraaz Traem – Basic", type: "basic", guestCount: 50, price: 4500, description: "Essential set for smaller Mahraaz gatherings.", items: [
    { productId: "p-cups-1", quantity: 1, name: "Disposable Cups (100)" },
    { productId: "p-plates-1", quantity: 1, name: "Disposable Plates (100)" },
    { productId: "p-bowls-1", quantity: 1, name: "Disposable Bowls (100)" },
    { productId: "p-goshtab-1", quantity: 1, name: "Goshtab Cups (100)" },
    { productId: "p-spoons-1", quantity: 1, name: "Spoons (100)" },
  ]},
  { id: "mh-standard", name: "Mahraaz Traem – Standard", type: "standard", guestCount: 100, price: 8200, description: "Complete standard package for typical Mahraaz events.", items: [
    { productId: "p-cups-1", quantity: 2, name: "Disposable Cups (200)" },
    { productId: "p-plates-1", quantity: 2, name: "Disposable Plates (200)" },
    { productId: "p-bowls-1", quantity: 2, name: "Disposable Bowls (200)" },
    { productId: "p-salad-1", quantity: 2, name: "Salad Plates (200)" },
    { productId: "p-goshtab-1", quantity: 2, name: "Goshtab Cups (200)" },
    { productId: "p-wazwaan-1", quantity: 2, name: "Wazwaan Paper (100)" },
    { productId: "p-spoons-1", quantity: 2, name: "Spoons (200)" },
  ]},
  { id: "mh-premium", name: "Mahraaz Traem – Premium", type: "premium", guestCount: 200, price: 15500, description: "Premium full set with higher quantities and extras for large Mahraaz celebrations.", items: [
    { productId: "p-cups-1", quantity: 4, name: "Disposable Cups (400)" },
    { productId: "p-plates-1", quantity: 4, name: "Disposable Plates (400)" },
    { productId: "p-bowls-1", quantity: 3, name: "Disposable Bowls (300)" },
    { productId: "p-salad-1", quantity: 4, name: "Salad Plates (400)" },
    { productId: "p-goshtab-1", quantity: 4, name: "Goshtab Cups (400)" },
    { productId: "p-wazwaan-1", quantity: 4, name: "Wazwaan Paper (200)" },
    { productId: "p-spoons-1", quantity: 4, name: "Spoons (400)" },
    { productId: "p-glasses-1", quantity: 3, name: "Glasses (300)" },
  ]},
];

export const SITE_SETTINGS = {
  whatsappNumber: "",
  storeName: "DISPOMART",
  address: "Mattan Chowk, Anantnag, Kashmir",
  phone: "",
  email: "",
};

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
export function getProductsByMainCategory(cat: string): Product[] {
  return PRODUCTS.filter((p) => p.mainCategory === cat);
}
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.includes(q)) ||
      p.category.includes(q) ||
      p.brand?.toLowerCase().includes(q)
  );
}

export function getTokriFillableProducts(): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.inStock &&
      (p.tokriFillable === true ||
        p.mainCategory === "dry-fruits" ||
        p.mainCategory === "chocolates" ||
        p.category === "chocolates" ||
        p.category === "kahwa" ||
        p.category === "biscuits")
  );
}

export function getTokriProductsByGroup(group: string): Product[] {
  const all = getTokriFillableProducts();
  if (group === "all") return all;
  if (group === "chocolates") {
    return all.filter(
      (p) =>
        p.tokriGroup === "chocolates" ||
        p.mainCategory === "chocolates" ||
        p.category === "chocolates"
    );
  }
  if (group === "dry-fruits") {
    return all.filter(
      (p) => p.tokriGroup === "dry-fruits" || p.mainCategory === "dry-fruits"
    );
  }
  return all.filter((p) => p.tokriGroup === group || p.category === group);
}

export const TOKRI_GROUPS: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "chocolates", label: "Chocolates" },
  { id: "dry-fruits", label: "Dry Fruits" },
  { id: "kahwa", label: "Kahwa & Tea" },
  { id: "biscuits", label: "Biscuits" },
];
