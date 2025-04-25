import { motion } from "framer-motion";
import { useState } from "react";

interface TagSelectorProps {
  onSelectBrand: (brandName: string) => void;
}

const TagSelector = ({ onSelectBrand }: TagSelectorProps) => {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  const selectedBrands = [
    "badson.us",
    "brotherlylove",
    "eraworldwideclub",
    "outlw.usa",
    "derschutze_clo",
    "thegvgallery",
    "haveyoudiedbefore",
    "poolhousenewyork",
    "nomaintenance",
    "california.arts",
    "drolandmiller",
  ];

  const handleBrandClick = (brand: string) => {
    const newBrand = activeBrand === brand ? null : brand;
    setActiveBrand(newBrand);
    onSelectBrand(brand);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mx-auto">
        {selectedBrands.map((brand) => (
          <button
            key={brand}
            onClick={() => handleBrandClick(brand)}
            className={`px-4 py-1.5 text-sm whitespace-nowrap rounded-full border transition-colors ${
              activeBrand === brand
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
