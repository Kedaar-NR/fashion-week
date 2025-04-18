
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import MarqueeCategories from './MarqueeCategories';

// Define types for the brand content structure
interface BrandContent {
  name: string;
  images: string[];
  videos: string[];
}

const BrandContentCollage = () => {
  const [brandContents, setBrandContents] = useState<BrandContent[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showCollage, setShowCollage] = useState<boolean>(false);
  
  // Define the brand folders we want to display
  const brandFolders = [
    'Badson',
    'Brotherly Love',
    'Derschutze Clo',
    'Droland Miller',
    'Haveyoudiedbefore',
    'california arts',
    'era worldwide club',
    'nomaintenance',
    'outlaw xyz',
    'poolhouse ny',
    'the gv gallery'
  ];
  
  // Function to load all brand content from the folders
  useEffect(() => {
    // Create an array of brand content objects
    const contents: BrandContent[] = brandFolders.map(folder => {
      const brandName = folder.charAt(0).toUpperCase() + folder.slice(1);
      
      // Get all image files from the brand folder
      const imageFiles: string[] = [];
      const videoFiles: string[] = [];
      
      // Manually add specific files from each brand folder
      // This is a static implementation that references the actual files
      if (folder === 'Badson') {
        imageFiles.push(
          '/src/brand_content/Badson/badson.us_1699473586_3231741135639083877_1432091644.jpg',
          '/src/brand_content/Badson/badson.us_1722106717_3421601599318493002_1432091644.jpg',
          '/src/brand_content/Badson/badson.us_1722106717_3421601599477840088_1432091644.jpg',
          '/src/brand_content/Badson/badson.us_1731527981_3500632892991125504_1432091644.jpg'
        );
        videoFiles.push(
          '/src/brand_content/Badson/badson.us_1723057170_3429573505632039684_1432091644.mp4'
        );
      } else if (folder === 'Brotherly Love') {
        imageFiles.push(
          '/src/brand_content/Brotherly Love/brotherlylove_1664046007_2934553063320393525_35912611459.jpg',
          '/src/brand_content/Brotherly Love/brotherlylove_1677787329_3049394913502992918_35912611459.jpg',
          '/src/brand_content/Brotherly Love/brotherlylove_1677787329_3049394913503056113_35912611459.jpg'
        );
      } else if (folder === 'Derschutze Clo') {
        imageFiles.push(
          '/src/brand_content/Derschutze Clo/derschutze_clo_1726419603_3457780706064379282_2999154756.jpg',
          '/src/brand_content/Derschutze Clo/derschutze_clo_1729440411_3483121079615674640_2999154756.jpg',
          '/src/brand_content/Derschutze Clo/derschutze_clo_1730653240_3493295032112409900_2999154756.jpg'
        );
      } else if (folder === 'nomaintenance') {
        imageFiles.push(
          '/src/brand_content/nomaintenance/nomaintenance_1731181155_3497723502143598634_14713530917.jpg',
          '/src/brand_content/nomaintenance/nomaintenance_1743281181_3599225877483459256_14713530917.jpg',
          '/src/brand_content/nomaintenance/nomaintenance_1743447001_3599225877483459256_14713530917.jpg'
        );
      } else if (folder === 'outlaw xyz') {
        imageFiles.push(
          '/src/brand_content/outlaw xyz/outlw.usa_1711911948_3336081677266137878_44746425000.jpg',
          '/src/brand_content/outlaw xyz/outlw.usa_1728237639_3473031503831846398_44746425000.jpg',
          '/src/brand_content/outlaw xyz/outlw.usa_1728415952_3474527297397457205_44746425000.jpg'
        );
      }
      
      // Add more brand folders with their respective files here
      
      return {
        name: brandName,
        images: imageFiles,
        videos: videoFiles
      };
    });
    
    setBrandContents(contents);
  }, []);
  
  // Preload all images to improve performance
  useEffect(() => {
    brandContents.forEach(brand => {
      brand.images.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
      });
    });
  }, [brandContents]);
  
  // Handle brand selection from the marquee
  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    setShowCollage(true);
  };
  
  // Convert brand name to Instagram handle format
  const getBrandHandle = (name: string): string => {
    let handle = name.toLowerCase().replace(/\s+/g, '');
    
    // Custom mappings for some brands
    const handleMap: Record<string, string> = {
      'Badson': 'badson.us',
      'Brotherly Love': 'brotherlylove',
      'Derschutze Clo': 'derschutze_clo',
      'Droland Miller': 'drolandmiller',
      'Haveyoudiedbefore': 'haveyoudiedbefore',
      'california arts': 'california.arts',
      'era worldwide club': 'eraworldwideclub',
      'nomaintenance': 'nomaintenance',
      'outlaw xyz': 'outlw.usa',
      'poolhouse ny': 'poolhousenewyork',
      'the gv gallery': 'thegvgallery'
    };
    
    return handleMap[name] || handle;
  };
  
  // Get the selected brand content
  const selectedBrandContent = selectedBrand 
    ? brandContents.find(bc => bc.name.toLowerCase() === selectedBrand.toLowerCase())
    : null;
  
  const brandNames = brandContents.map(bc => getBrandHandle(bc.name));
  
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      {/* Marquee of brand names */}
      <MarqueeCategories 
        brands={brandNames} 
        onSelectBrand={handleBrandSelect} 
      />
      
      {/* Instagram embed when a brand is selected */}
      {selectedBrand && showCollage && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-8"
        >
          <div className="rounded-xl overflow-hidden aspect-video max-h-[60vh] w-full mx-auto mb-4">
            <iframe 
              src={`https://www.instagram.com/${getBrandHandle(selectedBrand)}/embed`}
              className="w-full h-full border-none" 
              title={`${selectedBrand} Instagram Feed`}
              scrolling="no"
              allowTransparency={true}
              onError={(e) => {
                const iframe = e.currentTarget;
                iframe.style.display = 'none';
                const container = document.createElement('div');
                container.className = 'w-full h-full flex items-center justify-center bg-gray-100';
                
                const iconWrapper = document.createElement('div');
                iconWrapper.className = 'flex flex-col items-center text-gray-500';
                
                const icon = document.createElement('div');
                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>';
                iconWrapper.appendChild(icon);
                
                const text = document.createElement('p');
                text.className = 'mt-2';
                text.textContent = `@${getBrandHandle(selectedBrand)}`;
                iconWrapper.appendChild(text);
                
                container.appendChild(iconWrapper);
                iframe.parentNode?.appendChild(container);
              }}
            />
          </div>
          
          {/* Product-like display of the first 4 images */}
          {selectedBrandContent && selectedBrandContent.images.length > 0 && (
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-2 cursor-pointer"
              onClick={() => setShowCollage(!showCollage)}
            >
              {selectedBrandContent.images.slice(0, 4).map((image, idx) => (
                <div key={idx} className="aspect-square overflow-hidden rounded-md bg-gray-100 hover:opacity-90 transition-opacity">
                  <img 
                    src={image} 
                    alt={`${selectedBrand} product ${idx+1}`}
                    className="w-full h-full object-cover"
                    loading="eager" 
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
      
      {/* Collage of brand content when no brand is selected */}
      {(!selectedBrand || !showCollage) && (
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-2 cursor-pointer" 
          onClick={() => setShowCollage(false)}
        >
          <div className="col-span-1 aspect-[9/16] md:aspect-auto md:row-span-2">
            {brandContents[0]?.images[0] && (
              <img 
                src={brandContents[0].images[0]} 
                alt={brandContents[0].name}
                className="w-full h-full object-cover rounded-lg"
                loading="eager"
              />
            )}
          </div>
          
          <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-2">
            {brandContents.slice(1, 6).map((brand, index) => (
              brand.images[0] && (
                <div key={index} className={`${index === 0 ? 'col-span-2' : 'col-span-1'}`}>
                  <img 
                    src={brand.images[0]} 
                    alt={brand.name}
                    className="w-full h-full object-cover rounded-lg"
                    loading="eager"
                  />
                </div>
              )
            ))}
          </div>
          
          <div className="grid grid-cols-3 col-span-1 md:col-span-3 gap-2">
            {brandContents.slice(6, 11).map((brand, index) => (
              brand.images[0] && (
                <div key={index} className={`${index === 1 || index === 3 ? 'col-span-2' : 'col-span-1'}`}>
                  <img 
                    src={brand.images[0]} 
                    alt={brand.name}
                    className="w-full h-full object-cover rounded-lg"
                    loading="eager"
                  />
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandContentCollage;
