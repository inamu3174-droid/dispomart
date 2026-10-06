# DISPOMART – Wedding Supplies & Custom Tokri Platform

Premium e-commerce website for **DISPOMART**, Mattan Chowk, Anantnag, Kashmir.

**Positioning:** Everything You Need, Under One Roof.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- React 19
- Client-side cart + Tokri builder (localStorage); ready for API/database

## Features

- **Homepage** – Premium hero, category grid, featured products, trust section
- **Shop** – Full catalogue with filters (Baskets, Wedding, Dry Fruits, Bags)
- **Build Your Tokri** – Multi-step interactive builder
- **Mahraaz Traem** – Distinct packages (Basic / Standard / Premium)
- **Common Traem** – Guest-based quantity planner
- **Dry Fruits & Bags** – Dedicated sections
- **Product pages**, **Cart & Checkout**, **Search**, **About / Contact**, **Admin stub**

## Getting started

```bash
cd dispomart
npm install
npm run dev
```

Open http://localhost:3000

## Configuration

- WhatsApp number: `src/data/products.ts` → `SITE_SETTINGS.whatsappNumber`
- Products & packages: `src/data/products.ts`
- Types: `src/types/index.ts`
