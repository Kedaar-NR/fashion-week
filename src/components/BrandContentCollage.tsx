import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

// Define types for the brand content structure
interface BrandContent {
  name: string;
  images: string[];
  videos: string[];
}

interface BrandContentCollageProps {
  onSelectBrand: (brandName: string) => void;
}
const BrandContentCollage = ({ onSelectBrand }: BrandContentCollageProps) => {
  const [brandContents, setBrandContents] = useState<BrandContent[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to load all brand content from the folders
  useEffect(() => {
    setLoading(true);
    // Define the brand folders we want to display with their Instagram handles
    const brandFolders = [
      { folder: 'badson.us', handle: 'badson.us' },
      { folder: 'brotherlylove', handle: 'brotherlylove' },
      { folder: 'derschutze_clo', handle: 'derschutze_clo' },
      { folder: 'drolandmiller', handle: 'drolandmiller' },
      { folder: 'haveyoudiedbefore', handle: 'haveyoudiedbefore' },
      { folder: 'california.arts', handle: 'california.arts' },
      { folder: 'eraworldwideclub', handle: 'eraworldwideclub' },
      { folder: 'nomaintenance', handle: 'nomaintenance' },
      { folder: 'outlw.usa', handle: 'outlw.usa' },
      { folder: 'poolhousenewyork', handle: 'poolhousenewyork' },
      { folder: 'thegvgallery', handle: 'thegvgallery' }
    ];

    // Create an array of brand content objects
    const contents: BrandContent[] = brandFolders.map(({ folder, handle }) => {
      // Get all image files from the brand folder
      const imageFiles: string[] = [];
      const videoFiles: string[] = [];

      // Map folder names to actual content paths
      // This is a static implementation that references the actual files
      if (folder === 'badson.us') {
        imageFiles.push(
          '/src/brand_content/badson.us/badsonclothing1.jpg',
          '/src/brand_content/badson.us/badsonclothing2.jpg',
          '/src/brand_content/badson.us/badsonclothing3.jpg',
          '/src/brand_content/badson.us/fitpic1.jpg'
        );
        videoFiles.push(
          '/src/brand_content/badson.us/video.mp4',
          '/src/brand_content/badson.us/video2.mp4'
        );
      } else if (folder === 'brotherlylove') {
        imageFiles.push(
          '/src/brand_content/brotherlylove/brotherlylove_1664046007_2934553063320393525_35912611459.jpg',
          '/src/brand_content/brotherlylove/brotherlylove_1677787329_3049394913502992918_35912611459.jpg',
          '/src/brand_content/brotherlylove/brotherlylove_1677787329_3049394913503056113_35912611459.jpg',
          '/src/brand_content/brotherlylove/brotherlylove_1740763306_3578103949422478017_35912611459 (1).jpg'
        );
        videoFiles.push(
          '/src/brand_content/brotherlylove/brotherlylove_1664650865_2939625923504481060_35912611459.mp4',
          '/src/brand_content/brotherlylove/brotherlylove_1679770854_3066439708520407000_35912611459.mp4'
        );
      } else if (folder === 'derschutze_clo') {
        imageFiles.push(
          '/src/brand_content/derschutze_clo/derschutze_clo_1726419603_3457780706064379282_2999154756.jpg',
          '/src/brand_content/derschutze_clo/derschutze_clo_1729440411_3483121079615674640_2999154756.jpg',
          '/src/brand_content/derschutze_clo/derschutze_clo_1730653240_3493295032112409900_2999154756.jpg'
        );
        videoFiles.push(
          '/src/brand_content/derschutze_clo/derschutze_clo_1730653240_3493287896854781068_2999154756.mp4',
          '/src/brand_content/derschutze_clo/derschutze_clo_1732813918_3511419931263194906_2999154756.mp4'
        );
      } else if (folder === 'nomaintenance') {
        imageFiles.push(
          '/src/brand_content/nomaintenance/nomaintenance_1731181155_3497723502143598634_14713530917.jpg',
          '/src/brand_content/nomaintenance/nomaintenance_1743281181_3599225877483459256_14713530917.jpg',
          '/src/brand_content/nomaintenance/nomaintenance_1743447001_3600616875254000951_14713530917.jpg'
        );
        videoFiles.push(
          '/src/brand_content/nomaintenance/nomaintenance_1724433735_3441121480208034927_14713530917.mp4',
          '/src/brand_content/nomaintenance/nomaintenance_1741875656_3587435150591258684_14713530917.mp4'
        );
      } else if (folder === 'outlw.usa') {
        imageFiles.push(
          '/src/brand_content/outlw.usa/outlw.usa_1711911948_3336081677266137878_44746425000.jpg',
          '/src/brand_content/outlw.usa/outlw.usa_1728237639_3473031503831846398_44746425000.jpg',
          '/src/brand_content/outlw.usa/outlw.usa_1728415952_3474527297397457205_44746425000.jpg'
        );
        videoFiles.push(
          '/src/brand_content/outlw.usa/outlw.usa_1711998039_3336803474856844468_44746425000.mp4',
          '/src/brand_content/outlw.usa/outlw.usa_1712412338_3340277463214399462_44746425000.mp4'
        );
      } else if (folder === 'california.arts') {
        imageFiles.push(
          '/src/brand_content/california.arts/california.arts_1728226411_3472937314143839348_48483968107.jpg',
          '/src/brand_content/california.arts/california.arts_1728226411_3472937314194158105_48483968107.jpg',
          '/src/brand_content/california.arts/california.arts_1736183206_3539683744023456270_48483968107.jpg'
        );
        videoFiles.push(
          '/src/brand_content/california.arts/california.arts_1724173374_3438936397811838173_48483968107.mp4',
          '/src/brand_content/california.arts/california.arts_1727455753_3466472295034117471_48483968107.mp4'
        );
      } else if (folder === 'eraworldwideclub') {
        imageFiles.push(
          '/src/brand_content/eraworldwideclub/eraworldwideclub_1711816186_3335278371531741824_5050989260.jpg',
          '/src/brand_content/eraworldwideclub/eraworldwideclub_1731604641_3501275958738001264_5050989260.jpg',
          '/src/brand_content/eraworldwideclub/eraworldwideclub_1732633645_3509907874177546050_5050989260.jpg'
        );
        videoFiles.push(
          '/src/brand_content/eraworldwideclub/Download (2).mp4',
          '/src/brand_content/eraworldwideclub/Download (3).mp4'
        );
      } else if (folder === 'haveyoudiedbefore') {
        imageFiles.push(
          '/src/brand_content/haveyoudiedbefore/haveyoudiedbefore_1717873259_3386088780670284580_197862798.jpg',
          '/src/brand_content/haveyoudiedbefore/haveyoudiedbefore_1731441695_3499909070206134087_197862798.jpg',
          '/src/brand_content/haveyoudiedbefore/haveyoudiedbefore_1735071172_3530355332268842358_197862798.jpg'
        );
        videoFiles.push(
          '/src/brand_content/haveyoudiedbefore/haveyoudiedbefore_1744400417_3608614580894412189_197862798.mp4',
          '/src/brand_content/haveyoudiedbefore/xu_tokyo_1739188804_3564896272881908827_2057095195.mp4'
        );
      } else if (folder === 'poolhousenewyork') {
        imageFiles.push(
          '/src/brand_content/poolhousenewyork/poolhousenewyork_1739143070_3564512883298111125_6507428546.jpg',
          '/src/brand_content/poolhousenewyork/poolhousenewyork_1739931310_3571125122811444179_6507428546.jpg',
          '/src/brand_content/poolhousenewyork/poolhousenewyork_1741656635_3585598197533036298_6507428546.jpg'
        );
        videoFiles.push(
          '/src/brand_content/poolhousenewyork/poolhousenewyork_1738002753_3554944888771017969_6507428546.mp4',
          '/src/brand_content/poolhousenewyork/poolhousenewyork_1740785403_3578289499048369644_6507428546.mp4'
        );
      } else if (folder === 'thegvgallery') {
        imageFiles.push(
          '/src/brand_content/thegvgallery/thegvgallery_1687388177_3130361377764292647_1766339506.jpg',
          '/src/brand_content/thegvgallery/thegvgallery_1707688024_3300648834811556022_1766339506.jpg',
          '/src/brand_content/thegvgallery/thegvgallery_1719613040_3400683123791920872_1766339506.jpg'
        );
        videoFiles.push(
          '/src/brand_content/thegvgallery/thegvgallery_1700669915_3241774221536147695_1766339506.mp4',
          '/src/brand_content/thegvgallery/thegvgallery_1715814142_3368813990611006670_1766339506.mp4'
        );
      } else if (folder === 'drolandmiller') {
        imageFiles.push(
          '/src/brand_content/drolandmiller/drolandmiller_1692723090_3175113868220891602_53424805481.jpg',
          '/src/brand_content/drolandmiller/drolandmiller_1695686439_3199972242833929410_53424805481 (1).jpg',
          '/src/brand_content/drolandmiller/drolandmiller_1709404302_3315046022618282267_53424805481.jpg'
        );
        videoFiles.push(
          '/src/brand_content/drolandmiller/Download (1).mp4',
          '/src/brand_content/drolandmiller/Download.mp4'
        );
      }

      return {
        name: handle,
        images: imageFiles,
        videos: videoFiles
      };
    });
    
    setBrandContents(contents);
    setLoading(false);
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

  // Handle brand selection to view content collage
  // Ensure the brand selection logic correctly fetches and displays the content
  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(selectedBrand === brandName ? null : brandName);
    onSelectBrand(brandName);
  };
  
  // Update UI to visually indicate the selected brand with a color change
  const getSelectedBrandContent = () => {
    if (!selectedBrand) return null;
    return brandContents.find(brand => brand.name === selectedBrand);
  };
  
  const selectedContent = getSelectedBrandContent();
  
  // Convert brand name to Instagram handle format
  const getBrandHandle = (name: string): string => {
    let handle = name.toLowerCase().replace(/\s+/g, '');
    
    // Custom mappings for some brands
    const handleMap: Record<string, string> = {
      'badson': 'badson.us',
      'brotherly love': 'brotherlylove',
      'derschutze clo': 'derschutze_clo',
      'droland miller': 'drolandmiller',
      'haveyoudiedbefore': 'haveyoudiedbefore',
      'california arts': 'california.arts',
      'era worldwide club': 'eraworldwideclub',
      'nomaintenance': 'nomaintenance',
      'outlaw xyz': 'outlw.usa',
      'poolhouse ny': 'poolhousenewyork',
      'the gv gallery': 'thegvgallery'
    };
    
    return handleMap[name.toLowerCase()] || handle;
  };




  const selectedContent = getSelectedBrandContent();
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : selectedContent ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold mb-4 text-center">@{selectedContent.name}</h3>
          
          {/* Symmetric grid layout for brand content */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Videos first - they autoplay */}
            {selectedContent.videos.map((video, index) => (
              <div key={`video-${index}`} className="aspect-square overflow-hidden rounded-lg shadow-md bg-black">
                <video 
                  src={video} 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                />
              </div>
            ))}
            
            {/* Then images */}
            {selectedContent.images.map((image, index) => (
              <div key={`image-${index}`} className="aspect-square overflow-hidden rounded-lg shadow-md">
                <img 
                  src={image} 
                  alt={`${selectedContent.name} content ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p>Select a brand above to view their content</p>
        </div>
      )}
    </div>
  );
};
export default BrandContentCollage;