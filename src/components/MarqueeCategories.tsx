
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  
  useEffect(() => {
    setDuplicatedCategories([...categories, ...categories]);
  }, []);

  const handleCategoryClick = (category: string) => {
    const newActive = activeCategory === category ? null : category;
    setActiveCategory(newActive);
    onSelectCategory(newActive || "");
  };
  
  const getCategoryColorClass = (category: string) => {
    const colorMap: Record<string, string> = {
      "STREET": "bg-red-500 text-white hover:bg-red-600",
      "PUNK/GOTH/GRUNGE": "bg-purple-500 text-white hover:bg-purple-600",
      "ESSENTIALS": "bg-blue-500 text-white hover:bg-blue-600",
      "LUXURY/VINTAGE": "bg-amber-400 text-black hover:bg-amber-500",
      "MINIMALISTIC": "bg-gray-500 text-white hover:bg-gray-600",
      "CRAZY EXPERIMENTAL": "bg-pink-500 text-white hover:bg-pink-600",
      "Y2K": "bg-violet-400 text-white hover:bg-violet-500",
      "JEWELERY": "bg-emerald-500 text-white hover:bg-emerald-600",
      "TECHWEAR": "bg-cyan-500 text-white hover:bg-cyan-600"
    };
    
    return colorMap[category] || "bg-gray-500 text-white hover:bg-gray-600";
  };
  
  return (
    <div className="w-full overflow-hidden py-2 bg-gradient-to-r from-gray-50 to-white rounded-xl my-2">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity,
          duration: 20,
          ease: "linear"
        }}
      >
        {duplicatedCategories.map((category, idx) => (
          <button
            key={`${category}-${idx}`}
            className={`px-4 py-2 mx-2 whitespace-nowrap rounded-full transition-all text-sm font-medium ${
              activeCategory === category 
                ? "bg-black text-white scale-105" 
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
