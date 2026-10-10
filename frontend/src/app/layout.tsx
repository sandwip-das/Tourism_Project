import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SANDVIORA Tourism — Discover Bangladesh's Untouched Wonders",
  description: "Official editorial travel portal and booking platform for Bangladesh. Explore Sajek Valley, Cox's Bazar, Sundarbans mangrove forest, tea gardens, and mountain trails.",
  keywords: ["Bangladesh tourism", "Sajek Valley", "Sundarbans", "Cox's Bazar", "Sreemangal", "Bandarban", "Tanguar Haor", "Travel Bangladesh"],
  openGraph: {
    title: "SANDVIORA Tourism — Untouched Horizons, Eternal Stories",
    description: "Curated expeditions, luxury cottages, houseboat cruises, and authentic cultural journeys across Bangladesh.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
