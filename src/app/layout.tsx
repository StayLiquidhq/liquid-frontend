import type { Metadata } from "next";
import "./globals.css";
import { SquircleProvider } from "./squircle-provider";
import { ToastProvider } from "./toast-provider";
import { Onest } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const onest = Onest({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
      <body className={`${onest.className} antialiased`}>
        <SquircleProvider>
          <ToastProvider>{children}</ToastProvider>
          <GoogleAnalytics gaId="G-BR7E6D2HNF" />
          <Analytics />
        </SquircleProvider>
      </body>
    </html>
  );
}
