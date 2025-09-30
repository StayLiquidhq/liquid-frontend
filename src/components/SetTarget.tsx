import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/app/toast-provider";
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
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [banks, setBanks] = useState<Array<{ name: string; code: string }>>([]);
  const [isValidatingAccount, setIsValidatingAccount] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountError, setAccountError] = useState<string | null>(null);
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
  const { showToast } = useToast();

  // Fetch banks list once
  useEffect(() => {
    const loadBanks = async () => {
      try {
        const res = await fetch("/api/banks", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data?.banks)) setBanks(data.banks);
      } catch {}
    };
    loadBanks();
  }, []);

  // Validate account and set accountName
  useEffect(() => {
    const maybeValidate = async () => {
      if (!bankCode || !/^\d{10}$/.test(accountNumber.trim())) {
        setAccountName("");
        setAccountError(null);
        return;
      }
      setIsValidatingAccount(true);
      try {
        const params = new URLSearchParams({ accountNumber, bankCode });
        const res = await fetch(`/api/accounts/validate?${params.toString()}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setAccountName(data?.accountName || "");
          setAccountError(null);
        } else {
          const err = await res.json().catch(() => ({}));
          setAccountName("");
          setAccountError(err?.error || "Unable to validate account");
        }
      } catch {
        setAccountName("");
        setAccountError("Unable to validate account");
      } finally {
        setIsValidatingAccount(false);
      }
    };
    maybeValidate();
  }, [bankCode, accountNumber]);

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
      // Fiat: require selected bank and valid 10-digit account number
      const isValidNuban = /^\d{10}$/.test(accountNumber.trim());
      if (!(bankName && isValidNuban)) {
        setError(
          "Please enter a valid 10-digit account number and select a bank."
        );
        setIsLoading(false);
        return;
      }
      payload.payout_account_number = accountNumber;
      payload.bank_name = bankName;
      payload.bank_code = bankCode;
      if (accountName) payload.account_name = accountName;
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
        const msg = errorData.error || "Failed to create plan.";
        if (
          typeof msg === "string" &&
          msg.toLowerCase().includes("plan limit")
        ) {
          showToast(msg, "error");
        }
        throw new Error(msg);
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

  // Derived validations
  const hasName = name.trim().length > 0;
  const isAmountTargetValid =
    targetType === "amount"
      ? (() => {
          const n = parseFloat(targetAmount);
          return !Number.isNaN(n) && n > 0;
        })()
      : true;
  const isDateTargetValid =
    targetType === "date" ? targetDate.trim().length > 0 : true;
  const isCryptoValid =
    payoutMethod === "crypto"
      ? walletAddress.trim().length > 0 && isValidAddress
      : true;
  const isFiatValid =
    payoutMethod === "fiat"
      ? bankName.trim().length > 0 &&
        /^\d{10}$/.test(accountNumber) &&
        !!accountName &&
        !accountError
      : true;
  const isFormValid =
    hasName &&
    isAmountTargetValid &&
    isDateTargetValid &&
    isCryptoValid &&
    isFiatValid;

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
            className="w-full flex flex-col gap-3"
          >
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-400">
                Payout Account Number (NGN)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter 10-digit account number"
                className={`w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white ${
                  accountNumber && !/^\d{10}$/.test(accountNumber)
                    ? "squircle-border-red-500 squircle-border-2"
                    : ""
                }`}
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-gray-400">Account Details</label>
              <select
                value={bankCode}
                onChange={(e) => {
                  const code = e.target.value;
                  setBankCode(code);
                  const selected = banks.find((b) => b.code === code);
                  setBankName(selected?.name || "");
                }}
                className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white appearance-none"
              >
                <option value="">Select Bank</option>
                {banks.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {bankCode && /^\d{10}$/.test(accountNumber) && (
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm text-gray-400">Account Name</label>
                <input
                  type="text"
                  value={accountName}
                  readOnly
                  disabled={isValidatingAccount}
                  className="w-full p-4 text-lg squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white opacity-80"
                />
                {accountError && (
                  <span className="text-red-500 text-xs">{accountError}</span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleSubmit}
        disabled={
          isLoading ||
          (payoutMethod === "crypto" && !isValidAddress) ||
          (payoutMethod === "fiat" &&
            !(bankName && /^\d{10}$/.test(accountNumber)))
        }
        className="w-full p-4 text-white font-medium squircle squircle-[18px] squircle-[#0088FF] squircle-smooth-xl disabled:opacity-50"
      >
        {isLoading ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default SetTarget;
