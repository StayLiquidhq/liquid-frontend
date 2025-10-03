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
      className="w-[calc(100%-1.5rem)] md:w-[calc(100%-4rem)] mx-auto py-16 md:py-24"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-10 md:p-16 text-white flex-1 flex flex-col md:flex-row md:justify-between items-center md:items-end relative overflow-hidden order-2 md:order-1">
          <div className="absolute inset-0 flex justify-center pt-38">
            <Image
              src="/liquid-bi.svg"
              alt="Liquid Background"
              width={1000}
              height={300}
              className="opacity-80"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 md:gap-4">
              <Image
                src="/first-logo.svg"
                alt="Liquid Logo"
                width={74}
                height={74}
                className="md:hidden"
              />
              <Image
                src="/first-logo.svg"
                alt="Liquid Logo"
                width={188}
                height={188}
                className="hidden md:block"
              />
            </div>
            <p className="hidden md:block text-lg text-[#424242] mt-6 md:mt-48">
              ©2025 Liquid inc
            </p>
          </div>
          <div className="relative z-10 mt-6 md:mt-0 w-full md:w-auto">
            <nav className="grid grid-cols-2 md:flex md:flex-col gap-x-10 gap-y-5 md:gap-4 place-items-center md:place-items-end text-lg">
              <a href="#" className="text-[#424242] hover:text-white">
                Home
              </a>
              <a href="#" className="text-[#424242] hover:text-white">
                Learn
              </a>
              <a href="#" className="text-[#424242] hover:text-white">
                Terms
              </a>
              <a href="#" className="text-[#424242] hover:text-white">
                Security
              </a>
              <a href="#" className="text-[#424242] hover:text-white">
                Support
              </a>
              <a href="#" className="text-[#424242] hover:text-white">
                Contact
              </a>
            </nav>
          </div>
        </div>
        <div className="flex flex-row md:flex-col gap-4 md:gap-12 justify-center items-center order-1 md:order-2">
            <a
            href="https://x.com/savewithliquid"
            target="_blank"
            rel="noopener noreferrer"
            className="group squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-6 md:p-8 flex items-center justify-center transition-all duration-300"
            >
            <Image
              src="/twitter.svg"
              alt="Twitter Icon"
              width={40}
              height={40}
              className="grayscale group-hover:grayscale-0 transition-all"
            />
            </a>
            <a
            href="https://t.me/+Zid-tDFC5hE4MzA0"
            target="_blank"
            rel="noopener noreferrer"
            className="group squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-6 md:p-8 flex items-center justify-center transition-all duration-300"
            >
            <Image
              src="/discord.svg"
              alt="Discord Icon"
              width={40}
              height={40}
              className="grayscale group-hover:grayscale-0 transition-all"
            />
            </a>
            <a
            href="https://youtube.com/playlist?list=PLWQM5h9uKn0XrAFZFKnCO7oTWH_UbwlBx&si=xNn6q5fCuzCS6Q8x"
            target="_blank"
            rel="noopener noreferrer"
            className="group squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-6 md:p-8 flex items-center justify-center transition-all duration-300"
            >
            <Image
              src="/youtube.svg"
              alt="YouTube Icon"
              width={40}
              height={40}
              className="grayscale group-hover:grayscale-0 transition-all"
            />
            </a>
        </div>
      </div>
      <p className="mt-6 text-center text-[#424242] md:hidden">
        ©2025 Liquid inc
      </p>
    </motion.footer>
  );
};

export default Footer;
