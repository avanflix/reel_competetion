import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Short Film, Photography & Reels — Troy Telugu Association",
  description:
    "Enter the Troy Telugu Association Reels Competition. Submit your reel, follow the rules, and register online."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-marquee-cream text-marquee-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}
