"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SavingsOptions = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      viewport={{ once: true }}
      className="w-[calc(100%-1.5rem)] md:w-[calc(100%-4rem)] mx-auto py-10 md:py-16"
    >
      <div className="flex flex-col md:flex-row md:flex-nowrap gap-6 md:gap-12">
        {/* Left Column */}
        <div className="w-full md:w-7/12 flex flex-col gap-6 md:gap-12">
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:squircle-border-4 hover:squircle-border-[#3086FF] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] p-8 md:p-16 text-[#424242] flex-1">
            <Image
              src="/Lock.svg"
              alt="Savings Options Icon"
              width={48}
              height={48}
            />
            <h3 className="text-2xl md:text-4xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">
              Locked Vault
            </h3>
            <p className="text-base md:text-lg text-[#424242]">
              Choose how much you want to receive, when, and to which account.
              The vault can’t be broken—only the payout account can be changed.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:squircle-border-4 hover:squircle-border-[#FF692C] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] p-8 md:p-16 text-[#424242] w-full md:w-1/2">
              <Image
                src="/colour-target.svg"
                alt="Savings Options Icon"
                width={48}
                height={48}
              />
              <h3 className="text-2xl md:text-4xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">
                Target Savings
              </h3>
              <p className="text-base md:text-lg text-[#424242]">
                Set a target and payout account. Auto-paid at target, or break
                early with 5% fee.
              </p>
            </div>
            <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#FB4E88] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]  hover:squircle-border-4 hover:squircle-border-[#FB4E88] p-8 md:p-16 text-[#424242] w-full md:w-1/2">
              <Image
                src="/Piggy.svg"
                alt="Savings Options Icon"
                width={48}
                height={48}
              />
              <h3 className="text-2xl md:text-4xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">
                Piggy Bank
              </h3>
              <p className="text-base md:text-lg text-[#424242]">
                Set a date and payout account. Auto-paid on that date, or break
                early with 5% fee.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-5/12 flex flex-col gap-6 md:gap-12">
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] hover:squircle-border-4 hover:squircle-border-[#0CBA65] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] p-8 md:p-16 text-[#424242] flex-1">
            <Image
              src="/colour-open.svg"
              alt="Savings Options Icon"
              width={48}
              height={48}
            />
            <h3 className="text-2xl md:text-4xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">
              Open Vault
            </h3>
            <p className="text-base md:text-lg text-[#424242]">
              Set the amount, time, and destination. You can change the payout
              account or break the vault with a 10% fee.
            </p>
          </div>
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] p-8 md:p-16 text-[#424242]">
            <Image
              src="/path14.svg"
              alt="Savings Options Icon"
              width={48}
              height={48}
            />
            <p className="text-base md:text-lg text-[#424242] mt-3 md:mt-4">
              Watch Playlist on YouTube to learn more
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SavingsOptions;
