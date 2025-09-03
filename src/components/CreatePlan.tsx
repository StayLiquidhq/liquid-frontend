import Image from "next/image";
import { useState } from "react";
import SetPayout from "./SetPayout";
import SetTarget from "./SetTarget";

const CreatePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState<
    "locked" | "flexible" | "target" | null
  >(null);

  if (selectedPlan === "locked" || selectedPlan === "flexible") {
    return (
      <SetPayout planType={selectedPlan} onClose={() => setSelectedPlan(null)} />
    );
  }

  if (selectedPlan === "target") {
    return <SetTarget onClose={() => setSelectedPlan(null)} />;
  }

  return (
    <div className="flex w-[380px] p-6 flex-col items-start gap-[18px] squircle squircle-[36px] squircle-smooth-xl squircle-[#1A1A1A] text-white">
      <h2 className="text-2xl font-medium">Create a vault</h2>

      <div
        onClick={() => setSelectedPlan("locked")}
        className="flex p-3 items-start gap-[10px] self-stretch squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] cursor-pointer"
      >
        <div className="flex p-2 justify-center items-center squircle squircle-[6px] squircle-smooth-xl squircle-[#08F]">
          <Image
            src="/white-lock.svg"
            alt="Locked Vault"
            width={72}
            height={72}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Locked Vault</h3>
          <p className="text-sm text-gray-400">
            Deposit, set how much you want to receive, when and where. You can't
            break this vault or your rules, can only change the payout wallet or
            account,{" "}
            <a href="#" className="text-blue-400">
              learn more
            </a>
          </p>
        </div>
      </div>

      <div
        onClick={() => setSelectedPlan("flexible")}
        className="flex p-3 items-start gap-[10px] self-stretch squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] cursor-pointer"
      >
        <div className="flex p-2 justify-center items-center squircle squircle-[6px] squircle-smooth-xl squircle-[#22C55E]">
          <Image src="/Open.svg" alt="Flexible Vault" width={72} height={72} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Flexible Vault</h3>
          <p className="text-sm text-gray-400">
            Deposit, set amount you want to receive, when and where. You can
            change payout wallet or account and break this vault with a 10% break
            fee,{" "}
            <a href="#" className="text-blue-400">
              learn more
            </a>
          </p>
        </div>
      </div>

      <div
        onClick={() => setSelectedPlan("target")}
        className="flex p-3 items-start gap-[10px] self-stretch squircle squircle-[18px] squircle-smooth-xl squircle-[#252525] cursor-pointer"
      >
        <div className="flex p-2 justify-center items-center squircle squircle-[6px] squircle-smooth-xl squircle-[#FF692C]">
          <Image src="/target.svg" alt="Piggy Vest" width={72} height={72} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Piggy Vest</h3>
          <p className="text-sm text-gray-400">
            Set target amount and payout account or wallet, auto-paid when
            target reached you can break with a 10% break fee,{" "}
            <a href="#" className="text-blue-400">
              learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePlan;
