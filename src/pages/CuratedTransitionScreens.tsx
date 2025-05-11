import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const transitionTexts = [
  "adding your curated brands to your wishlist...",
  "welcome to the explore page ...",
];

const CuratedTransitionScreens = () => {
  const [screen, setScreen] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (screen === 0) {
      const timer = setTimeout(() => setScreen(1), 1500);
      return () => clearTimeout(timer);
    } else if (screen === 1) {
      const timer = setTimeout(() => navigate("/home"), 1500);
      return () => clearTimeout(timer);
    }
  }, [screen, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <AnimatePresence mode="wait">
        <motion.h1
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-black text-center"
        >
          {transitionTexts[screen]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default CuratedTransitionScreens;
