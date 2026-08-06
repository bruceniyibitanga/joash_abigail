import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces } from "next/font/google";

import { COUPLE, WEDDING_DATE } from "@/lib/wedding";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const title = `${COUPLE.displayName} — ${WEDDING_DATE.long}`;
const description = `Join us as we are joined together in marriage on ${WEDDING_DATE.long} at Laiser Hill SDA Church, ${WEDDING_DATE.city}.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_KE",
  },
  robots: {
    // A private family celebration — reachable by link, not by search.
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#b65327",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
