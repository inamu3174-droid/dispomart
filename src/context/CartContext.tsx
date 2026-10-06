"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { CartItem, CustomTokri, Product, TraemItemQty } from "@/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD_PRODUCT"; product: Product; quantity: number }
  | { type: "ADD_TOKRI"; tokri: CustomTokri; total: number }
  | { type: "ADD_TRAEM"; name: string; items: TraemItemQty[]; total: number; guestCount: number; traemType: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "CLEAR" }
  | { type: "TOGGLE_CART"; open?: boolean }
  | { type: "HYDRATE"; items: CartItem[] };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const existing = state.items.find(
        (i) => i.type === "product" && i.product?.id === action.product.id
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + action.quantity, price: action.product.price * (i.quantity + action.quantity) }
              : i
          ),
          isOpen: true,
        };
      }
      const newItem: CartItem = {
        id: `prod-${action.product.id}-${Date.now()}`,
        type: "product",
        product: action.product,
        quantity: action.quantity,
        price: action.product.price * action.quantity,
        name: action.product.name,
        image: action.product.image,
      };
      return { ...state, items: [...state.items, newItem], isOpen: true };
    }
    case "ADD_TOKRI": {
      const newItem: CartItem = {
        id: `tokri-${Date.now()}`,
        type: "tokri",
        quantity: 1,
        price: action.total,
        name: "Custom Tokri",
        tokri: action.tokri,
        image: action.tokri.basket?.image,
      };
      return { ...state, items: [...state.items, newItem], isOpen: true };
    }
    case "ADD_TRAEM": {
      const newItem: CartItem = {
        id: `traem-${Date.now()}`,
        type: "traem",
        quantity: 1,
        price: action.total,
        name: action.name,
        traemType: action.traemType,
        guestCount: action.guestCount,
        traemItems: action.items,
      };
      return { ...state, items: [...state.items, newItem], isOpen: true };
    }
    case "UPDATE_QTY": {
      return {
        ...state,
        items: state.items
          .map((i) => {
            if (i.id !== action.id) return i;
            if (action.quantity <= 0) return null;
            const unitPrice = i.product ? i.product.price : i.price / i.quantity;
            return {
              ...i,
              quantity: action.quantity,
              price: unitPrice * action.quantity,
            };
          })
          .filter(Boolean) as CartItem[],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: action.open !== undefined ? action.open : !state.isOpen };
    case "HYDRATE":
      return { ...state, items: action.items };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  addProduct: (product: Product, quantity?: number) => void;
  addTokri: (tokri: CustomTokri, total: number) => void;
  addTraem: (name: string, items: TraemItemQty[], total: number, guestCount: number, traemType: string) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dispomart-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", items: parsed });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dispomart-cart", JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price, 0);

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    itemCount,
    subtotal,
    addProduct: (product, quantity = 1) =>
      dispatch({ type: "ADD_PRODUCT", product, quantity }),
    addTokri: (tokri, total) => dispatch({ type: "ADD_TOKRI", tokri, total }),
    addTraem: (name, items, total, guestCount, traemType) =>
      dispatch({ type: "ADD_TRAEM", name, items, total, guestCount, traemType }),
    updateQty: (id, quantity) => dispatch({ type: "UPDATE_QTY", id, quantity }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
    toggleCart: (open) => dispatch({ type: "TOGGLE_CART", open }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
