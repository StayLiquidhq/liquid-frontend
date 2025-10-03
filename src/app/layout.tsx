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

// SEO Metadata configuration for Liquid
export const metadata: Metadata = {
  metadataBase: new URL("https://savewithliquid.com"),
  title: {
    default: "Liquid — Turning everyday to payday. ",
    template: "%s | Liquid",
  },
  description:
    "Liquid helps you hold big payouts and salaries so you don’t spend it at once. Stream your money back to yourself daily, weekly, or monthly.",
  keywords: [
    "Liquid",
    "Save salary",
    "budget salary",
    "automated savings app",
    "income streaming",
    "save salary gradually",
    "hold big wins",
    "savings wallet",
    "fintech savings Nigeria",
    "alternative to Cowrywise",
    "alternative to PiggyVest",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://savewithliquid.com/",
    siteName: "Liquid",
    title: "Liquid — Turning everyday to payday. ",
    description:
      "Hold your money after big wins or salary and stream it back daily, weekly or monthly.",
    images: [
      {
        url: "/liquid-twitter.png",
        width: 1200,
        height: 630,
        alt: "Liquid App",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Liquid — Turning everyday to payday.",
    description:
      "Save without temptation. Stream your funds back to yourself on a schedule.",
    images: ["/liquid-twitter.png"],
  },
  alternates: {
    canonical: "/",
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
      {/* Organization & WebSite JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Liquid",
            url: "https://savewithliquid.com/",
            logo: "https://savewithliquid.com/liquid-twitter.png",
            sameAs: ["https://www.twitter.com/", "https://www.linkedin.com/"],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Liquid",
            url: "https://savewithliquid.com/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://savewithliquid.com/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      {/* WebApplication JSON-LD to explain the product to crawlers/LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Liquid",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            url: "https://savewithliquid.com/",
            description:
              "Liquid holds big income events (salary, gigs, windfalls) and streams money back to you on a daily, weekly or monthly schedule so you don’t overspend at once.",
            featureList: [
              "Income streaming schedules (daily, weekly, monthly)",
              "Vaults for goals (locked, flexible, target)",
              "Transparent transactions and payout editing",
              "Mobile-first, distraction-minimizing UI",
            ],
          }),
        }}
      />
      <body className={`${onest.className} antialiased`}>
        <SquircleProvider>
          <ToastProvider>{children}</ToastProvider>
          <GoogleAnalytics gaId="G-NFBESZD60N" />
          <Analytics />
        </SquircleProvider>
      </body>
    </html>
  );
}
