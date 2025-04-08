
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Updated categories based on the provided image
const categories = [
  "STREET",
  "PUNK/GOTH/GRUNGE",
  "ESSENTIALS",
  "LUXURY/VINTAGE",
  "MINIMALISTIC",
  "CRAZY EXPERIMENTAL",
  "Y2K",
  "JEWELERY",
  "TECHWEAR"
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
  
  // Define color classes for each category based on the image
  const getCategoryColorClass = (category: string) => {
    const colorMap: Record<string, string> = {
      "STREET": "bg-red-700 text-white",
      "PUNK/GOTH/GRUNGE": "bg-purple-800 text-white",
      "ESSENTIALS": "bg-blue-700 text-white",
      "LUXURY/VINTAGE": "bg-yellow-200 text-black",
      "MINIMALISTIC": "bg-gray-500 text-white",
      "CRAZY EXPERIMENTAL": "bg-yellow-300 text-black",
      "Y2K": "bg-pink-200 text-black",
      "JEWELERY": "bg-gray-700 text-white",
      "TECHWEAR": "bg-green-700 text-white"
    };
    
    return colorMap[category] || "bg-gray-100 text-gray-700";
  };
  
  return (
    <div className="w-full overflow-hidden py-2 bg-gradient-to-r from-gray-50 to-white rounded-xl my-2">
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
            className={`px-3 py-1.5 mx-1 whitespace-nowrap rounded-full transition-colors text-xs font-medium ${
              activeCategory === category 
                ? "bg-black text-white" 
                : getCategoryColorClass(category)
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
