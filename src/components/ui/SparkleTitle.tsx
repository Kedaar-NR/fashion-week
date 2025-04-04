
"use client";
import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";

export function SparkleTitle() {
  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="w-full relative">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center text-5xl font-extrabold tracking-tighter md:text-6xl bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent relative z-20"
        >
          FASHION:WEEK
        </motion.h1>
        
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
