import Image from "next/image";

interface BreakWalletProps {
  onClose: () => void;
}

const BreakWallet: React.FC<BreakWalletProps> = ({ onClose }) => {
  const handleBreak = () => {
    console.log("Breaking wallet...");
  };

  return (
    <div className="flex w-[380px] p-6 flex-col items-center gap-4 squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <div className="flex flex-col items-center gap-2">
        <Image src="/Info.svg" alt="Warning Icon" width={48} height={48} />
        <h2 className="text-2xl font-medium">Break Savings</h2>
        <p className="text-center text-gray-400">
          You will be charged 5% for breaking your savings. Are you sure you
          want to continue?
        </p>
      </div>
      <div className="w-full flex gap-4">
        <button
          onClick={handleBreak}
          className="w-full p-4 font-medium squircle squircle-[18px] squircle-smooth-xl squircle-[#FB4E5A] text-[#1A1A1A]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BreakWallet;
