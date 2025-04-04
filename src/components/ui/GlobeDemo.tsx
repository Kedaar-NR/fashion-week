
"use client"

import { Globe } from "@/components/ui/globe";

export function GlobeDemo() {
  return (
    <div className="py-10 w-full relative">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold mb-2">
          <h2>Join 150,000 fashion enthusiasts worldwide</h2>
        </div>
      </div>
      
      <div className="relative h-[300px] md:h-[400px]">
        <Globe className="top-0" />
      </div>
      
      <div className="h-10"></div> {/* Extra space below the globe */}
    </div>
  );
}
