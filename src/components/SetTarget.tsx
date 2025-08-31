import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SetTargetProps {
  onClose: () => void;
}

const SetTarget: React.FC<SetTargetProps> = ({ onClose }) => {
  const [targetType, setTargetType] = useState("amount");
  const [payoutMethod, setPayoutMethod] = useState("crypto");

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div className="flex w-[380px] p-6 flex-col items-start gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-medium">
          {targetType === "amount" ? "Set Target" : "Set Date"}
        </h2>
      </div>

      <div className="w-full flex gap-2">
        <button
          onClick={() => setTargetType("amount")}
          className={`flex-1 p-2 squircle squircle-[18px] squircle-smooth-xl bg-[#252525] ${
            targetType === "amount" ? "opacity-100" : "opacity-50"
          }`}
        >
          Amount Target
        </button>
        <button
          onClick={() => setTargetType("date")}
          className={`flex-1 p-2 squircle squircle-[18px] squircle-smooth-xl bg-[#252525] ${
            targetType === "date" ? "opacity-100" : "opacity-50"
          }`}
        >
          Date Target
        </button>
      </div>

      <AnimatePresence mode="wait">
        {targetType === "amount" ? (
          <motion.div
            key="amount-target"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col gap-2"
          >
            <label className="text-sm text-gray-400">Target Amount</label>
            <input
              type="text"
              defaultValue="$2,086.09"
              className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
            />
          </motion.div>
        ) : (
          <motion.div
            key="date-target"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col gap-2"
          >
            <label className="text-sm text-gray-400">Date</label>
            <div className="relative w-full">
              <input
                type="text"
                defaultValue="18th Sept, 2025"
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
              />
              <Image
                src="/calendar.svg"
                alt="Calendar"
                width={24}
                height={24}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <button
          onClick={() => setPayoutMethod("crypto")}
          className={`p-2 rounded-full px-8 bg-[#252525] ${
            payoutMethod === "crypto" ? "opacity-100" : "opacity-50"
          }`}
        >
          Crypto
        </button>
        <button
          onClick={() => setPayoutMethod("fiat")}
          className={`p-2 rounded-full px-8 bg-[#252525] ${
            payoutMethod === "fiat" ? "opacity-100" : "opacity-50"
          }`}
        >
          Fiat
        </button>
      </div>

      <AnimatePresence mode="wait">
        {payoutMethod === "crypto" ? (
          <motion.div
            key="crypto-payout"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col gap-2"
          >
            <label className="text-sm text-gray-400">
              Payout Wallet Address (Solana)
            </label>
            <input
              type="text"
              defaultValue="5cfbH5yg3bn8hg67Jv...hk9t"
              className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white font-mono"
            />
          </motion.div>
        ) : (
          <motion.div
            key="fiat-payout"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col gap-4"
          >
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Payout Account Number (NGN)
              </label>
              <input
                type="text"
                defaultValue="2271230000"
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-400">Account Details</label>
              <select className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white appearance-none">
                <option>Zenith Bank PLC</option>
              </select>
              <input
                type="text"
                defaultValue="John Wick"
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="w-full p-4 text-white font-medium squircle squircle-[18px] squircle-[#0088FF] squircle-smooth-xl">
        Create
      </button>
    </div>
  );
};

export default SetTarget;
