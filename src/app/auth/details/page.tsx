"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./animation";
import CreatePlan from "@/components/CreatePlan";
import { useAuth } from "@/utils/hooks/useAuth";

const AuthDetailsPage = () => {
  const { loading } = useAuth();
  const [showCreatePlan] = useState(true);

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
        className="bg-[#1A1A1A] min-h-screen flex flex-col items-center text-white md:hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className=" w-full max-w-sm mx-auto flex flex-col items-center gap-2 p-2 pt-8">
          <motion.div variants={itemVariants}>
            <Image
              src="/auth-hero.svg"
              alt="Auth Hero"
              width={400}
              height={400}
              className="select-none pointer-events-none smooth-corners-md rounded-4xl"
            />
          </motion.div>
          <div className="flex flex-col items-center gap-8 self-stretch px-1 py-6">
            <motion.div
              className="flex flex-col items-start gap-6"
              variants={itemVariants}
            >
              <Image
                src="/logo.svg"
                alt="Liquid Logo"
                width={80}
                height={80}
              />
              <h1
                className="text-4xl font-medium leading-tight"
                style={{ fontFamily: "'Funnel Display', sans-serif" }}
              >
                Start saving today and <br /> never run out of liquidity.
              </h1>
            </motion.div>

            <motion.button
              className="smooth-corners-md flex w-full justify-center items-center gap-4 px-6 py-6 bg-[#222222] rounded-3xl"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/google-auth-colour.svg"
                alt="Google Icon"
                width={24}
                height={24}
              />
              <span className="text-2xl font-medium">Continue</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      <div className="hidden md:flex bg-[#1A1A1A] min-h-screen flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-medium">
          Desktop mode is not available for this application
        </h1>
      </div>
      {showCreatePlan && (
        <div className="absolute inset-0 bg-[#00000066]  flex items-end justify-center z-50">
          <div className="mb-4" onClick={(e) => e.stopPropagation()}>
            <CreatePlan />
          </div>
        </div>
      )}
    </>
  );
};

export default AuthDetailsPage;
