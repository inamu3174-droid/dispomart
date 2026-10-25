import { promises as fs } from "fs";
import path from "path";
import type { StoredOrder } from "./orders";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

/**
 * Simple persistent order store.
 * - Local / long-running server: appends to data/orders.json
 * - Serverless (Vercel): file writes may not persist across invocations;
 *   admin email remains the primary durable record. Configure a database
 *   later if needed (e.g. Vercel Postgres / Upstash).
 */
export async function saveOrder(order: StoredOrder): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let list: StoredOrder[] = [];
    try {
      const raw = await fs.readFile(ORDERS_FILE, "utf8");
      list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch {
      list = [];
    }
    list.unshift(order);
    if (list.length > 500) list = list.slice(0, 500);
    await fs.writeFile(ORDERS_FILE, JSON.stringify(list, null, 2), "utf8");
  } catch (err) {
    console.warn("[order-store] could not persist order file:", err);
  }
}

export async function getOrderById(id: string): Promise<StoredOrder | null> {
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf8");
    const list = JSON.parse(raw) as StoredOrder[];
    return list.find((o) => o.id === id) || null;
  } catch {
    return null;
  }
}

export async function listOrders(limit = 50): Promise<StoredOrder[]> {
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf8");
    const list = JSON.parse(raw) as StoredOrder[];
    return list.slice(0, limit);
  } catch {
    return [];
  }
}
