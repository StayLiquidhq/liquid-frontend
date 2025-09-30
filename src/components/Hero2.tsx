import { useState } from "react";
import { motion } from "framer-motion";

const Hero2 = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="w-[calc(100%-1.5rem)] md:w-[calc(100%-4rem)] mx-auto md:h-[500px] flex justify-center items-center py-4 md:py-0"
    >
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-8 w-full">
        {/* Left text block */}
        <div className="squircle squircle-7xl squircle-smooth-xl squircle-[#1E1E1E] w-full md:w-[900px] h-auto md:h-[400px] flex flex-col justify-center p-8 md:p-12 text-[#424242]">
          <p className="text-2xl md:text-4xl mb-4 md:mb-4">
            Winning big often comes once in a while but expenses sits daily,
            tackling that is a big flex
          </p>
          <p className="text-lg md:text-3xl text-[#424242]">
            We preserve your wins to last longer and help you hit those big
            target savings that matters.
          </p>
        </div>

        {/* Right side: thumbnail */}
        <div className="relative w-full md:w-[700px] h-[220px] md:h-[400px] rounded-[2rem] overflow-hidden bg-black">
          {playVideo ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/NypekMdk32c?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img
                src="https://img.youtube.com/vi/NypekMdk32c/maxresdefault.jpg"
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setPlayVideo(true)}
                  className="bg-white bg-opacity-80 rounded-full w-20 h-20 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <svg
                    className="w-10 h-10 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default Hero2;
