import Image from "next/image";
import { motion } from "framer-motion";
import { itemVariants } from "@/app/savings/animation";
import { useState } from "react";

interface WalletCardProps {
  name: string;
  balance: string;
  icon: string;
  coinImage: string;
  isLast?: boolean;
}

const WalletCard: React.FC<WalletCardProps> = ({
  name,
  balance,
  icon,
  coinImage,
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <motion.div
      className="relative w-full h-[172px] py-[30px] px-6 flex flex-col justify-between items-start squircle squircle-4xl squircle-smooth-xl squircle-[#1E1E1E] overflow-hidden flex-shrink-0 snap-center"
      variants={itemVariants}
      style={{ width: "100%" }}
    >
      <Image
        src={coinImage}
        alt="3D Coin"
        width={210}
        height={210}
        className="absolute -right-4 -top-8 opacity-3"
      />
      <div className="relative z-10 w-full flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Image src={icon} alt="Wallet Icon" width={18} height={18} />
          <span className="text-sm">{name}</span>
        </div>
        <Image
          src={
            isBalanceVisible
              ? "/custom-eye-open.svg"
              : "/custom-eye-closed.svg"
          }
          alt="Eye Icon"
          width={22}
          height={22}
          onClick={toggleBalanceVisibility}
          className="cursor-pointer"
        />
      </div>
      <div className="relative z-10">
        <h2 className="text-5xl font-medium">
          {isBalanceVisible ? `$${balance}` : "******"}
        </h2>
      </div>
    </motion.div>
  );
};

export default WalletCard;
