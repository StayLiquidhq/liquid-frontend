import Image from "next/image";
import { WalletNetwork } from "@/utils/wallet/address";

interface NetworkOption {
  id: WalletNetwork;
  label: string;
  logo: string;
}

const NETWORK_OPTIONS: NetworkOption[] = [
  { id: "solana", label: "Solana", logo: "/solana.png" },
  { id: "base", label: "Base", logo: "/base.jpeg" },
];

interface NetworkSelectorProps {
  value: WalletNetwork;
  onChange: (value: WalletNetwork) => void;
  disabled?: boolean;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm text-gray-400">Network</label>
      <div className="flex gap-2">
        {NETWORK_OPTIONS.map((network) => (
          <button
            key={network.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(network.id)}
            className={`flex flex-1 items-center justify-center gap-2 p-3 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] disabled:opacity-40 ${
              value === network.id ? "opacity-100" : "opacity-50"
            }`}
          >
            <Image
              src={network.logo}
              alt={`${network.label} logo`}
              width={22}
              height={22}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-medium">{network.label}</span>
          </button>
        ))}
      </div>
      {value === "base" && (
        <div className="w-full flex items-center gap-2 p-3 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
          <Image src="/Info.svg" alt="Info" width={24} height={24} />
          <span className="text-sm text-gray-400">
            A small gas fee of about $2 in ETH is required in your wallet for
            all Base transactions.
          </span>
        </div>
      )}
      {value === "solana" && (
        <div className="w-full flex items-center gap-2 p-3 squircle squircle-[18px] squircle-smooth-xl squircle-[#252525]">
          <Image src="/Info.svg" alt="Info" width={24} height={24} />
          <span className="text-sm text-gray-400">
            A small gas fee (~0.005 - 0.01 SOL) is required in your wallet for
            all Solana transactions and payouts.
          </span>
        </div>
      )}
    </div>
  );
};

export default NetworkSelector;
