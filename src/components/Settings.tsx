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

      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex justify-between items-center p-4 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
          <span className="text-lg">Support</span>
        </div>
        <div className="w-full flex justify-between items-center p-4 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
          <span className="text-lg">Terms & Conditions</span>
        </div>
        <div className="w-full flex justify-between items-center p-4 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
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
