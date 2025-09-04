import Image from "next/image";
import { QRCodeCanvas as QRCode } from "qrcode.react";
import { useState } from "react";
import CopyIcon from "./CopyIcon";

interface ReceiveCryptoProps {
  onClose: () => void;
  wallet: any;
}

const ReceiveCrypto: React.FC<ReceiveCryptoProps> = ({ onClose, wallet }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const shortenAddress = (address: string) => {
    if (!address) return "";
    return `${address.substring(0, 10)}.......${address.substring(
      address.length - 9
    )}`;
  };

  return (
    <div className="flex w-[380px] p-6 flex-col items-center gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-medium">Solana Wallet Address</h2>
      </div>

      <div className="w-full flex items-center justify-between p-3 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
        <span className="text-lg font-mono">
          {shortenAddress(wallet.address)}
        </span>
        <button onClick={handleCopy}>
          <CopyIcon color={isCopied ? "#22C55E" : "#6C6C6C"} />
        </button>
      </div>

      <div className="w-full p-4 squircle squircle-[18px] squircle-smooth-xl squircle-[#FFFFFF]">
        <QRCode
          value={wallet.address}
          size={300}
          imageSettings={{
            src: "/logo-short.svg",
            x: undefined,
            y: undefined,
            height: 88,
            width: 88,
            excavate: true,
          }}
          className="w-full h-auto "
        />
      </div>

      <div className="w-full flex items-center gap-2 p-3 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
        <Image src="/Info.svg" alt="Info" width={24} height={24} />
        <span className="text-sm text-gray-400">
          Only Send USDC on the Solana Chain
        </span>
      </div>
    </div>
  );
};

export default ReceiveCrypto;
