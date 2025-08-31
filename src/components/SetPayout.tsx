import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SetPayoutProps {
  onClose: () => void;
}

const SetPayout: React.FC<SetPayoutProps> = ({ onClose }) => {
  const [payoutMethod, setPayoutMethod] = useState("crypto");

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div className="flex w-[380px] p-6 flex-col items-start gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white max-h-[80vh] overflow-y-auto scrollbar-hide">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-medium">Set Payout</h2>
        <button onClick={onClose}>
          <Image src="/close.svg" alt="Close" width={24} height={24} />
        </button>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label className="text-sm text-gray-400">Received Amount</label>
        <input
          type="text"
          defaultValue="$2,086.09"
          className="w-full p-4 text-lg squircle squircle-[#252525] squircle-[18px] squircle-smooth-xl text-white"
        />
      </div>

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
            key="crypto"
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
            key="fiat"
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

      <div className="w-full flex flex-col gap-2">
        <label className="text-sm text-gray-400">Recurrent Payout</label>
        <input
          type="text"
          defaultValue="$200"
          className="w-full p-4 text-lg squircle squircle-[18px] squircle-[#252525] squircle-smooth-xl text-white"
        />
      </div>

      <div className="w-full flex justify-between gap-2">
        <button className="flex-1 p-2 squircle-[#252525]  squircle squircle-[18px] squircle-smooth-xl">
          5%
        </button>
        <button className="flex-1 p-2 squircle-[#252525] squircle squircle-[18px] squircle-smooth-xl">
          10%
        </button>
        <button className="flex-1 p-2 squircle-[#252525] squircle squircle-[18px] squircle-smooth-xl">
          20%
        </button>
        <button className="flex-1 p-2 squircle-[#252525] squircle squircle-[18px] squircle-smooth-xl">
          50%
        </button>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label className="text-sm text-gray-400">Frequency</label>
        <select className="w-full p-4 text-lg squircle-[#252525]  squircle squircle-[18px] squircle-smooth-xl text-white appearance-none">
          <option>Daily</option>
        </select>
      </div>

      <div className="w-full flex flex-col gap-2">
        <select className="w-full p-4 text-lg squircle-[#252525]  squircle squircle-[18px] squircle-smooth-xl text-white appearance-none">
          <option>07:00 AM (WAT)</option>
        </select>
      </div>

      <button className="w-full p-4 squircle-[#0088FF]  text-white font-medium squircle squircle-[18px] squircle-smooth-xl">
        Create
      </button>
    </div>
  );
};

export default SetPayout;
