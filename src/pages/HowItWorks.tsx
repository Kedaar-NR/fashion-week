import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-full bg-white flex items-center justify-center"
      style={{ fontFamily: "Kanit, sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-center px-4"
      >
        <div className="w-full max-w-4xl flex flex-col items-center justify-center">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 sm:mb-12 tracking-tight text-center">
            HOW IT WORKS:
          </h1>

          <div className="space-y-6 sm:space-y-8 w-full max-w-3xl mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  step
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400">
                  1
                </span>
              </div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                : take your style quiz
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  step
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400">
                  2
                </span>
              </div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                : get matched with brands
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  step
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-400">
                  3
                </span>
              </div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                : explore brands in the gallery
              </span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/quiz")}
            className="text-xl sm:text-2xl py-4 sm:py-6 px-8 sm:px-12 bg-black text-white hover:bg-gray-800 font-bold tracking-wide"
          >
            continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
