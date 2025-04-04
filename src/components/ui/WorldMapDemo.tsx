
"use client";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function WorldMapDemo() {
  return (
    <div className="py-10 w-full">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold mb-2">
          <Globe className="h-6 w-6" />
          <h2>Join 150,000 fashion enthusiasts worldwide</h2>
        </div>
      </div>
    </div>
  );
}
