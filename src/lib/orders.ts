import { CartItem } from "@/types";
import { getProductById, BASKET_OPTIONS } from "@/data/products";
import { MAHRAAZ_TRAEM, PLASTIC_TRAEM, BIO_TRAEM } from "@/data/traem";

export const ADMIN_EMAIL = "inamu3174@gmail.com";

export type OrderFulfillment = "delivery" | "pickup";

export interface OrderCustomer {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  area: string;
  city: string;
  district: string;
  pincode: string;
  specialInstructions?: string;
  preferredDeliveryDate?: string;
  fulfillment: OrderFulfillment;
}

export interface StoredOrder {
  id: string;
  createdAt: string;
  status: "pending_review" | "confirmed" | "cancelled";
  emailSent: boolean;
  customerEmailSent: boolean;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  customizationCharges: number;
  deliveryCharges: number;
  total: number;
}

export function generateOrderId(): string {
  const d = new Date();
  const date =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DM-${date}-${rand}`;
}

export function recalculateCartTotal(items: CartItem[]): {
  items: CartItem[];
  subtotal: number;
  customizationCharges: number;
  total: number;
} {
  let subtotal = 0;
  let customizationCharges = 0;

  const trusted: CartItem[] = items.map((item) => {
    if (item.type === "product" && item.product?.id) {
      const p = getProductById(item.product.id);
      if (p) {
        const qty = Math.max(1, Math.floor(item.quantity) || 1);
        const price = p.price * qty;
        subtotal += price;
        return { ...item, name: p.name, quantity: qty, price, product: p };
      }
    }

    if (item.type === "tokri" && item.tokri) {
      let tokriTotal = 0;
      const basket = item.tokri.basket
        ? BASKET_OPTIONS.find((b) => b.id === item.tokri!.basket!.id) ||
          item.tokri.basket
        : null;
      if (basket) tokriTotal += basket.price;

      const filledItems = (item.tokri.items || []).map((ti) => {
        const p = getProductById(ti.productId) || ti.product;
        const qty = Math.max(0, Math.floor(ti.quantity) || 0);
        tokriTotal += (p?.price || 0) * qty;
        return { ...ti, product: p, quantity: qty };
      });

      const c = item.tokri.customization;
      const hasCustom = !!(c?.customMessage || c?.nameInitials || c?.ribbon || c?.theme);
      const customFee = hasCustom ? 50 : 0;
      customizationCharges += customFee;
      tokriTotal += customFee;
      subtotal += tokriTotal;

      return {
        ...item,
        quantity: 1,
        price: tokriTotal,
        name: item.name || "Custom Tokri",
        tokri: { ...item.tokri, basket, items: filledItems },
      };
    }

    if (item.type === "traem") {
      const qty = Math.max(1, Math.floor(item.guestCount || item.quantity) || 1);
      let unit = 0;
      if (item.traemType === "mahraaz") unit = MAHRAAZ_TRAEM.price;
      else if (item.traemType === "common-plastic") unit = PLASTIC_TRAEM.price;
      else if (item.traemType === "common-bio") unit = BIO_TRAEM.price;
      else unit = Math.round(item.price / Math.max(1, qty));
      const price = unit * qty;
      subtotal += price;
      return {
        ...item,
        quantity: 1,
        guestCount: qty,
        price,
        name: item.name || `${qty} × Traem`,
      };
    }

    const price = Math.max(0, Number(item.price) || 0);
    subtotal += price;
    return { ...item, price };
  });

  return { items: trusted, subtotal, customizationCharges, total: subtotal };
}

export function validateCustomer(c: Partial<OrderCustomer>): string[] {
  const errors: string[] = [];
  if (!c.fullName?.trim() || c.fullName.trim().length < 2)
    errors.push("Full name is required.");
  const mobile = (c.mobile || "").replace(/\D/g, "");
  if (mobile.length < 10) errors.push("Enter a valid 10-digit mobile number.");
  if (!c.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim()))
    errors.push("Enter a valid email address.");
  if (!c.address?.trim()) errors.push("Delivery address is required.");
  if (!c.area?.trim()) errors.push("Area or locality is required.");
  if (!c.city?.trim()) errors.push("City or town is required.");
  if (!c.district?.trim()) errors.push("District is required.");
  const pin = (c.pincode || "").replace(/\D/g, "");
  if (pin.length !== 6) errors.push("Enter a valid 6-digit PIN code.");
  if (c.fulfillment !== "delivery" && c.fulfillment !== "pickup")
    errors.push("Select delivery or store collection.");
  return errors;
}

function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function itemLinesHtml(items: CartItem[]): string {
  return items
    .map((item) => {
      let detail = "";
      if (item.type === "tokri" && item.tokri) {
        const basket = item.tokri.basket?.name || "Basket";
        const fills = (item.tokri.items || [])
          .filter((i) => i.quantity > 0)
          .map((i) => `${i.product?.name || i.productId} ×${i.quantity}`)
          .join(", ");
        const c = item.tokri.customization;
        const customBits = [
          c?.color && `Colour: ${c.color}`,
          c?.ribbon && `Ribbon: ${c.ribbon}`,
          c?.theme && `Theme: ${c.theme}`,
          c?.nameInitials && `Initials: ${c.nameInitials}`,
          c?.customMessage && `Message: "${c.customMessage}"`,
          c?.occasion && `Occasion: ${c.occasion}`,
        ]
          .filter(Boolean)
          .join("; ");
        detail = `<br/><span style="color:#666;font-size:13px">${basket}${fills ? ` · ${fills}` : ""}${customBits ? `<br/>${customBits}` : ""}</span>`;
      }
      if (item.type === "traem" && item.traemItems?.length) {
        const lines = item.traemItems
          .map((t) => `${t.name} ×${t.quantity}`)
          .join(", ");
        detail = `<br/><span style="color:#666;font-size:13px">${item.traemType || "Traem"} · ${item.guestCount || ""} set(s)<br/>${lines}</span>`;
      }
      return `<tr>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;vertical-align:top">${item.name}${detail}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td>
        <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right">${formatINR(item.price)}</td>
      </tr>`;
    })
    .join("");
}

export function buildAdminEmailHtml(order: StoredOrder): string {
  const c = order.customer;
  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif;background:#faf8f5;color:#1c1917;padding:24px">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;overflow:hidden">
    <div style="background:#1c1917;color:#faf8f5;padding:20px 24px">
      <h1 style="margin:0;font-size:22px;font-weight:600">New Order Request</h1>
      <p style="margin:6px 0 0;opacity:0.8;font-size:14px">${order.id} · Pending Review</p>
    </div>
    <div style="padding:24px">
      <h2 style="font-size:16px;margin:0 0 12px;color:#9f1239">Customer</h2>
      <p style="margin:0 0 4px"><strong>${c.fullName}</strong></p>
      <p style="margin:0 0 4px;font-size:14px">Mobile: ${c.mobile}</p>
      <p style="margin:0 0 4px;font-size:14px">Email: ${c.email}</p>
      <p style="margin:0 0 4px;font-size:14px">${c.address}, ${c.area}</p>
      <p style="margin:0 0 4px;font-size:14px">${c.city}, ${c.district} – ${c.pincode}</p>
      <p style="margin:0 0 4px;font-size:14px"><strong>Fulfillment:</strong> ${c.fulfillment === "pickup" ? "Store Collection" : "Delivery"}</p>
      ${c.preferredDeliveryDate ? `<p style="margin:0 0 4px;font-size:14px"><strong>Preferred date:</strong> ${c.preferredDeliveryDate}</p>` : ""}
      ${c.specialInstructions ? `<p style="margin:8px 0 0;font-size:14px;background:#faf8f5;padding:10px;border-radius:8px"><strong>Notes:</strong> ${c.specialInstructions}</p>` : ""}
      <h2 style="font-size:16px;margin:24px 0 12px;color:#9f1239">Products</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead><tr style="background:#faf8f5;text-align:left"><th style="padding:8px">Item</th><th style="padding:8px;text-align:center">Qty</th><th style="padding:8px;text-align:right">Amount</th></tr></thead>
        <tbody>${itemLinesHtml(order.items)}</tbody>
      </table>
      <div style="margin-top:20px;padding-top:16px;border-top:2px solid #1c1917">
        <p style="margin:4px 0;font-size:14px">Subtotal: ${formatINR(order.subtotal)}</p>
        ${order.customizationCharges > 0 ? `<p style="margin:4px 0;font-size:14px">Customization: ${formatINR(order.customizationCharges)}</p>` : ""}
        <p style="margin:12px 0 0;font-size:18px;font-weight:600">Total (estimated): <span style="color:#9f1239">${formatINR(order.total)}</span></p>
      </div>
      <p style="margin:24px 0 0;font-size:12px;color:#78716c">Status: <strong>Pending Review</strong> — confirm availability before fulfilling. Submitted ${new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
    </div>
  </div>
  </body></html>`;
}

