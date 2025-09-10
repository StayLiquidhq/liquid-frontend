"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animation";
import { useState, useRef } from "react";
import CreatePlan from "@/components/CreatePlan";
import WalletCard from "@/components/WalletCard";
import AddFunds from "@/components/AddFunds";
import Settings from "@/components/Settings";
import { useAuth } from "@/utils/hooks/useAuth";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import BreakWallet from "@/components/BreakWallet";
import LoadingSpinner from "@/components/LoadingSpinner";
import EditPayout from "@/components/EditPayout";
import { useToast } from "@/app/toast-provider";

interface Wallet {
  wallet_id: string;
  user_id: string;
  address: string;
  balance: string;
  currency: string;
  created_at: string;
  name: string;
  icon: string;
  coinImage: string;
  plan_type: "locked" | "flexible" | "target";
  plan_id: string;
}

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

const SavingsPage = () => {
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBreakWallet, setShowBreakWallet] = useState(false);
  const [showEditPayout, setShowEditPayout] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activeWalletIndex, setActiveWalletIndex] = useState(0);
  const [refreshWallets, setRefreshWallets] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [transactions, setTransactions] = useState<{
    [walletId: string]: any[];
  }>({});
  const [isInitialTransactionsLoading, setIsInitialTransactionsLoading] =
    useState(true);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );
  const [filter, setFilter] = useState("All");
  const [isSweeping, setIsSweeping] = useState(false);

  useEffect(() => {
    const isModalOpen =
      showCreatePlan ||
      showAddFunds ||
      showSettings ||
      showBreakWallet ||
      showEditPayout;
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [
    showCreatePlan,
    showAddFunds,
    showSettings,
    showBreakWallet,
    showEditPayout,
  ]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [wallets]);

  useEffect(() => {
    const fetchWallets = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/wallets/fetch`,
            {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch wallets");
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            setWallets(data);
          } else {
            setWallets([]);
          }
        } catch (error) {
          console.error("Error fetching wallets:", error);
          setWallets([]);
          showToast("Unable to load wallets. Please try again.", "error");
        }
      }
    };

    if (user) {
      fetchWallets();
    }
  }, [user, refreshWallets]);

  useEffect(() => {
    const fetchPlans = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/plans/fetch`,
            {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch plans");
          }
          const data = await response.json();
          if (Array.isArray(data)) {
            setPlans(data);
          } else {
            setPlans([]);
          }
        } catch (error) {
          console.error("Error fetching plans:", error);
          setPlans([]);
          showToast("Unable to load plans. Please try again.", "error");
        }
      }
    };

    if (user) {
      fetchPlans();
    }
  }, [user, refreshWallets]);

  useEffect(() => {
    const fetchAllHistories = async () => {
      if (!wallets.length) return;

      setTransactionsError(null);

      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        try {
          const transactionPromises = wallets.map((wallet) =>
            fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/fetch`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ wallet_id: wallet.wallet_id }),
              }
            ).then((res) => {
              if (!res.ok) {
                return res.json().then((errorData) => {
                  throw new Error(
                    errorData.error ||
                      `Failed to fetch data for wallet ${wallet.wallet_id}`
                  );
                });
              }
              return res.json();
            })
          );

          const results = await Promise.all(transactionPromises);

          const newTransactions: { [walletId: string]: any[] } = {};
          results.forEach((result, index) => {
            newTransactions[wallets[index].wallet_id] = result.transactions;
          });

          setTransactions(newTransactions);
        } catch (err: any) {
          setTransactionsError(err.message);
          showToast("Could not load transaction history.", "error");
        }
      }
    };

    if (user && wallets.length > 0) {
      if (isInitialTransactionsLoading) {
        fetchAllHistories().finally(() =>
          setIsInitialTransactionsLoading(false)
        );
      } else {
        fetchAllHistories();
      }

      const intervalId = setInterval(fetchAllHistories, 120000);

      return () => clearInterval(intervalId);
    }
  }, [user, wallets, isInitialTransactionsLoading]);

  const handlePlanCreated = () => {
    setShowCreatePlan(false);
    setRefreshWallets((prev) => !prev);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const walletWidth = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / walletWidth);
      setActiveWalletIndex(newIndex);
    }
  };

  const handleSweepWallet = async () => {
    if (!user || wallets.length === 0) return;

    setIsSweeping(true);
    try {
      const privyId = user.id;
      const walletAddress = wallets[activeWalletIndex].address;

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wallets/wallet-sweeper`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          privy_id: privyId,
          wallet_address: walletAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sweep wallet");
      }

      showToast("Wallet sweep successful!", "success");
      setRefreshWallets((prev) => !prev);
    } catch (error: any) {
      console.error("Error sweeping wallet:", error);
      showToast(error.message || "An unexpected error occurred.", "error");
    } finally {
      setIsSweeping(false);
    }
  };

  const isAddVaultActive = activeWalletIndex === wallets.length;
  const isBreakButtonDisabled =
    isAddVaultActive || wallets[activeWalletIndex]?.plan_type === "locked";

  const activeWalletTransactions =
    wallets.length > 0 && wallets[activeWalletIndex]
      ? transactions[wallets[activeWalletIndex].wallet_id] || []
      : [];

  const filteredTransactions = activeWalletTransactions.filter((tx) => {
    if (filter === "All") return true;
    if (filter === "In") return tx.type === "credit";
    if (filter === "Out") return tx.type === "debit";
    return true;
  });

  const iconMap = {
    locked: "/Lock.svg",
    flexible: "/colour-open.svg",
    target: "/colour-target.svg",
  };

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center text-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.replace("/auth");
    }
    return null;
  }

  return (
    <>
      <motion.div
        className="bg-[#1A1A1A] min-h-screen flex flex-col items-center text-white p-4 md:hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="w-full max-w-sm mx-auto flex justify-between items-center self-stretch p-4 squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Liquid Logo" width={94} height={94} />
          </div>
          <div
            className="flex items-center gap-3 p-[6px] squircle-border-1 squircle-border-[#585858] squircle squircle-7xl squircle-smooth-xl"
            onClick={() => setShowSettings(true)}
          >
            <div className="w-10 h-10 squircle squircle-3xl squircle-smooth-xl overflow-hidden">
              <Image
                src={user?.user_metadata?.avatar_url || "/frame.png"}
                alt="User Profile"
                width={40}
                height={40}
                className="object-cover squircle squircle-mask squircle-4xl squircle-smooth-xl"
              />
            </div>
          </div>
        </motion.header>

        <motion.main
          className="w-full max-w-sm mx-auto mt-4 flex flex-col items-start"
          variants={itemVariants}
        >
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4"
          >
            {wallets.map((wallet, index) => (
              <WalletCard
                key={index}
                name={wallet.name}
                balance={wallet.balance}
                icon={iconMap[wallet.plan_type]}
                coinImage="/white-3d-coin.svg"
              />
            ))}
            <motion.div
              className="relative w-full h-[172px] py-[30px] px-6 flex flex-col justify-center items-center squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E] overflow-hidden flex-shrink-0 snap-center"
              variants={itemVariants}
              style={{ width: "100%" }}
              onClick={() => setShowCreatePlan(true)}
            >
              <Image
                src="/Vault.svg"
                alt="Add Vault Icon"
                width={40}
                height={40}
              />
              <span className="text-lg mt-2">Add Vault</span>
            </motion.div>
          </div>
          <motion.div
            className="w-full flex items-start gap-3 self-stretch mt-4"
            variants={itemVariants}
          >
            <button
              onClick={() => setShowAddFunds(true)}
              className="flex-grow flex items-center justify-center gap-2 px-6 py-8 text-white squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E] disabled:opacity-50"
              disabled={isAddVaultActive}
            >
              <Image src="/in.svg" alt="Receive Icon" width={29} height={29} />
              <span className="text-lg">Add Funds</span>
            </button>
            <button
              onClick={() => setShowEditPayout(true)}
              className="flex-shrink-0 px-6 py-8  flex items-center justify-center squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E] disabled:opacity-50"
              disabled={isAddVaultActive}
            >
              <Image
                src="/setting.svg"
                alt="Settings Icon"
                width={27}
                height={27}
              />
            </button>
            <button
              onClick={() => setShowBreakWallet(true)}
              className="flex-shrink-0 px-6 py-8  flex items-center justify-center squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E] disabled:opacity-50"
              disabled={isBreakButtonDisabled}
            >
              <Image src="/Break.svg" alt="Break Icon" width={27} height={27} />
            </button>
          </motion.div>
          <motion.div
            className="w-full flex items-center ml-4 gap-2 mt-8 mb-4"
            variants={itemVariants}
            onClick={handleSweepWallet}
          >
            <Image src="/Time.svg" alt="History" width={24} height={24} />
            <span className="text-lg">Transaction History</span>
          </motion.div>
          <motion.div
            className="w-full flex flex-col items-start gap-[15px] self-stretch p-[15px] squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
            variants={itemVariants}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => setFilter("All")}
                className={`px-4 py-2 rounded-full text-sm ${
                  filter === "All"
                    ? "bg-[#242424]"
                    : "bg-transparent text-gray-400"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("Out")}
                className={`px-4 py-2 rounded-full text-sm ${
                  filter === "Out"
                    ? "bg-[#242424]"
                    : "bg-transparent text-gray-400"
                }`}
              >
                Out
              </button>
              <button
                onClick={() => setFilter("In")}
                className={`px-4 py-2 rounded-full text-sm ${
                  filter === "In"
                    ? "bg-[#242424]"
                    : "bg-transparent text-gray-400"
                }`}
              >
                In
              </button>
            </div>
            <div className="w-full flex flex-col items-start gap-3 self-stretch">
              {isInitialTransactionsLoading ? (
                <div className="w-full flex justify-center items-center h-20">
                  <LoadingSpinner />
                </div>
              ) : transactionsError ? (
                <div className="w-full text-center text-red-500">
                  Error: {transactionsError}
                </div>
              ) : filteredTransactions.length === 0 ? (
                <div className="w-full text-center text-gray-400">
                  No transactions yet.
                </div>
              ) : (
                filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="w-full flex justify-between items-center px-3 py-[18px] squircle squircle-4xl squircle-smooth-xl squircle-[#242424]"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-sm capitalize">
                        {tx.type === "credit" ? "Received" : "Sent"}
                      </span>
                      <span className="text-xl font-medium">
                        {tx.type === "debit" ? "-" : "+"}${tx.amount}
                      </span>
                    </div>
                    <div className="flex flex-col items-end text-xs text-gray-400 gap-1">
                      <span>
                        ≈ {tx.amount}
                        {tx.currency} from
                      </span>
                      <span className="truncate max-w-[120px]">
                        {tx.description}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.main>
      </motion.div>
      <div className="hidden md:flex bg-[#1A1A1A] min-h-screen flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-medium">
          Desktop mode is not available for this application
        </h1>
      </div>
      {showCreatePlan && (
        <div
          className="absolute inset-0 bg-[#00000066]  flex items-end justify-center z-50"
          onClick={() => setShowCreatePlan(false)}
        >
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <CreatePlan
              onClose={() => setShowCreatePlan(false)}
              onPlanCreated={handlePlanCreated}
            />
          </div>
        </div>
      )}
      {showAddFunds && wallets[activeWalletIndex] && (
        <div
          className="absolute inset-0 bg-[#00000066] flex items-end justify-center z-50"
          onClick={() => setShowAddFunds(false)}
        >
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <AddFunds
              onClose={() => setShowAddFunds(false)}
              wallet={wallets[activeWalletIndex]}
            />
          </div>
        </div>
      )}
      {showSettings && (
        <div
          className="absolute inset-0 bg-[#00000066] flex items-end justify-center z-50"
          onClick={() => setShowSettings(false)}
        >
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <Settings onClose={() => setShowSettings(false)} />
          </div>
        </div>
      )}
      {showBreakWallet && wallets[activeWalletIndex] && (
        <div
          className="absolute inset-0 bg-[#00000066] flex items-end justify-center z-50"
          onClick={() => setShowBreakWallet(false)}
        >
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <BreakWallet
              onClose={() => setShowBreakWallet(false)}
              planId={wallets[activeWalletIndex].plan_id}
              balance={wallets[activeWalletIndex].balance}
            />
          </div>
        </div>
      )}
      {showEditPayout && (
        <div
          className="absolute inset-0 bg-[#00000066] flex items-end justify-center z-50"
          onClick={() => setShowEditPayout(false)}
        >
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <EditPayout
              onClose={() => setShowEditPayout(false)}
              plan={
                plans.find(
                  (p) => p.id === wallets[activeWalletIndex]?.plan_id
                ) || null
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SavingsPage;
