
import { motion } from 'framer-motion';
import { brands } from '@/data/brands';

interface MarqueeSliderProps {
  onSelectBrand: (brandName: string) => void;
}

const MarqueeSlider = ({ onSelectBrand }: MarqueeSliderProps) => {
  const brandNames = brands.map(brand => brand.name.replace('@', ''));
  const duplicatedBrands = [...brandNames, ...brandNames];

  return (
    <div className="w-full overflow-hidden bg-black text-white py-4 my-4">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }}
      >
        {duplicatedBrands.map((brand, idx) => (
          <button
            key={`${brand}-${idx}`}
            onClick={() => onSelectBrand(brand)}
            className="mx-8 px-4 py-1 text-lg font-bold uppercase bg-transparent border border-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            {brand}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeSlider;
