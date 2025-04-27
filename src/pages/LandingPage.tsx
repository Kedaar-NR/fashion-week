import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

// List of important images to preload
const imagesToPreload = [
  "/lovable-uploads/2826c26c-5666-46ec-8872-60b6f526e6a5.png",
  "/lovable-uploads/c5e45c20-edf8-4052-9d18-b4293316d77f.png",
  "/lovable-uploads/963420ec-8c53-43e3-91b3-b507a7d64bad.png",
  "/lovable-uploads/cc94c43a-db79-4499-9294-05627894354a.png",
  "/lovable-uploads/200a1dfb-d9d8-49d2-8b01-89160bde0f75.png",
  "/lovable-uploads/dfcb5746-f522-48dd-b19d-d5be29f59c01.png",
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBegin = () => {
    navigate("/home");
  };

  // Preload important images
  useEffect(() => {
    // Preload quiz images for faster loading later
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
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
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-black text-center mb-12 tracking-tight leading-tight">
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
