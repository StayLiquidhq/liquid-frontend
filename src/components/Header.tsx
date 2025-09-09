import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#1A1A1A] w-full flex justify-center py-6"
    >
      <div className="flex items-center gap-6">
            <div
            className="flex items-start gap-2 py-6 px-24 text-[#424242] squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:squircle-[#3086FF] transition-colors duration-1500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
            <Image
              src={isHovered ? "/first-white-logo.svg" : "/first-logo.svg"}
              alt="Liquid Logo"
              width={110}
              height={110}
              className="transition duration-1500"
            />
            </div>
        <div className="py-8 px-26 text-[#424242] text-xl font-bold squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:text-white transition duration-300">
          <Link href="/learn">Learn</Link>
        </div>
        <div className="py-8 px-26 text-[#424242] text-xl font-bold squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:text-white transition duration-300">
          <Link href="/terms">Terms & Conditions</Link>
        </div>
        <div className="py-8 px-26 text-[#424242] text-xl font-bold squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:text-white transition duration-300">
          <Link href="/support">Support</Link>
        </div>
        <button className="flex items-center gap-2 py-8 px-26 text-[#424242] text-xl font-bold squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:text-white transition duration-300">
          <Image src="/google-auth-colour.svg" alt="Google Logo" width={24} height={24} />
          <span>Login</span>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
