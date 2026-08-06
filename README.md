# FURLO Storefront

A responsive ecommerce website for a thoughtful pet-home care product.

## Run locally

Requires Node.js 22+. Install dependencies with `npm install`, then start the development server with `npm run dev`.

## Content and branding

- Brand, product, FAQ, review, policy, and article content lives in `app/data.ts`.
- The six supplied product images live in `public/products`.
- Colors and design tokens are defined at the top of `app/globals.css`.

## Connect Shopify

The storefront includes a live Shopify adapter in `app/shopify.ts`. When Shopify variables are present, the catalog, variants, pricing, availability, cart, discount code, order note, and checkout URL come from Shopify. Without them, the site safely falls back to the demo catalog in `app/data.ts`.

1. In Shopify Admin, install the **Headless** sales channel and create a storefront.
2. Publish the products you want to sell to that sales channel.
3. Copy the store domain and public Storefront API token.
4. Create `.env.local` from `.env.example` and enter:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_public_storefront_token
NEXT_PUBLIC_SHOPIFY_API_VERSION=2026-07
```

5. Restart the local server. For the hosted version, add the same values in the hosting environment settings and redeploy.

The public Storefront token is designed for browser storefront requests. Never put a Shopify Admin API token in a `NEXT_PUBLIC_` variable.

## Deploy

Connect the repository to Vercel and use `npm run build` as the build command. Add any Shopify variables under Project Settings → Environment Variables.
