export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function generateWhatsAppLink(
  number: string,
  message: string
): string {
  if (!number) return "#";
  const clean = number.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function buildOrderWhatsAppMessage(params: {
  customerName?: string;
  itemsSummary: string;
  total: number;
  preference?: string;
}): string {
  const lines = [
    "Hello DISPOMART,",
    "",
    "I would like to place an order:",
    "",
    params.itemsSummary,
    "",
    `Estimated Total: ₹${params.total.toLocaleString("en-IN")}`,
  ];
  if (params.customerName) lines.push(`Name: ${params.customerName}`);
  if (params.preference) lines.push(`Preference: ${params.preference}`);
  lines.push("", "Please confirm availability. Thank you!");
  return lines.join("\n");
}
