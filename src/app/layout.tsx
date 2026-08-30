import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Bhutan National Basketball Championship 2026",
    template: "%s · Bhutan Basketball",
  },
  description:
    "Official tournament platform of the Bhutan Basketball Federation — fixtures, standings, live scores, and the road to Changlimithang.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-paper font-sans text-ink-2">
        {children}
      </body>
    </html>
  );
}
