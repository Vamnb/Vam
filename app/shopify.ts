import type { StoreProduct } from "./data";

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "") || "";
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "";
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2026-07";

export const shopifyConfigured = Boolean(storeDomain);

type GraphQLError = { message: string };

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!shopifyConfigured) throw new Error("Shopify is not configured.");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (storefrontToken) headers["X-Shopify-Storefront-Access-Token"] = storefrontToken;
  const response = await fetch(`https://${storeDomain}/api/${apiVersion}/graphql.json`, {
    method: "POST", headers, body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) throw new Error(`Shopify request failed (${response.status}).`);
  const payload = await response.json() as { data?: T; errors?: GraphQLError[] };
  if (payload.errors?.length) throw new Error(payload.errors.map(error => error.message).join(" "));
  if (!payload.data) throw new Error("Shopify returned no data.");
  return payload.data;
}

type ShopifyMoney = { amount: string; currencyCode: string };
type ShopifyProduct = {
  id: string; handle: string; title: string; description: string; availableForSale: boolean;
  images: { nodes: { url: string; altText: string | null }[] };
  priceRange: { minVariantPrice: ShopifyMoney };
  compareAtPriceRange: { minVariantPrice: ShopifyMoney };
  variants: { nodes: { id: string; title: string; availableForSale: boolean; quantityAvailable: number | null; price: ShopifyMoney; compareAtPrice: ShopifyMoney | null; selectedOptions: { name: string; value: string }[] }[] };
};

const PRODUCT_FIELDS = `
  id handle title description availableForSale
  images(first: 10) { nodes { url altText } }
  priceRange { minVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  variants(first: 100) { nodes { id title availableForSale quantityAvailable price { amount currencyCode } compareAtPrice { amount currencyCode } selectedOptions { name value } } }
`;

function mapProduct(item: ShopifyProduct, index: number): StoreProduct {
  const variants = item.variants.nodes.map((variant, variantIndex) => ({
    id: index === 0 && variantIndex === 0 ? "single" : `variant-${index}-${variantIndex}`,
    shopifyId: variant.id,
    title: variant.title === "Default Title" ? "Standard" : variant.title,
    price: Number(variant.price.amount),
    compareAtPrice: variant.compareAtPrice ? Number(variant.compareAtPrice.amount) : undefined,
    inventory: variant.quantityAvailable ?? (variant.availableForSale ? 1 : 0),
    available: variant.availableForSale,
    selectedOptions: variant.selectedOptions,
  }));
  const first = variants[0];
  const images = item.images.nodes.map(image => image.url);
  return {
    id: item.handle, shopifyId: item.id, slug: item.handle, title: item.title,
    subtitle: "Thoughtfully designed for everyday life with pets.",
    shortDescription: item.description || "A practical pet-care essential, designed to make everyday cleanup feel effortless.",
    description: item.description || "Designed with care for real homes and daily use.",
    price: first?.price ?? Number(item.priceRange.minVariantPrice.amount),
    compareAtPrice: first?.compareAtPrice ?? Number(item.compareAtPriceRange.minVariantPrice.amount),
    currency: first ? item.variants.nodes[0].price.currencyCode : item.priceRange.minVariantPrice.currencyCode,
    inventory: variants.reduce((total, variant) => total + variant.inventory, 0),
    images: images.length ? images : ["/products/furlo-06.png"], variants,
    badges: ["Shopify product"],
    benefits: ["Designed for daily use", "Simple and practical", "Made for pet-friendly homes", "Shop securely with Shopify"],
    specifications: ["See the Shopify product description for full specifications."],
    instructions: ["Follow the care and usage instructions included with your product."],
  };
}

export async function getShopifyProducts(): Promise<StoreProduct[]> {
  if (!shopifyConfigured) return [];
  const data = await storefront<{ products: { nodes: ShopifyProduct[] } }>(
    `query Catalog($first: Int!) { products(first: $first, sortKey: BEST_SELLING) { nodes { ${PRODUCT_FIELDS} } } }`,
    { first: 50 },
  );
  return data.products.nodes.map(mapProduct);
}

export type CheckoutLine = { merchandiseId: string; quantity: number };

export async function createShopifyCheckout(lines: CheckoutLine[], discountCode?: string, note?: string) {
  const data = await storefront<{ cartCreate: { cart: { id: string; checkoutUrl: string } | null; userErrors: { message: string }[] } }>(
    `mutation CreateCart($input: CartInput!) {
      cartCreate(input: $input) { cart { id checkoutUrl } userErrors { message } }
    }`,
    { input: { lines, discountCodes: discountCode ? [discountCode] : [], note: note || undefined } },
  );
  const errors = data.cartCreate.userErrors;
  if (errors.length) throw new Error(errors.map(error => error.message).join(" "));
  if (!data.cartCreate.cart) throw new Error("Shopify could not create the cart.");
  localStorage.setItem("furlo-shopify-cart-id", data.cartCreate.cart.id);
  return data.cartCreate.cart.checkoutUrl;
}
