import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_EMAIL,
  generateOrderId,
  recalculateCartTotal,
  validateCustomer,
  buildAdminEmailHtml,
  buildCustomerEmailHtml,
  sendEmailViaResend,
  type OrderCustomer,
  type StoredOrder,
} from "@/lib/orders";
import { saveOrder } from "@/lib/order-store";
import type { CartItem } from "@/types";

/** In-memory rate limit (per IP). Soft limit for spam protection.
 * On serverless each instance has its own map, so this is best-effort. */
const rateMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 20; // allow testing + normal use
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot spam field — must be empty
    if (body.website || body.company_url) {
      return NextResponse.json({ ok: true, orderId: "OK" }); // silent drop
    }

    const customer: OrderCustomer = {
      fullName: String(body.fullName || "").trim(),
      mobile: String(body.mobile || "").trim(),
      email: String(body.email || "").trim().toLowerCase(),
      address: String(body.address || "").trim(),
      area: String(body.area || "").trim(),
      city: String(body.city || "").trim(),
      district: String(body.district || "").trim(),
      pincode: String(body.pincode || "").trim(),
      specialInstructions: String(body.specialInstructions || "").trim() || undefined,
      preferredDeliveryDate:
        String(body.preferredDeliveryDate || "").trim() || undefined,
      fulfillment: body.fulfillment === "pickup" ? "pickup" : "delivery",
    };

    const errors = validateCustomer(customer);
    if (errors.length) {
      return NextResponse.json(
        { ok: false, error: errors.join(" ") },
        { status: 400 }
      );
    }

    const rawItems = Array.isArray(body.items) ? (body.items as CartItem[]) : [];
    if (rawItems.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const { items, subtotal, customizationCharges, total } =
      recalculateCartTotal(rawItems);

    const order: StoredOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      status: "pending_review",
      emailSent: false,
      customerEmailSent: false,
      customer,
      items,
      subtotal,
      customizationCharges,
      deliveryCharges: 0,
      total,
    };

    // Persist first (best-effort)
    await saveOrder(order);

    // Admin notification — always to configured admin email
    const adminResult = await sendEmailViaResend({
      to: ADMIN_EMAIL,
      subject: `[DispoMart] New order ${order.id} – ${customer.fullName}`,
      html: buildAdminEmailHtml(order),
      replyTo: customer.email,
    });

    if (!adminResult.ok) {
      // If email fails, still return order id but flag failure so UI can warn
      console.error("[orders] admin email failed:", adminResult.error);
      const detail = adminResult.error || "unknown email error";
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not send the order notification. " +
            (detail.includes("RESEND_API_KEY")
              ? "Email service is not configured (missing RESEND_API_KEY)."
              : "Email service error — check Vercel logs or Resend dashboard."),
          detail,
          orderId: order.id,
        },
        { status: 502 }
      );
    }

    order.emailSent = true;

    // Customer confirmation (non-blocking failure)
    const custResult = await sendEmailViaResend({
      to: customer.email,
      subject: `DispoMart – Order request ${order.id} received`,
      html: buildCustomerEmailHtml(order),
    });
    order.customerEmailSent = custResult.ok;
    if (!custResult.ok) {
      console.warn("[orders] customer email failed:", custResult.error);
    }

    // Re-save with email flags
    await saveOrder(order);

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      total: order.total,
      status: order.status,
      customerEmailSent: order.customerEmailSent,
    });
  } catch (e) {
    console.error("[orders] unexpected error:", e);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
