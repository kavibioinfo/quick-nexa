import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick AyushNexa — AI Hospital Management System | Latur, Maharashtra",
  description:
    "Quick AyushNexa is an AI-powered hospital management system for clinics in Latur, Maharashtra. Manage OPD, patient registry, pharmacy, billing and appointments in one place.",
  keywords: [
    "hospital management system Latur",
    "clinic software Maharashtra",
    "OPD management system",
    "AI hospital software India",
    "patient management system",
    "pharmacy management Latur",
    "AyushNexa",
  ],
  authors: [{ name: "AyushNexa Digital Solutions" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://quick.ayushnexa.com",
  },
  verification: {
    google: "pBApiHbD5LPiOIjra_a_Bkr64NXAPvVE956G6fB48qA", 
  },
  openGraph: {
    title: "Quick AyushNexa — AI Hospital Management System",
    description:
      "AI-powered hospital management for clinics in Latur, Maharashtra. OPD, pharmacy, billing and patient registry in one platform.",
    url: "https://quick.ayushnexa.com",
    siteName: "Quick AyushNexa",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://quick.ayushnexa.com/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Quick AyushNexa Hospital Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick AyushNexa — AI Hospital Management System",
    description:
      "AI-powered hospital management for clinics in Latur, Maharashtra.",
    images: ["https://quick.ayushnexa.com/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}