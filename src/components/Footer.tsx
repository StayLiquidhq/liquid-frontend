"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="w-[calc(100%-4rem)] mx-auto py-24"
    >
      <div className="flex gap-12">
        <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-16 text-white flex-1 flex justify-between items-end relative overflow-hidden">
          <div className="absolute inset-0 flex justify-center pt-38">
            <Image
              src="/liquid-bi.svg"
              alt="Liquid Background"
              width={1000}
              height={300}
              className="opacity-80"
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <Image src="/first-logo.svg" alt="Liquid Logo" width={188} height={188} />
            </div>
            <p className="text-lg text-[#424242] mt-48">©2025 Liquid inc</p>
          </div>
          <div className="relative z-10">
            <nav className="flex flex-col gap-4 text-right text-lg">
              <a href="#" className="text-[#424242] hover:text-white">Home</a>
              <a href="#" className="text-[#424242] hover:text-white">Learn</a>
              <a href="#" className="text-[#424242] hover:text-white">Terms</a>
              <a href="#" className="text-[#424242] hover:text-white">Security</a>
              <a href="#" className="text-[#424242] hover:text-white">Support</a>
              <a href="#" className="text-[#424242] hover:text-white">Contact</a>
            </nav>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-8 flex items-center justify-center">
            <Image
              src="/twitter.svg"
              alt="Twitter Icon"
              width={48}
              height={48}
             />
          </div>
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-8 flex items-center justify-center">
            <Image
              src="/discord.svg"
              alt="Discord Icon"
              width={48}
              height={48}
            />
          </div>
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-8 flex items-center justify-center">
            <Image
              src="/youtube.svg"
              alt="YouTube Icon"
              width={48}
              height={48}
            />
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
