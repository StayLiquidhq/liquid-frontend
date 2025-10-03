"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="relative w-[calc(100%-1.5rem)] md:w-[calc(100%-4rem)] mx-auto h-[480px] md:h-[500px] p-8 md:p-12 flex flex-col justify-center items-start text-left text-[#424242] squircle squircle-5xl squircle-smooth-xl squircle-[#1E1E1E] overflow-hidden"
    >
      <Image
        src="/white-3d-coin.svg"
        alt="3D Coin"
        width={700}
        height={700}
        className="absolute -right-20 -bottom-24 md:-right-20 md:-bottom-50 opacity-10 scale-90 md:scale-100"
      />
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-medium leading-tight">
          Save money today <br /> and never run out <br /> of liquidity
        </h1>
        <p className="text-lg md:text-xl mt-4 md:mt-4">
          Zero transaction fees + 4% APY
        </p>
      </div>
    </motion.section>
  );
};

export default Hero;
