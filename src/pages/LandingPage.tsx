import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

// List of important images to preload
const imagesToPreload = [
  "/profile_pics/badson.us.jpg",
  "/profile_pics/brotherlylove.jpg",
  "/profile_pics/eraworldwideclub.jpg",
  "/profile_pics/outlw.usa.jpg",
  "/profile_pics/derschutze_clo.jpg",
  "/profile_pics/thegvgallery.jpg",
  "/profile_pics/haveyoudiedbefore.jpg",
  "/profile_pics/poolhousenewyork.jpg",
  "/profile_pics/nomaintenance.jpg",
  "/profile_pics/california.arts.jpg",
  "/profile_pics/drolandmiller.jpg",
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate("/how-it-works");
  };

  // Preload important images
  useEffect(() => {
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.loading = "eager";
      img.fetchPriority = "high";
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center justify-center w-full px-4">
        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-black text-center mb-12 tracking-tight leading-tight"
          style={{ fontFamily: "Arial Black, sans-serif" }}
        >
          <span className="block">WELCOME TO</span>
          <span>FASHION:WEEK</span>
        </h1>
        <Button
          onClick={handleBegin}
          className="text-base sm:text-lg md:text-xl px-8 sm:px-10 py-4 sm:py-6 h-auto bg-black text-white hover:bg-gray-800 rounded-none transition-all duration-300 font-bold"
        >
          BEGIN
        </Button>
      </div>
    </motion.div>
  );
};

export default LandingPage;
