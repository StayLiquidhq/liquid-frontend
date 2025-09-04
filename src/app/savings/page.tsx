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
}

const SavingsPage = () => {
  const { user, loading } = useAuth();
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBreakWallet, setShowBreakWallet] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [activeWalletIndex, setActiveWalletIndex] = useState(0);
  const [refreshWallets, setRefreshWallets] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/wallets/fetch`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );
        const data = await response.json();
        setWallets(data);
      }
    };

    if (user) {
      fetchWallets();
    }
  }, [user, refreshWallets]);

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

  const walletIcons = ["/colour-open.svg", "/Lock.svg", "/colour-target.svg"];

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
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
          <div className="flex items-center gap-3 p-[6px] squircle-border-1 squircle-border-[#585858] squircle squircle-7xl squircle-smooth-xl">
            <div className="w-10 h-10 squircle squircle-3xl squircle-smooth-xl overflow-hidden">
              <Image
                src="/frame.png"
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
                icon={
                  walletIcons[Math.floor(Math.random() * walletIcons.length)]
                }
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
                src="/vault.svg"
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
              className="flex-grow flex items-center justify-center gap-2 px-6 py-8 text-white squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
            >
              <Image src="/in.svg" alt="Receive Icon" width={29} height={29} />
              <span className="text-lg">Receive</span>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex-shrink-0 px-6 py-8  flex items-center justify-center squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
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
              className="flex-shrink-0 px-6 py-8  flex items-center justify-center squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
            >
              <Image src="/Break.svg" alt="Break Icon" width={27} height={27} />
            </button>
          </motion.div>
          <motion.div
            className="w-full flex items-center ml-4 gap-2 mt-8 mb-4"
            variants={itemVariants}
          >
            <Image src="/Time.svg" alt="History" width={24} height={24} />
            <span className="text-lg">Transaction History</span>
          </motion.div>
          <motion.div
            className="w-full flex flex-col items-start gap-[15px] self-stretch p-[15px] squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E]"
            variants={itemVariants}
          >
            <div className="flex items-start gap-3">
              <button className="px-4 py-2 bg-[#242424] rounded-full text-sm">
                All
              </button>
              <button className="px-4 py-2 bg-transparent rounded-full text-sm text-gray-400">
                Out
              </button>
              <button className="px-4 py-2 bg-transparent rounded-full text-sm text-gray-400">
                In
              </button>
            </div>
            <div className="w-full flex flex-col items-start gap-3 self-stretch">
              <div className="w-full flex justify-between items-center px-3 py-[18px] squircle squircle-4xl squircle-smooth-xl squircle-[#242424]">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm">Received</span>
                  <span className="text-xl font-medium">+$500</span>
                </div>
                <div className="flex flex-col items-end text-xs text-gray-400 gap-1">
                  <span>≈ 500USDC from</span>
                  <span>EPwlk2uuQhXkg3...Sfn</span>
                </div>
              </div>
              <div className="w-full flex justify-between items-center px-3 py-[18px] squircle squircle-4xl squircle-smooth-xl squircle-[#242424]">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm">Sent</span>
                  <span className="text-xl font-medium">-$200</span>
                </div>
                <div className="flex flex-col items-end text-xs text-gray-400 gap-1">
                  <span>≈ 200USDC to</span>
                  <span>EPwlk2uuQhXkg3...Sfn</span>
                </div>
              </div>
              <div className="w-full flex justify-between items-center px-3 py-[18px] squircle squircle-4xl squircle-smooth-xl squircle-[#242424]">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm">Sent</span>
                  <span className="text-xl font-medium">-$20</span>
                </div>
                <div className="flex flex-col items-end text-xs text-gray-400 gap-1">
                  <span>≈ ₦32,004 to</span>
                  <span>2271230000 - Zenith PLc</span>
                </div>
              </div>
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
      {showAddFunds && (
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
      {showBreakWallet && (
        <div
          className="absolute inset-0 bg-[#00000066] flex items-end justify-center z-50"
          onClick={() => setShowBreakWallet(false)}
        >
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <BreakWallet onClose={() => setShowBreakWallet(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default SavingsPage;
