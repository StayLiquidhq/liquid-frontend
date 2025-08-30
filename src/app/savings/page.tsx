"use client";
import Image from "next/image";

const SavingsPage = () => {
  return (
    <div className="bg-[#1A1A1A] min-h-screen flex flex-col items-center text-white pt-4">
      <header className="w-full max-w-sm mx-auto flex justify-between items-center self-stretch p-4 bg-[#1E1E1E] rounded-[30px]">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Liquid Logo" width={94} height={94} />
        </div>
        <div className="flex items-center gap-3 p-[6px] border border-[#585858] rounded-[18px]">
          <Image
            src="/frame.png"
            alt="User Profile"
            width={40}
            height={40}
            className="object-cover rounded-xl"
          />
        </div>
      </header>
      <main className="w-full max-w-sm mx-auto mt-4 flex flex-col items-center">
        <div className="relative w-full h-[172px] py-[30px] px-6 flex flex-col justify-between items-start bg-[#1E1E1E] rounded-[30px] overflow-hidden">
          <Image
            src="/white-3d-coin.svg"
            alt="3D Coin"
            width={210}
            height={210}
            className="absolute  -right-4 -top-8 opacity-3"
          />
          <div className="relative z-10 w-full flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Image src="/Lock.svg" alt="Lock Icon" width={18} height={18} />
              <span className="text-sm">Wallet 1</span>
            </div>
            <Image src="/Eye.svg" alt="Eye Icon" width={18} height={18} />
          </div>
          <div className="relative z-10">
            <h2 className="text-5xl font-medium">$3,000.00</h2>
          </div>
        </div>
        <div className="w-full flex items-start gap-3 self-stretch mt-4">
          <button className="flex-grow flex items-center justify-center gap-2 px-6 py-8 bg-[#1E1E1E] rounded-4xl text-white">
            <Image src="/in.svg" alt="Receive Icon" width={29} height={29} />
            <span className="text-lg">Receive</span>
          </button>
          <button className="flex-shrink-0 px-6 py-8  flex items-center justify-center bg-[#1E1E1E] rounded-4xl">
            <Image src="/setting.svg" alt="Settings Icon" width={27} height={27} />
          </button>
          <button className="flex-shrink-0 px-6 py-8  flex items-center justify-center bg-[#1E1E1E] rounded-4xl">
            <Image src="/Break.svg" alt="Break Icon" width={27} height={27} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SavingsPage;
