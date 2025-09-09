import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SquircleProvider } from "./squircle-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liquid",
  description: "The easiest way to save and invest your money.",
  openGraph: {
    title: "Liquid",
    description: "The easiest way to save and invest your money.",
    images: [
      {
        url: "/liquid-twitter.png",
        width: 1200,
        height: 630,
        alt: "Liquid App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liquid",
    description: "The easiest way to save and invest your money.",
    images: ["/liquid-twitter.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="apple-mobile-web-app-title" content="Liquid" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SquircleProvider>{children}</SquircleProvider>
      </body>
    </html>
  );
}
