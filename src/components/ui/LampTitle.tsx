
"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

export function LampTitle() {
  return (
    <LampContainer className="px-4 py-8">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-300 py-4 bg-clip-text text-center text-5xl font-extrabold tracking-tighter text-transparent md:text-6xl animate-pulse"
      >
        FASHION:WEEK
      </motion.h1>
      <p className="text-gray-600 mt-2">Your gateway to curated fashion brands.</p>
    </LampContainer>
  );
}
