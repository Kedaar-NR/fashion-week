
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface MarqueeCategoriesProps {
  onSelectCategory?: (category: string) => void;
  onSelectBrand?: (brand: string) => void;
  brands?: string[];
}

const MarqueeCategories = ({ onSelectCategory, onSelectBrand, brands = [] }: MarqueeCategoriesProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Determine if we're using the component for categories or brands
  const isBrandMarquee = brands.length > 0 && onSelectBrand;
  const items = isBrandMarquee ? brands : [
    "STREET", "AVANT-GARDE", "TECH", "VINTAGE", "MINIMAL", 
    "CLASSIC", "JAPANESE", "ARCHIVAL", "GOTHIC", "LUXURY"
  ];
  
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // Clone the items to create a seamless loop
    const marqueeContainer = marqueeRef.current;
    const originalContent = marqueeContainer.innerHTML;
    marqueeContainer.innerHTML = originalContent + originalContent;
    
    // Start the animation
    const animation = marqueeContainer.animate(
      [
        { transform: "translateX(0)" },
        { transform: `translateX(-${originalContent.length * 0.5}px)` }
      ],
      {
        duration: 30000,
        iterations: Infinity
      }
    );
    
    return () => {
      if (animation) animation.cancel();
    };
  }, [items]);

  const handleClick = (item: string) => {
    if (isBrandMarquee && onSelectBrand) {
      onSelectBrand(item);
    } else if (onSelectCategory) {
      onSelectCategory(item);
    }
  };

  return (
    <div className="w-full overflow-hidden mb-4 py-4 bg-black">
      <div ref={marqueeRef} className="whitespace-nowrap inline-block">
        {items.map((item, index) => (
          <motion.button
            key={`${item}-${index}`}
            onClick={() => handleClick(item)}
            className="mx-4 px-4 py-1 rounded-full text-white font-medium hover:bg-white hover:text-black transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isBrandMarquee ? `@${item}` : item}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MarqueeCategories;
