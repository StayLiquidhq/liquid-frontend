"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#1A1A1A] w-full flex justify-center py-4 md:py-6"
    >
      <div className="flex items-center justify-between gap-4 md:gap-6 w-[calc(100%-2rem)] md:w-auto">
        <div
          className="flex items-center gap-3 py-4 px-6 md:py-6 md:px-24 text-[#424242] squircle squircle-7xl squircle-smooth-xl squircle-[#3086FF] md:squircle-[#1E1E1E] transition-colors duration-1500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src="/blue.svg"
            alt="Liquid Logo"
            width={52}
            height={52}
            className="md:hidden transition duration-1500"
          />
          <Image
            src={isHovered ? "/first-white-logo.svg" : "/first-logo.svg"}
            alt="Liquid Logo"
            width={110}
            height={110}
            className="hidden md:block transition duration-1500"
          />
        </div>
        <div className="hidden md:block py-8 px-26 text-[#424242] text-xl font-bold squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:text-white transition duration-300">
          <Link href="/learn">Learn</Link>
        </div>
        <div className="hidden md:block py-8 px-26 text-[#424242] text-xl font-bold squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:text-white transition duration-300">
          <Link href="/terms">Terms</Link>
        </div>
        <div className="hidden md:block py-8 px-26 text-[#424242] text-xl font-bold squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:text-white transition duration-300">
          <Link href="/support">Support</Link>
        </div>
        <button
          type="button"
          onClick={() => router.push("/auth")}
          className="flex items-center gap-3 py-4 px-6 text-base md:text-xl md:py-8 md:px-26 text-[#424242] font-bold squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:text-white transition duration-300"
        >
          <Image
            src="/google-auth-colour.svg"
            alt="Google Logo"
            width={46}
            height={46}
            className="md:w-[24px] md:h-[24px]"
          />
          <span className="md:text-xl text-3xl">Login</span>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
