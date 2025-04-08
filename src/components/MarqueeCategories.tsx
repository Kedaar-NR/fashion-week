
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const categories = [
  "STREETWEAR",
  "PUNK",
  "ESSENTIALS",
  "LUXURY",
  "MINIMALIST",
  "GORPCORE", 
  "Y2K",
  "VINTAGE",
  "BASIC",
  "GRUNGE",
  "COWBOY",
  "SELECTION BASED"
];

interface MarqueeCategoriesProps {
  onSelectCategory: (category: string) => void;
}

const MarqueeCategories = ({ onSelectCategory }: MarqueeCategoriesProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [duplicatedCategories, setDuplicatedCategories] = useState<string[]>([]);
  
  // Duplicate categories to create infinite scroll effect
  useEffect(() => {
    setDuplicatedCategories([...categories, ...categories]);
  }, []);

  const handleCategoryClick = (category: string) => {
    const newActive = activeCategory === category ? null : category;
    setActiveCategory(newActive);
    onSelectCategory(newActive || "");
  };
  
  return (
    <div className="w-full overflow-hidden py-4 bg-gradient-to-r from-gray-50 to-white rounded-xl my-4">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 30, 
          ease: "linear" 
        }}
      >
        {duplicatedCategories.map((category, idx) => (
          <button
            key={`${category}-${idx}`}
            className={`px-6 py-3 mx-2 whitespace-nowrap rounded-full transition-colors text-sm font-medium ${
              activeCategory === category 
                ? "bg-black text-white" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeCategories;
