
"use client"

import { Globe } from "@/components/ui/globe";
import { GradientText } from "@/components/ui/gradient-text";

export function GlobeDemo() {
  return (
    <div className="py-6 w-full relative">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold mb-2">
          <h2>
            Join <GradientText>150,000</GradientText> fashion enthusiasts worldwide
          </h2>
        </div>
      </div>
      
      <div className="relative h-[300px] md:h-[500px]">
        <Globe className="top-0" />
      </div>
      
      <div className="h-20"></div> {/* Extra space below the globe */}
    </div>
  );
}
