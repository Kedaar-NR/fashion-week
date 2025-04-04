
import { useState } from "react";

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

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };
  
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-4">
      <div className="flex min-w-max px-8 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 whitespace-nowrap rounded-full transition-colors text-sm font-medium ${
              activeCategory === category 
                ? "bg-black text-white" 
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
