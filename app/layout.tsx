import type { Metadata } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://richardtuharsky.com"),
  title: {
    default: "Sync & Send",
    template: "%s | Sync & Send",
  },
  description:
    "Sync & Send by Richard Tuharsky: practical notes on customer data, marketing automation and marketing-to-sales handoffs.",
  openGraph: {
    siteName: "Sync & Send",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
