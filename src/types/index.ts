export type ProductCategory =
  | "wooden-baskets"
  | "plastic-baskets"
  | "premium-baskets"
  | "gift-baskets"
  | "wedding-baskets"
  | "cups"
  | "plates"
  | "bowls"
  | "salad-plates"
  | "serving-items"
  | "disposable-glasses"
  | "disposable-plates"
  | "disposable-bowls"
  | "wazwaan-supplies"
  | "goshtab-cups"
  | "paper-products"
  | "food-packaging"
  | "wedding-essentials"
  | "almonds"
  | "walnuts"
  | "cashews"
  | "raisins"
  | "pistachios"
  | "mixed-dry-fruits"
  | "premium-gift-packs"
  | "shopping-bags"
  | "gift-bags"
  | "wedding-bags"
  | "paper-bags"
  | "plastic-bags"
  | "premium-carry-bags"
  | "chocolates"
  | "biscuits"
  | "kahwa"
  | "tea"
  | "snacks"
  | "cosmetics"
  | "gifting-items";

export type MainCategory =
  | "baskets"
  | "wedding"
  | "dry-fruits"
  | "bags"
  | "other";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: ProductCategory;
  mainCategory: MainCategory;
  image: string;
  images?: string[];
  inStock: boolean;
  stockQty?: number;
  featured?: boolean;
  tags?: string[];
  minQty?: number;
  maxQty?: number;
  allowCustomQty?: boolean;
  isBasket?: boolean;
  basketSize?: "small" | "medium" | "large";
  dimensions?: string;
}

export interface BasketOption {
  id: string;
  name: string;
  type: "wooden" | "plastic" | "premium";
  size: "small" | "medium" | "large";
  price: number;
  dimensions: string;
  image: string;
  description: string;
}

export interface TokriItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface TokriCustomization {
  color: string;
  wrappingStyle: string;
  ribbon: string;
  decoration: string;
  filling: string;
  theme: string;
  nameInitials: string;
  occasion: string;
  customMessage: string;
  referenceImage?: string;
}

export interface CustomTokri {
  basket: BasketOption | null;
  items: TokriItem[];
  customization: TokriCustomization;
}

export interface TraemPackage {
  id: string;
  name: string;
  type: "mahraaz" | "common" | "basic" | "standard" | "premium";
  guestCount: number;
  price: number;
  description: string;
  items: { productId: string; quantity: number; name: string }[];
  image?: string;
}

export interface TraemItemQty {
  productId: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
  suggested?: number;
}

export interface CartItem {
  id: string;
  type: "product" | "tokri" | "traem" | "mahraaz-package";
  product?: Product;
  quantity: number;
  price: number;
  name: string;
  image?: string;
  tokri?: CustomTokri;
  traemType?: string;
  guestCount?: number;
  traemItems?: TraemItemQty[];
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  specialInstructions?: string;
  orderType: "delivery" | "pickup";
  paymentMethod: "cod" | "online" | "request-confirmation";
  items: CartItem[];
  subtotal: number;
  total: number;
  status:
    | "new"
    | "confirmed"
    | "preparing"
    | "ready"
    | "out-for-delivery"
    | "completed"
    | "cancelled";
  createdAt: string;
  whatsappMessage?: string;
}

export interface SiteSettings {
  whatsappNumber: string;
  storeName: string;
  address: string;
  phone: string;
  email?: string;
}
