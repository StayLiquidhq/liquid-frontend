import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { PublicKey } from "@solana/web3.js";

interface SetTargetProps {
  onClose: () => void;
  onPlanCreated: () => void;
}

const SetTarget: React.FC<SetTargetProps> = ({ onClose, onPlanCreated }) => {
  const [targetType, setTargetType] = useState("amount");
  const [payoutMethod, setPayoutMethod] = useState("crypto");
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [accountNumber] = useState("");
  const [bankName] = useState("Zenith Bank PLC");
  const [accountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidAddress, setIsValidAddress] = useState(true);

  const isValidSolanaAddress = (address: string): boolean => {
    const trimmed = address.trim();
    if (trimmed.length === 0) return true; // don't flag empty state
    try {
      const pubkey = new PublicKey(trimmed);
      return pubkey.toBase58() === trimmed;
    } catch {
      return false;
    }
  };

  const supabase = createClient();

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setError("You must be logged in to create a plan.");
      setIsLoading(false);
      return;
    }

    const payload: any = {
      name: name,
      plan_type: "target",
      target_type: targetType,
      payout_method: payoutMethod,
    };

    if (targetType === "amount") {
      if (!targetAmount) {
        setError("Target amount is required.");
        setIsLoading(false);
        return;
      }
      payload.target_amount = parseFloat(targetAmount);
    } else {
      if (!targetDate) {
        setError("Target date is required.");
        setIsLoading(false);
        return;
      }
      payload.target_date = targetDate;
    }

    if (payoutMethod === "crypto") {
      if (!walletAddress) {
        setError("Wallet address is required.");
        setIsLoading(false);
        return;
      }
      if (!isValidAddress) {
        setError("Please enter a valid Solana wallet address.");
        setIsLoading(false);
        return;
      }
      payload.payout_wallet_address = walletAddress;
    } else {
      if (!accountNumber || !bankName || !accountName) {
        setError("All bank details are required.");
        setIsLoading(false);
        return;
      }
      payload.payout_account_number = accountNumber;
      payload.bank_name = bankName;
      payload.account_name = accountName;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/plans/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create plan.");
      }

      onPlanCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div className="flex w-[380px] p-6 flex-col items-start gap-4 relative squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-white hover:opacity-80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-medium">
          {targetType === "amount" ? "Set Target Amount" : "Set Target Date"}
        </h2>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="w-full flex flex-col gap-2">
        <label className="text-sm text-gray-400">Name of Vault</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Vacation Fund"
          className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
        />
      </div>

      <div className="w-full flex gap-2">
        <button
          onClick={() => setTargetType("amount")}
          className={`flex-1 p-2 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] ${
            targetType === "amount" ? "opacity-100" : "opacity-50"
          }`}
        >
          Amount
        </button>
        <button
          onClick={() => setTargetType("date")}
          className={`flex-1 p-2 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] ${
            targetType === "date" ? "opacity-100" : "opacity-50"
          }`}
        >
          Date
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
            <label className="text-sm text-gray-400">Target Amount ($)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="e.g., 5000"
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
            <label className="text-sm text-gray-400">Target Date</label>
            <div className="relative w-full">
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
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
              value={walletAddress}
              onChange={(e) => {
                const address = e.target.value;
                setWalletAddress(address);
                setIsValidAddress(isValidSolanaAddress(address));
              }}
              placeholder="Enter wallet address"
              className={`w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white font-mono ${
                isValidAddress
                  ? "squircle-border-transparent"
                  : "squircle-border-red-500 squircle-border-2"
              }`}
            />
          </motion.div>
        ) : (
          <motion.div
            key="fiat-payout"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <div className="flex items-center gap-3 p-4 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white">
              <Image src="/Info.svg" alt="Info" width={24} height={24} />
              <span>Coming this November</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleSubmit}
        disabled={
          isLoading ||
          payoutMethod === "fiat" ||
          (payoutMethod === "crypto" && !isValidAddress)
        }
        className="w-full p-4 text-white font-medium squircle squircle-[18px] squircle-[#0088FF] squircle-smooth-xl disabled:opacity-50"
      >
        {isLoading ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default SetTarget;
