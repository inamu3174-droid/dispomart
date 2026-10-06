"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pb-20 lg:pb-12">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Contact
          </h1>
          <p className="mt-2 text-muted">
            Reach us for orders, custom Tokri, wholesale or any questions.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-xl font-semibold">Visit Us</h2>
            <p className="mt-3 text-muted leading-relaxed">
              DISPOMART
              <br />
              Mattan Chowk, Anantnag, Kashmir
            </p>
            <p className="mt-4 text-sm text-muted">
              Serving Anantnag and surrounding areas. Store hours and phone
              number can be configured in the admin settings once connected.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-6">
            {sent ? (
              <div className="py-8 text-center">
                <p className="font-medium text-green-700">
                  Message sent. We will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Name</label>
                  <input
                    required
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Phone</label>
                  <input
                    required
                    type="tel"
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-crimson"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-crimson py-3 text-sm font-semibold text-white hover:bg-crimson-dark"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
