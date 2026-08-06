import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://furlo.vn"),
  title: { default: "FURLO — Less fur. More life together.", template: "%s | FURLO" },
  description: "A reusable dual-surface pet hair removal mitt that is gentle on fabric and powerful on fur.",
  openGraph: { title: "FURLO", description: "One effortless sweep. Beautifully fur-free fabric.", type: "website", locale: "en_US", images: [{ url: "/og-en.png", width: 1728, height: 909, alt: "FURLO — Less fur. More life together." }] },
  twitter: { card: "summary_large_image", images: ["/og-en.png"] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
