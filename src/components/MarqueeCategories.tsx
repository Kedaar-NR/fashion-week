
import { motion } from 'framer-motion';
import { brands } from '@/data/brands';

interface MarqueeCategoriesProps {
  onSelectCategory: (brandName: string) => void;
}

const MarqueeCategories = ({ onSelectCategory }: MarqueeCategoriesProps) => {
  const brandNames = brands.map(brand => brand.name.replace('@', ''));
  const duplicatedBrands = [...brandNames, ...brandNames, ...brandNames]; // Triple the array for smoother infinite scroll

  return (
    <div className="w-full overflow-hidden bg-black text-white py-4">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ 
          x: [0, -50 * brandNames.length], 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {duplicatedBrands.map((brand, idx) => (
          <button
            key={`${brand}-${idx}`}
            onClick={() => onSelectCategory(brand)}
            className="mx-8 px-4 py-1 text-lg font-bold uppercase bg-transparent border border-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            {brand}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeCategories;
