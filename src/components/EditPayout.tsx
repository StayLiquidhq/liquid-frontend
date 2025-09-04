import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";

interface Wallet {
  id: string;
  plan_id: string;
  address: string;
  created_at: string;
}

interface Plan {
  id: string;
  user_id: string;
  plan_type: string;
  received_amount: number;
  recurrent_payout: number;
  frequency: string;
  payout_time: string;
  created_at: string;
  wallets: Wallet[];
}

interface EditPayoutProps {
  onClose: () => void;
}

const EditPayout: React.FC<EditPayoutProps> = ({ onClose }) => {
  const [payoutMethod, setPayoutMethod] = useState("crypto");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("Zenith Bank PLC");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plans/fetch`, {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch plan");
          }
          const plans = await response.json();
          if (plans.length > 0) {
            const currentPlan = plans[0];
            setPlan(currentPlan);
            // Assuming if wallet exists, it's crypto
            if (currentPlan.wallets && currentPlan.wallets.length > 0) {
              setPayoutMethod("crypto");
              setWalletAddress(currentPlan.payout_wallet_address);
            } else {
              setPayoutMethod("fiat");
              setAccountNumber(currentPlan.payout_account_number);
              setAccountName(currentPlan.account_name);
              setBankName(currentPlan.bank_name);
            }
          }
        } catch (error) {
          console.error("Error fetching plan:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  const handleSave = async () => {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && plan) {
      const updateData: any = {
        plan_id: plan.id,
        payout_method: payoutMethod,
      };

      if (payoutMethod === "crypto") {
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
        });

        if (!response.ok) {
          throw new Error("Failed to update plan");
        }

        alert("Payout updated successfully!");
        onClose();
      } catch (error) {
        console.error("Error updating plan:", error);
        alert("Failed to update payout.");
      }
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
              onChange={(e) => setWalletAddress(e.target.value)}
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
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-400">Account Details</label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white appearance-none"
              >
                <option>Zenith Bank PLC</option>
                {/* Add other banks as needed */}
              </select>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full flex flex-col gap-2 opacity-50">
        <label className="text-sm text-gray-400">Recurrent Payout</label>
        <input
          type="text"
          value={`$${plan?.recurrent_payout || ""}`}
          className="w-full p-4 text-lg squircle squircle-[18px] squircle-[#252525] squircle-smooth-xl text-white"
          disabled
        />
      </div>

      <div className="w-full flex flex-col gap-2 opacity-50">
        <label className="text-sm text-gray-400">Frequency</label>
        <select
          className="w-full p-4 text-lg squircle-[#252525]  squircle squircle-[18px] squircle-smooth-xl text-white appearance-none"
          disabled
        >
          <option>{plan?.frequency || ""}</option>
        </select>
      </div>

      <div className="w-full flex flex-col gap-2 opacity-50">
        <select
          className="w-full p-4 text-lg squircle-[#252525]  squircle squircle-[18px] squircle-smooth-xl text-white appearance-none"
          disabled
        >
          <option>{`${plan?.payout_time} (UTC)` || ""}</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="w-full p-4 text-white font-medium squircle squircle-[18px] squircle-smooth-xl squircle-[#0088FF] "
      >
        Save
      </button>
    </div>
  );
};

export default EditPayout;
