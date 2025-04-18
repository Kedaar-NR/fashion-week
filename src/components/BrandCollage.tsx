
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandCollageProps {
  brand: string | null;
}

const BrandCollage = ({ brand }: BrandCollageProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const images = [
    '/lovable-uploads/adb95711-d50c-4ea8-8cd1-1e852fa80b3f.png',
    '/lovable-uploads/f4c307f6-be93-47e4-824e-99af801d652c.png',
    '/lovable-uploads/0bec8c21-092d-4f85-b32a-0a3c7b0336d0.png',
    '/lovable-uploads/35021435-f799-4f28-ae07-fc3f8c3a2192.png',
    '/lovable-uploads/c145dd9e-79bf-4574-a81c-aaf685ca38f2.png',
    '/lovable-uploads/6e8fa05c-7020-4824-a736-4a787b45d9ca.png'
  ];

  if (!brand) return null;

  return (
    <div className="w-full px-4 py-6">
      <AnimatePresence mode="wait">
        {!showDetails ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-[400px] w-full cursor-pointer rounded-xl overflow-hidden"
            onClick={() => setShowDetails(true)}
          >
            <div className="grid grid-cols-2 h-full gap-4">
              <div className="relative h-full">
                <img 
                  src={images[4]} 
                  alt={brand} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="relative h-full">
                <img 
                  src={images[5]} 
                  alt={brand}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-4 gap-4"
            onClick={() => setShowDetails(false)}
          >
            {images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src={image} 
                  alt={`${brand} product ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrandCollage;
