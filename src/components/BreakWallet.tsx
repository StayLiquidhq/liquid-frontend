import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import LoadingSpinner from "./LoadingSpinner";
import { motion, Variants } from "framer-motion";

interface BreakWalletProps {
  onClose: () => void;
  planId: string;
  balance: string;
}

const BreakWallet: React.FC<BreakWalletProps> = ({
  onClose,
  planId,
  balance,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const handleBreak = async () => {
    if (parseFloat(balance) <= 0) {
      setError("Cannot break a plan with zero balance.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("You must be logged in to break a plan.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plans/break`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan_id: planId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to break the plan.");
      }

      setSignature(result.signature);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-[380px] p-6 flex-col items-center gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
        <LoadingSpinner />
        <h2 className="text-2xl font-medium">Sending...</h2>
        <p className="text-center text-gray-400">
          Please wait while we process your request.
        </p>
      </div>
    );
  }

  if (isSuccess) {
    const successVariants: Variants = {
      hidden: { scale: 0, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
        },
      },
    };

    return (
      <div className="flex w-[380px] p-6 flex-col items-center gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
        <motion.div
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center"
          variants={successVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            className="w-16 h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </motion.div>
        <h2 className="text-2xl font-medium">Sent!</h2>
        <p className="text-center text-gray-400">
          Your savings have been successfully sent to your payout address.
        </p>
        {signature && (
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            View transaction
          </a>
        )}
        <button
          onClick={onClose}
          className="w-full p-4 font-medium squircle squircle-[18px] squircle-smooth-xl squircle-[#0088FF] text-white mt-4"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-[380px] p-6 flex-col items-center gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-medium">Break Savings</h2>
        <p className="text-center text-gray-400">
          You will be charged 2% for breaking your savings. Are you sure you
          want to continue?
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
      <div className="w-full flex gap-4">
        <button
          onClick={onClose}
          className="w-full p-4 font-medium squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleBreak}
          className="w-full p-4 font-medium squircle squircle-[18px] squircle-smooth-xl squircle-[#FB4E5A] text-[#1A1A1A]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BreakWallet;
