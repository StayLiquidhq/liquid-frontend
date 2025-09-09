import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-[calc(100%-4rem)] mx-auto h-[500px] p-12 flex flex-col justify-center items-start text-left text-[#424242] squircle squircle-5xl squircle-smooth-xl squircle-[#1E1E1E] overflow-hidden">
      <Image
        src="/white-3d-coin.svg"
        alt="3D Coin"
        width={600}
        height={600}
        className="absolute -right-40 -top-10 opacity-10"
      />
      <div className="relative z-10">
        <h1 className="text-6xl font-medium leading-tight">
          Save money today <br /> and never run out <br /> of liquidity
        </h1>
        <p className="text-xl mt-4">Zero transaction fees + 2% APY</p>
      </div>
    </section>
  );
};

export default Hero;
