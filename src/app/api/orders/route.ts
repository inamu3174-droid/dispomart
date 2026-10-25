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

const rateMap = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) return false;
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

    if (body.website || body.company_url) {
      return NextResponse.json({ ok: true, orderId: "OK" });
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

    await saveOrder(order);

    const adminResult = await sendEmailViaResend({
      to: ADMIN_EMAIL,
      subject: `[DispoMart] New order ${order.id} – ${customer.fullName}`,
      html: buildAdminEmailHtml(order),
      replyTo: customer.email,
    });

    if (!adminResult.ok) {
      console.error("[orders] admin email failed:", adminResult.error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not send the order notification. Please try again or contact the shop directly.",
          detail: adminResult.error,
          orderId: order.id,
        },
        { status: 502 }
      );
    }

    order.emailSent = true;

    const custResult = await sendEmailViaResend({
      to: customer.email,
      subject: `DispoMart – Order request ${order.id} received`,
      html: buildCustomerEmailHtml(order),
    });
    order.customerEmailSent = custResult.ok;
    if (!custResult.ok) {
      console.warn("[orders] customer email failed:", custResult.error);
    }

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
