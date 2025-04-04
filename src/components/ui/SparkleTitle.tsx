
"use client";
import React from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { SparklesText } from "@/components/ui/sparkles-text";

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
          <SparklesText 
            text="Your gateway to curated fashion brands"
            className="text-3xl md:text-4xl font-bold tracking-tight"
            colors={{ first: "#c0c0c0", second: "#333333" }}
            sparklesCount={15}
          />
        </motion.div>
        
        <div className="w-full h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent h-px w-1/4" />

          {/* Core sparkles component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#c0c0c0"
          />
        </div>
      </div>
    </div>
  );
}
