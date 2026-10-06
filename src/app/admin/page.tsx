export const metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-3xl font-semibold">Admin Dashboard</h1>
      <p className="mt-2 text-muted">
        Frontend structure ready for connection to a real backend / database.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "Products – Add / Edit / Delete / Stock",
          "Categories management",
          "Traem packages (Mahraaz & Common)",
          "Basket options for Tokri builder",
          "Orders list & status updates",
          "Custom Tokri orders + reference images",
          "Customers",
          "Site settings (WhatsApp number, etc.)",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-border bg-white p-5 text-sm"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-dashed border-border bg-cream-dark p-6 text-sm text-muted">
        <p className="font-medium text-charcoal">Architecture notes</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            Product, order, and inventory types are defined in{" "}
            <code className="text-xs">src/types</code>
          </li>
          <li>
            Cart and Tokri state use React context + localStorage (ready to
            swap for API)
          </li>
          <li>
            Next.js API routes or a separate backend can be wired to these types
          </li>
          <li>
            Order statuses: New → Confirmed → Preparing → Ready → Out for
            Delivery → Completed / Cancelled
          </li>
          <li>
            Custom Tokri orders should store basket, items, customization,
            message, and uploaded reference image
          </li>
        </ul>
      </div>
    </div>
  );
}
