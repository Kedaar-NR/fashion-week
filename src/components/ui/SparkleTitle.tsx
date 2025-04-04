
"use client";
import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";

export function SparkleTitle() {
  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="w-full relative">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center relative z-20"
        >
          <TextShimmerWave
            as="h1"
            className="text-5xl font-extrabold tracking-tighter md:text-6xl
                     [--base-color:#E05780] [--base-gradient-color:#FFD700]"
            duration={2}
            spread={1.2}
            zDistance={20}
          >
            FASHION:WEEK
          </TextShimmerWave>
        </motion.div>
        
        <div className="w-full h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent h-px w-1/4" />

          {/* Core sparkles component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <p className="text-gray-600 mt-2 text-center">Your gateway to curated fashion brands.</p>
      </div>
    </div>
  );
}
