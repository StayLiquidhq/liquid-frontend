"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animation";
import { useState } from "react";
import CreatePlan from "@/components/CreatePlan";

const SavingsPage = () => {
  const [showCreatePlan, setShowCreatePlan] = useState(false);

  return (
    <>
      <motion.div
        className="bg-[#1A1A1A] min-h-screen flex flex-col items-center text-white p-4 md:hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="w-full max-w-sm mx-auto flex justify-between items-center self-stretch p-4 squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Liquid Logo" width={94} height={94} />
          </div>
          <div className="flex items-center gap-3 p-[6px] squircle-border-1 squircle-border-[#585858] squircle squircle-7xl squircle-smooth-xl">
            <div className="w-10 h-10 squircle squircle-3xl squircle-smooth-xl overflow-hidden">
              <Image
                src="/frame.png"
                alt="User Profile"
                width={40}
                height={40}
                className="object-cover squircle squircle-mask squircle-4xl squircle-smooth-xl"
              />
            </div>
          </div>
        </motion.header>

        
        <motion.main
          className="w-full max-w-sm mx-auto mt-4 flex flex-col items-start"
          variants={itemVariants}
        >
          <motion.div
            className="relative w-full h-[172px] py-[30px] px-6 flex flex-col justify-between items-start squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E] overflow-hidden"
            variants={itemVariants}
          >
            <Image
              src="/white-3d-coin.svg"
              alt="3D Coin"
              width={210}
              height={210}
              className="absolute  -right-4 -top-8 opacity-3"
            />
            <div className="relative z-10 w-full flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Image src="/Lock.svg" alt="Lock Icon" width={18} height={18} />
                <span className="text-sm">Wallet 1</span>
              </div>
              <Image src="/Eye.svg" alt="Eye Icon" width={18} height={18} />
            </div>
            <div className="relative z-10">
              <h2 className="text-5xl font-medium">$3,000.00</h2>
            </div>
          </motion.div>
          <motion.div
            className="w-full flex items-start gap-3 self-stretch mt-4"
            variants={itemVariants}
          >
            <button className="flex-grow flex items-center justify-center gap-2 px-6 py-8 text-white squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]">
              <Image src="/in.svg" alt="Receive Icon" width={29} height={29} />
              <span className="text-lg">Receive</span>
            </button>
            <button
              onClick={() => setShowCreatePlan(true)}
              className="flex-shrink-0 px-6 py-8  flex items-center justify-center squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
            >
              <Image src="/setting.svg" alt="Settings Icon" width={27} height={27} />
            </button>
            <button className="flex-shrink-0 px-6 py-8  flex items-center justify-center squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]">
              <Image src="/Break.svg" alt="Break Icon" width={27} height={27} />
            </button>
          </motion.div>
          <motion.div
            className="w-full flex items-center ml-4 gap-2 mt-8 mb-4"
            variants={itemVariants}
          >
            <Image src="/Time.svg" alt="History" width={24} height={24} />
            <span className="text-lg">Transaction History</span>
          </motion.div>
          <motion.div
            className="w-full flex flex-col items-start gap-[15px] self-stretch p-[15px] squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
            variants={itemVariants}
          >
            <div className="flex items-start gap-3">
              <button className="px-4 py-2 bg-[#242424] rounded-full text-sm">All</button>
              <button className="px-4 py-2 bg-transparent rounded-full text-sm text-gray-400">Out</button>
              <button className="px-4 py-2 bg-transparent rounded-full text-sm text-gray-400">In</button>
            </div>
            <div className="w-full flex flex-col items-start gap-3 self-stretch">
              <div className="w-full flex justify-between items-center px-3 py-[18px] squircle squircle-4xl squircle-smooth-xl squircle-[#242424]">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm">Received</span>
                  <span className="text-xl font-medium">+$500</span>
                </div>
                <div className="flex flex-col items-end text-xs text-gray-400 gap-1">
                  <span>≈ 500USDC from</span>
                  <span>EPwlk2uuQhXkg3...Sfn</span>
                </div>
              </div>
              <div className="w-full flex justify-between items-center px-3 py-[18px] squircle squircle-4xl squircle-smooth-xl squircle-[#242424]">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm">Sent</span>
                  <span className="text-xl font-medium">-$200</span>
                </div>
                <div className="flex flex-col items-end text-xs text-gray-400 gap-1">
                  <span>≈ 200USDC to</span>
                  <span>EPwlk2uuQhXkg3...Sfn</span>
                </div>
              </div>
              <div className="w-full flex justify-between items-center px-3 py-[18px] squircle squircle-4xl squircle-smooth-xl squircle-[#242424]">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm">Sent</span>
                  <span className="text-xl font-medium">-$20</span>
                </div>
                <div className="flex flex-col items-end text-xs text-gray-400 gap-1">
                  <span>≈ ₦32,004 to</span>
                  <span>2271230000 - Zenith PLc</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.main>
      </motion.div>
      <div className="hidden md:flex bg-[#1A1A1A] min-h-screen flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-medium">
          Desktop mode is not available for this application
        </h1>
      </div>
      {showCreatePlan && (
        <div className="absolute inset-0 bg-[#00000066]  flex items-end justify-center z-50">
          <CreatePlan />
        </div>
      )}
    </>
  );
};

export default SavingsPage;
