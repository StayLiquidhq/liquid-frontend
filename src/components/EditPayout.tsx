import Image from "next/image";
import { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

interface Plan {
  id: string;
  user_id: string;
  plan_type: "locked" | "flexible" | "target";
  received_amount: number | null;
  recurrent_payout: number | null;
  frequency: string | null;
  payout_time: string | null;
  target_type: "amount" | "date" | null;
  target_amount: number | null;
  target_date: string | null;
  payout_method: "crypto" | "fiat";
  payout_account_number: string | null;
  bank_name: string | null;
  account_name: string | null;
  payout_wallet_address: string;
  created_at: string;
  last_payout_date: string | null;
  next_payout_date: string | null;
  status: string;
}

interface EditPayoutProps {
  onClose: () => void;
  plan: Plan | null;
}

const EditPayout: React.FC<EditPayoutProps> = ({ onClose, plan }) => {
  const [payoutMethod, setPayoutMethod] = useState("crypto");
  const [walletAddress, setWalletAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("Zenith Bank PLC");
  const [accountName, setAccountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(true);

  const isValidSolanaAddress = (address: string): boolean => {
    const trimmed = address.trim();
    if (trimmed.length === 0) return true; // do not show error on empty input
    try {
      const pubkey = new PublicKey(trimmed);
      return pubkey.toBase58() === trimmed;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (plan) {
      setPayoutMethod(plan.payout_method === "fiat" ? "fiat" : "crypto");
      const initialAddress = plan.payout_wallet_address || "";
      setWalletAddress(initialAddress);
      setIsValidAddress(isValidSolanaAddress(initialAddress));
      setAccountNumber(plan.payout_account_number || "");
      setAccountName(plan.account_name || "");
      setBankName(plan.bank_name || "Zenith Bank PLC");
    }
  }, [plan]);

  const handleSave = async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && plan) {
      setIsLoading(true);
      const updateData: any = {
        plan_id: plan.id,
        payout_method: payoutMethod,
      };

      if (payoutMethod === "crypto") {
        if (!isValidAddress) {
          alert("Please enter a valid Solana wallet address.");
          setIsLoading(false);
          return;
        }
        updateData.payout_wallet_address = walletAddress;
      } else {
        updateData.payout_account_number = accountNumber;
        updateData.bank_name = bankName;
        updateData.account_name = accountName;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/plans/update`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(updateData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update plan");
        }

        alert("Payout updated successfully!");
        onClose();
      } catch (error) {
        console.error("Error updating plan:", error);
        alert("Failed to update payout.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const toOrdinal = (value: string): string => {
    const n = parseInt(value, 10);
    if (!Number.isFinite(n)) return value;
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) return `${n}st`;
    if (j === 2 && k !== 12) return `${n}nd`;
    if (j === 3 && k !== 13) return `${n}rd`;
    return `${n}th`;
  };

  if (!plan) {
    return (
      <div className="flex w-[380px] p-6 flex-col items-center justify-center gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
        <p>Loading plan details...</p>
      </div>
    );
  }

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
        <h2 className="text-xl font-medium">Edit Payout</h2>
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
              value={walletAddress}
              onChange={(e) => {
                const address = e.target.value;
                setWalletAddress(address);
                setIsValidAddress(isValidSolanaAddress(address));
              }}
              className={`w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white font-mono ${
                isValidAddress
                  ? "squircle-border-transparent"
                  : "squircle-border-red-500 squircle-border-2"
              }`}
            />
          </motion.div>
        ) : (
          <motion.div
            key="fiat"
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

      {(plan.plan_type === "locked" || plan.plan_type === "flexible") && (
        <>
          <div className="w-full flex flex-col gap-2 opacity-50">
            <label className="text-sm text-gray-400">Recurrent Payout</label>
            <input
              type="text"
              value={`$${plan.recurrent_payout || ""}`}
              className="w-full p-4 text-lg squircle squircle-[18px] squircle-[#252525] squircle-smooth-xl text-white"
              disabled
            />
          </div>
          <div className="w-full flex flex-col gap-2 opacity-50">
            <label className="text-sm text-gray-400">Frequency</label>
            <input
              type="text"
              value={plan.frequency || ""}
              className="w-full p-4 text-lg squircle squircle-[18px] squircle-[#252525] squircle-smooth-xl text-white capitalize"
              disabled
            />
          </div>
          <div className="w-full flex flex-col gap-2 opacity-50">
            <label className="text-sm text-gray-400">
              {plan.frequency === "daily"
                ? "Payout Time"
                : plan.frequency === "weekly"
                ? "Payout Day (Week)"
                : plan.frequency === "monthly"
                ? "Payout Day (Month)"
                : "Payout Time"}
            </label>
            <input
              type="text"
              value={(() => {
                if (plan.frequency === "daily") {
                  return plan.payout_time ? `${plan.payout_time} (UTC)` : "";
                }
                if (plan.frequency === "weekly") {
                  return plan.payout_time || ""; // e.g., Monday
                }
                if (plan.frequency === "monthly") {
                  return plan.payout_time ? toOrdinal(plan.payout_time) : ""; // e.g., 15th
                }
                return plan.payout_time || "";
              })()}
              className="w-full p-4 text-lg squircle squircle-[18px] squircle-[#252525] squircle-smooth-xl text-white capitalize"
              disabled
            />
          </div>
        </>
      )}

      {plan.plan_type === "target" && (
        <>
          {plan.target_type === "amount" && (
            <div className="w-full flex flex-col gap-2 opacity-50">
              <label className="text-sm text-gray-400">Target Amount</label>
              <input
                type="text"
                value={`$${plan.target_amount || ""}`}
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-[#252525] squircle-smooth-xl text-white"
                disabled
              />
            </div>
          )}
          {plan.target_type === "date" && (
            <div className="w-full flex flex-col gap-2 opacity-50">
              <label className="text-sm text-gray-400">Target Date</label>
              <input
                type="text"
                value={
                  plan.target_date
                    ? new Date(plan.target_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""
                }
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-[#252525] squircle-smooth-xl text-white"
                disabled
              />
            </div>
          )}
        </>
      )}

      <button
        onClick={handleSave}
        disabled={
          isLoading ||
          payoutMethod === "fiat" ||
          (payoutMethod === "crypto" && !isValidAddress)
        }
        className="w-full p-4 text-white font-medium squircle squircle-[18px] squircle-smooth-xl squircle-[#0088FF] disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default EditPayout;
