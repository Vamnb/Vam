export const brand = {
  name: "FURLO", primary: "#0d7168", secondary: "#f4b61f", background: "#f7f3eb",
  supportEmail: "hello@furlo.com", socials: { instagram: "#", facebook: "#" },
};

export type ProductVariant = { id: string; shopifyId?: string; title: string; price: number; compareAtPrice?: number; inventory: number; available?: boolean; selectedOptions?: { name: string; value: string }[] };
export type StoreProduct = {
  id: string; shopifyId?: string; slug: string; title: string; subtitle: string; shortDescription: string; description: string;
  price: number; compareAtPrice: number; currency: string; inventory: number; images: string[]; variants: ProductVariant[];
  badges: string[]; benefits: string[]; specifications: string[]; instructions: string[];
};

export const product: StoreProduct = {
  id: "furlo-mitt", slug: "furlo-pet-hair-removal-mitt", title: "FURLO Pet Hair Removal Mitt",
  subtitle: "Two surfaces. One smarter clean.", shortDescription: "A reusable mitt that lifts embedded fur from sofas, bedding, and clothes — no sticky residue, batteries, or refills.",
  description: "A small tool made for homes with pets. Directional microfiber grips embedded hair while the static-lift surface attracts loose fur, helping you clean quickly without damaging fabric.",
  price: 289000, compareAtPrice: 459000, currency: "VND", inventory: 64,
  images: ["/products/furlo-06.png","/products/furlo-01.png","/products/furlo-02.png","/products/furlo-03.png","/products/furlo-04.png","/products/furlo-05.png"],
  variants: [
    { id: "single", title: "Single mitt", price: 289000, inventory: 64 },
    { id: "pair", title: "2-mitt set", price: 499000, inventory: 38 },
    { id: "family", title: "Family set of 3", price: 669000, inventory: 21 },
  ],
  badges: ["Bestseller", "Save 37%"],
  benefits: ["Grips embedded hair", "Leaves no sticky residue", "Washable and reusable", "Safe for soft fabrics"],
  specifications: ["Size: 23 × 16 cm", "Materials: microfiber and polyester mesh", "Fits both left and right hands"],
  instructions: ["Slide your hand under the mesh strap", "Sweep in one direction across the surface", "Remove collected fur, rinse gently, and air-dry"],
};

export const products: StoreProduct[] = [product];

export const faqs = [
  ["Can I use FURLO on every fabric?", "FURLO works well on sofas, bedding, outerwear, and car seats. For very delicate or specialty fabrics, test it on a small hidden area first."],
  ["How do I clean the mitt?", "Remove the collected fur, rinse gently in cool water, and let it air-dry. Avoid harsh detergents and high-heat dryers."],
  ["How long does delivery take?", "Orders are processed within 1–2 business days and typically arrive within 2–5 business days."],
  ["What if the product is not right for me?", "You can request a return within 90 days of delivery, provided the product remains in eligible condition."],
];

export const reviews = [
  { name: "Mia Harper", pet: "Miso's human", stars: 5, text: "Our light-colored sofa is fur-free so much faster now. I especially love that there are no refills to buy." },
  { name: "Lucas Bennett", pet: "Biscuit's human", stars: 5, text: "The mitt stays secure on my hand and gathers fur in just a few sweeps. It is brilliant on car seats." },
  { name: "Sophie Reed", pet: "Nori's human", stars: 4, text: "Lightweight, easy to store, and great on bedding. I keep one right next to the sofa." },
];

export const posts = [
  { slug: "keep-your-sofa-fur-free", title: "Five minutes a day for a fur-free sofa", date: "AUG 02, 2026", excerpt: "One small habit that makes shared spaces more comfortable for pets and people." },
  { slug: "care-for-fabric", title: "How to care for fabrics in a pet-friendly home", date: "JUL 24, 2026", excerpt: "Clean sofas, bedding, and outerwear without roughening their surfaces." },
  { slug: "living-well-with-pets", title: "A tidy home where pets can still be pets", date: "JUL 11, 2026", excerpt: "Create a gentle cleaning rhythm without turning your home into a no-go zone." },
];

export const policyContent: Record<string, { title: string; intro: string; sections: [string,string][] }> = {
  about: { title: "Designed for real life", intro: "FURLO began with the everyday joy of living with pets — and a few uninvited strands of fur.", sections: [["Observe", "We study the small frustrations that come with everyday life alongside pets."],["Test", "Every idea is tried in real homes, on real materials."],["Simplify", "The final product must be intuitive, practical, and durable enough for daily life."]] },
  shipping: { title: "Shipping policy", intro: "We ship worldwide and keep you updated throughout your order's journey.", sections: [["Order processing", "Orders are prepared within 1–2 business days after confirmation."],["Delivery time", "Delivery usually takes 2–5 business days, depending on your location."],["Free shipping", "Free standard shipping is available on orders over $25."]] },
  returns: { title: "Returns & refunds", intro: "You have 90 days to experience FURLO with confidence.", sections: [["Eligibility", "Items must be in good condition and free from damage caused by misuse."],["How to return", "Email us with your order number and a photo. Our team will reply within one business day."],["Refunds", "Approved refunds are returned to the original payment method within 5–7 business days."]] },
  privacy: { title: "Privacy policy", intro: "We collect only the information needed to fulfill your order and support you.", sections: [["Information we collect", "Contact details, shipping information, and purchase history."],["How we use it", "To fulfill orders, provide support, and improve your experience."],["Your choices", "You may request access to, correction of, or deletion of your personal information."]] },
  terms: { title: "Terms of service", intro: "By using this website, you agree to the transparent shopping terms below.", sections: [["Products", "We represent our products as accurately as possible; colors may vary slightly by screen."],["Payment", "An order is confirmed after a valid transaction is completed."],["Responsibility", "Please use each product for its intended purpose and according to the instructions."]] },
};
