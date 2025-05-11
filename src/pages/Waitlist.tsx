import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import AnimatedText from "@/components/AnimatedText";
import WaitlistCounter from "@/components/WaitlistCounter";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Waitlist = () => {
  const firstLine = "Dress better than";
  const spelloutDelay = firstLine.length * 0.12 + 0.04;
  const [showSecond, setShowSecond] = useState(false);
  const [showTallyModal, setShowTallyModal] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowSecond(false);
    const timer = setTimeout(
      () => setShowSecond(true),
      spelloutDelay * 1000 + 125
    );
    return () => clearTimeout(timer);
  }, []);

  // Show sign-in popup every 5 seconds if not signed in
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setShowSignInPopup(true);
      const interval = setInterval(() => {
        setShowSignInPopup(true);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 ml-48">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center flex flex-col justify-between min-h-[70vh]">
            <div className="mt-4">
              <AnimatedText
                text={firstLine}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black"
              />
              {showSecond && (
                <AnimatedText
                  text="everyone."
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-red-600"
                />
              )}
              {/* iPad right under heading */}
              <div className="mt-4 flex items-center justify-center">
                {" "}
                {/* Minimal space below heading */}
                <ContainerScroll titleComponent={null}>
                  <div
                    className="relative w-[90vw] max-w-3xl aspect-[4/3] bg-white rounded-[32px] shadow-2xl border-8 border-black mx-auto flex items-center justify-center p-6"
                    style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)" }}
                  >
                    <img
                      src="/collage-sample.png"
                      alt="Collage grid"
                      className="w-full h-full object-contain"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                </ContainerScroll>
              </div>
              {/* Counter and Join Waitlist Button just below iPad */}
              <div className="flex flex-col items-center space-y-2 mt-4 mb-2">
                {" "}
                {/* Minimal space below iPad */}
                <div className="text-2xl font-bold">
                  join <WaitlistCounter /> others on the waitlist
                </div>
                <button
                  onClick={() => setShowTallyModal(true)}
                  className="bg-black text-white text-lg md:text-xl font-black px-8 py-4 rounded-2xl shadow-lg hover:bg-gray-800 transition-all duration-200 mt-2"
                  style={{ fontFamily: "Arial Black, sans-serif" }}
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
        {showTallyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-2xl w-full relative flex flex-col items-center">
              <button
                onClick={() => setShowTallyModal(false)}
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-black font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <iframe
                src="https://tally.so/r/walQGB"
                title="Join Waitlist Form"
                className="w-full h-[70vh] rounded-xl border-none"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        {/* Sign In Popup */}
        <AnimatePresence>
          {showSignInPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSignInPopup(false)}
              />
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
              >
                <h2 className="text-2xl font-bold text-center mb-6">
                  Sign in to see more
                </h2>
                <Button
                  onClick={() => {
                    setShowSignInPopup(false);
                    navigate("/signin");
                  }}
                  className="w-full bg-black hover:bg-gray-800 text-white text-xl py-6 rounded-xl shadow-xl transform transition-all duration-200 hover:scale-105"
                >
                  Sign In
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Waitlist;
