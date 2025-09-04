import Image from "next/image";
import { useState } from "react";
import ReceiveCrypto from "./ReceiveCrypto";

interface AddFundsProps {
  onClose: () => void;
  wallet: any;
}

const AddFunds: React.FC<AddFundsProps> = ({ onClose, wallet }) => {
  const [showReceiveCrypto, setShowReceiveCrypto] = useState(false);

  if (showReceiveCrypto) {
    return (
      <ReceiveCrypto
        onClose={() => setShowReceiveCrypto(false)}
        wallet={wallet}
      />
    );
  }

  return (
    <div className="flex w-[380px] p-6 flex-col items-start gap-[18px] squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-medium">Add Funds</h2>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => setShowReceiveCrypto(true)}
          className="flex p-3 items-center gap-3 self-stretch squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]"
        >
          <div className="flex p-2 justify-center items-center squircle squircle-[6px] squircle-smooth-xl squircle-[#08F]">
            <Image
              src="/non-commercial-dollars.svg"
              alt="Stable Coin"
              width={24}
              height={24}
            />
          </div>
          <h3 className="text-lg font-medium">Stable Coin</h3>
        </button>
        <div className="flex p-3 items-center opacity-70 gap-3 self-stretch squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
          <div className="flex p-2 justify-center items-center squircle squircle-[6px] squircle-smooth-xl squircle-[#22C55E]">
            <Image src="/money.svg" alt="Fiat" width={24} height={24} />
          </div>
          <h3 className="text-lg font-medium">Fiat</h3>
          <span className="text-sm text-gray-400">- Coming This November</span>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