export function buildCustomerEmailHtml(order: StoredOrder): string {
  return `<!DOCTYPE html><html><body style="font-family:Georgia,serif;background:#faf8f5;color:#1c1917;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e7e5e4;border-radius:12px;padding:28px">
    <h1 style="margin:0 0 8px;font-size:22px">Order request received</h1>
    <p style="margin:0 0 16px;color:#78716c;font-size:14px">Thank you, ${order.customer.fullName}.</p>
    <p style="margin:0 0 8px"><strong>Order ID:</strong> ${order.id}</p>
    <p style="margin:0 0 8px"><strong>Estimated total:</strong> ₹${order.total.toLocaleString("en-IN")}</p>
    <p style="margin:16px 0;padding:12px;background:#faf8f5;border-radius:8px;font-size:14px;line-height:1.5">
      Your order request is <strong>awaiting confirmation</strong> from DispoMart.
      We will contact you on ${order.customer.mobile} or ${order.customer.email} once we have reviewed availability.
    </p>
    <p style="font-size:13px;color:#78716c;margin:20px 0 0">DispoMart · Mattan Chowk, Anantnag, Kashmir</p>
  </div>
  </body></html>`;
}

export async function sendEmailViaResend(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: "RESEND_API_KEY is not configured. Add it in Vercel environment variables.",
    };
  }
  // Free/onboarding Resend keys only allow from: onboarding@resend.dev
  // until you verify your own domain.
  const from =
    process.env.RESEND_FROM_EMAIL ||
    "onboarding@resend.dev";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        reply_to: opts.replyTo,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${body}` };
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Email send failed",
    };
  }
}
