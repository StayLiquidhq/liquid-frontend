import Image from "next/image";

interface ReceiveCryptoProps {
  onClose: () => void;
}

const ReceiveCrypto: React.FC<ReceiveCryptoProps> = ({ onClose }) => {
  const walletAddress = "hsGj67b9u4......h76geJ";

  return (
    <div className="flex w-[380px] p-6 flex-col items-center gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-medium">Solana Wallet Address</h2>
      </div>

      <div className="w-full flex items-center justify-between p-3 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
        <span className="text-lg font-mono">{walletAddress}</span>
        <button>
          <Image src="/Copy.svg" alt="Copy Address" width={24} height={24} />
        </button>
      </div>

      <div className="w-full p-4">
        <Image
          src="/qr-icon.png"
          alt="QR Code"
          width={300}
          height={300}
          className="w-full h-auto squircle squircle-mask squircle-4xl squircle-smooth-xl"
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
