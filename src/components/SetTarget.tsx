import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

interface SetTargetProps {
  onClose: () => void;
}

const SetTarget: React.FC<SetTargetProps> = ({ onClose }) => {
  const [targetType, setTargetType] = useState("amount");
  const [payoutMethod, setPayoutMethod] = useState("crypto");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("Zenith Bank PLC");
  const [accountName, setAccountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plans/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create plan.");
      }

      onClose();
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
    <div className="flex w-[380px] p-6 flex-col items-start gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-medium">
          {targetType === "amount" ? "Set Target Amount" : "Set Target Date"}
        </h2>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

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
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter wallet address"
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
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-400">Bank Name</label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white appearance-none"
              >
                <option>Zenith Bank PLC</option>
                <option>Guaranty Trust Bank</option>
                <option>First Bank of Nigeria</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-400">Account Name</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter account name"
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full p-4 text-white font-medium squircle squircle-[18px] squircle-[#0088FF] squircle-smooth-xl disabled:opacity-50"
      >
        {isLoading ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default SetTarget;
