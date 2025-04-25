
import { motion } from 'framer-motion';
import { brands } from '@/data/brands';

const MarqueeSlider = () => {
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
          <span
            key={`${brand}-${idx}`}
            className="mx-8 text-lg font-bold uppercase"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeSlider;
