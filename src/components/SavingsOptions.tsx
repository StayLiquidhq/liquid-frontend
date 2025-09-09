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
      className="w-[calc(100%-4rem)] mx-auto py-16"
    >
      <div className="flex flex-wrap md:flex-nowrap gap-12">
        {/* Left Column */}
        <div className="w-full md:w-7/12 flex flex-col gap-12">
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-16 text-[#424242] flex-1">
            <Image
              src="/Lock.svg"
              alt="Savings Options Icon"
              width={48}
              height={48}
            />
            <h3 className="text-4xl font-semibold mt-8 mb-4">Locked Vault</h3>
            <p className="text-lg text-[#424242]">
              Choose how much you want to receive, when, and to which account.
              The vault can’t be broken—only the payout account can be changed.
            </p>
          </div>
          <div className="flex gap-12">
            <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-16 text-[#424242] w-1/2">
              <Image
              src="/colour-target.svg"
              alt="Savings Options Icon"
              width={48}
              height={48}
            />
              <h3 className="text-4xl font-semibold mt-8 mb-4">Target Savings</h3>
              <p className="text-lg text-[#424242]">
                Set a target and payout account. Auto-paid at target, or break
                early with 10% fee.
              </p>
            </div>
            <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-16 text-[#424242] w-1/2">
              <Image
                src="/Piggy.svg"
                alt="Savings Options Icon"
                width={48}
                height={48}
              />
              <h3 className="text-4xl font-semibold mt-8 mb-4">Piggy Bank</h3>
              <p className="text-lg text-[#424242]">
                Set a date and payout account. Auto-paid on that date, or break
                early with 10% fee.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-5/12 flex flex-col gap-12">
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-16 text-[#424242] flex-1">
            <Image
              src="/colour-open.svg"
              alt="Savings Options Icon"
              width={48}
              height={48}
            />
            <h3 className="text-4xl font-semibold mt-8 mb-4">Open Vault</h3>
            <p className="text-lg text-[#424242]">
              Set the amount, time, and destination. You can change the payout
              account or break the vault with a 10% fee.
            </p>
          </div>
          <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] p-16 text-[#424242]">
            <Image
              src="/path14.svg"
              alt="Savings Options Icon"
              width={48}
              height={48}
            />
            <p className="text-lg text-[#424242] mt-4">
              Watch Playlist on YouTube to learn more
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SavingsOptions;
