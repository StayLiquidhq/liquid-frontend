import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/utils/hooks/useAuth";

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    onClose();
  };
  const handleInvite = () => {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://savewithliquid.xyz";
    const referral = user?.id ? `/?ref=${encodeURIComponent(user.id)}` : "";
    const appUrl = `${baseUrl}${referral}`;
    const tweet = `Liquid on Solana: fast, safe, tamper-proof liquidity. No security worries.\n\nVaults: control when/how you spend.\nPiggy Bank: save by target amount or date.\n\nJoin me on Liquid ${appUrl} \n#Solana #DeFi #Savings #Liquidity`;
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweet
    )}`;
    window.open(intent, "_blank");
  };
  return (
    <div className="flex w-[380px] p-6 flex-col items-start gap-6 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <div className="w-full flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 p-[6px] squircle-border-1 squircle-border-[#585858] squircle squircle-7xl squircle-smooth-xl">
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
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">
              {user?.user_metadata?.full_name || "User"}
            </h3>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleInvite}
        className="w-full p-4 text-white font-medium squircle squircle-[18px] squircle-[#1DA1F2] squircle-smooth-xl hover:opacity-90 flex items-center justify-center gap-2"
      >
        <Image src="/twitter.svg" alt="Twitter" width={18} height={18} />
        Invite a Friend
      </button>

      <div className="w-full flex flex-col gap-3">
        <div
          onClick={() =>
            window.open("https://t.me/+Zid-tDFC5hE4MzA0", "_blank")
          }
          className="w-full flex justify-between items-center p-4 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] cursor-pointer hover:opacity-80"
        >
          <span className="text-lg">Support</span>
        </div>
        <div className="w-full flex justify-between items-center p-4 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
          <span className="text-lg">Terms & Conditions</span>
        </div>
        <div
          onClick={() => window.open("https://x.com/savewithliquid", "_blank")}
          className="w-full flex justify-between items-center p-4 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] cursor-pointer hover:opacity-80"
        >
          <span className="text-lg">Twitter</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full p-4 text-white font-medium squircle squircle-[18px] squircle-[#FF4D4D]  squircle-smooth-xl"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
