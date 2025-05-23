import React, { useState } from "react";
import { motion } from "framer-motion";
import WaitlistButton from "@/components/WaitlistButton";
import AnimatedText from "@/components/AnimatedText";
import WaitlistCounter from "@/components/WaitlistCounter";
import { ContainerScroll } from "@/components/ui/ContainerScroll";
// If you have Header and Footer components, import them:
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

const Waitlist = () => {
  const firstLine = "Dress better than";
  const spelloutDelay = firstLine.length * 0.12 + 0.04;
  const [showSecond, setShowSecond] = useState(false);
  React.useEffect(() => {
    setShowSecond(false);
    const timer = setTimeout(
      () => setShowSecond(true),
      spelloutDelay * 1000 + 125
    );
    return () => clearTimeout(timer);
  }, [spelloutDelay]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Uncomment if you have a Header component */}
      {/* <Header /> */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8 mt-8">
            <h1
              className="text-4xl sm:text-5xl font-black text-black"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              FASHION:WEEK
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center flex flex-col justify-between min-h-[70vh]"
          >
            <div className="mt-8">
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
              <div className="mt-4">
                <ContainerScroll>
                  <div className="flex items-center justify-center h-full">
                    <img
                      src="/collage-sample.png"
                      alt="collage"
                      className="rounded-xl shadow-lg"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                </ContainerScroll>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-1 mt-4 mb-6">
              <div className="text-xl mt-0">
                join <WaitlistCounter /> others on the waitlist
              </div>
              <WaitlistButton />
              {/* Optionally, add a callout or info below the button */}
              <div className="mt-8 text-lg text-muted-foreground">
                Be the first to know when we launch. Join our exclusive waitlist
                today.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Uncomment if you have a Footer component */}
      {/* <Footer /> */}
    </div>
  );
};

export default Waitlist;
