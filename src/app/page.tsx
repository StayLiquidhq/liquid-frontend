"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import SavingsOptions from "@/components/SavingsOptions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#1A1A1A]">
      <Header />
      <Hero />
      <Hero2 />
      <SavingsOptions />
      <Footer />
    </main>
  );
}
