import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import SavingsOptions from "@/components/SavingsOptions";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import AIHiddenExplainer from "@/components/AIHiddenExplainer";

export const metadata: Metadata = {
  title: "Turning everyday to payday.",
  description:
    "Hold your salary or big payouts in Liquid so you don’t spend it at once. Stream money back to yourself daily, weekly, or monthly.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Liquid — Save big wins. Stream income back",
    description:
      "Automate discipline with Liquid. Choose a schedule and stream funds back.",
    images: [
      {
        url: "/liquid-twitter.png",
        width: 1200,
        height: 630,
        alt: "Liquid App",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#1A1A1A]">
      <AIHiddenExplainer />
      <Header />
      <Hero />
      <Hero2 />
      <SavingsOptions />
      <Footer />
    </main>
  );
}
