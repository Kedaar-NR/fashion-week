
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MarqueeCategoriesProps {
  onSelectCategory?: (category: string) => void;
  onSelectBrand?: (brand: string) => void;
  brands?: string[];
}

const MarqueeCategories = ({ onSelectCategory, onSelectBrand, brands = [] }: MarqueeCategoriesProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine if we're using the component for categories or brands
  const isBrandMarquee = brands.length > 0 && onSelectBrand;
  const items = isBrandMarquee ? brands : [
    "STREET", "AVANT-GARDE", "TECH", "VINTAGE", "MINIMAL", 
    "CLASSIC", "JAPANESE", "ARCHIVAL", "GOTHIC", "LUXURY"
  ];
  
  // For a smoother scrolling effect, we'll double the items
  const scrollItems = [...items, ...items];

  const handleClick = (item: string) => {
    if (isBrandMarquee && onSelectBrand) {
      onSelectBrand(item);
    } else if (onSelectCategory) {
      onSelectCategory(item);
    }
  };

  // Use Framer Motion for the marquee animation instead of DOM manipulation
  return (
    <div 
      className="w-full overflow-hidden mb-4 py-4 bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{
          x: isHovered ? 0 : "-50%"
        }}
        transition={{
          ease: "linear",
          duration: isHovered ? 0 : 20,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        {scrollItems.map((item, index) => (
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
      </motion.div>
    </div>
  );
};

export default MarqueeCategories;
