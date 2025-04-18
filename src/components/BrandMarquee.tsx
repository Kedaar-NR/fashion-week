
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BrandMarqueeProps {
  onSelectBrand: (brand: string) => void;
}

const BrandMarquee = ({ onSelectBrand }: BrandMarqueeProps) => {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  
  const brands = [
    'BADSON',
    'BROTHERLY LOVE',
    'DERSCHUTZE CLO',
    'DROLAND MILLER',
    'HAVEYOUDIEDBEFORE',
    'CALIFORNIA ARTS',
    'ERA WORLDWIDE CLUB',
    'NOMAINTENANCE',
    'OUTLAW XYZ',
    'POOLHOUSE NY',
    'THE GV GALLERY'
  ];

  const handleBrandClick = (brand: string) => {
    const newActive = activeBrand === brand ? null : brand;
    setActiveBrand(newActive);
    onSelectBrand(newActive || '');
  };

  return (
    <div className="w-full overflow-hidden py-4 bg-black">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }}
      >
        {[...brands, ...brands].map((brand, idx) => (
          <button
            key={`${brand}-${idx}`}
            onClick={() => handleBrandClick(brand)}
            className={`px-4 py-2 mx-2 rounded-full transition-all ${
              activeBrand === brand 
                ? 'bg-white text-black'
                : 'bg-black text-white border border-white/20'
            } hover:bg-white hover:text-black text-sm font-medium`}
          >
            @{brand.toLowerCase().replace(/\s+/g, '.')}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default BrandMarquee;
