import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { Heart, X } from 'lucide-react';
import { toast } from 'sonner';

interface SwipeImage {
  id: string;
  src: string;
  brand: string;
}

const SwiperPage = () => {
  const [images, setImages] = useState<SwipeImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [likedImages, setLikedImages] = useState<SwipeImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Load images from brand_content folders
  useEffect(() => {
    setLoading(true);
    // This would normally fetch from an API, but we'll use static data for now
    const brandFolders = [
      'badson.us',
      'brotherlylove',
      'derschutze_clo',
      'drolandmiller',
      'haveyoudiedbefore',
      'california.arts',
      'eraworldwideclub',
      'nomaintenance',
      'outlw.usa',
      'poolhousenewyork',
      'thegvgallery'
    ];

    // Create a list of all images from all brand folders
    const allImages: SwipeImage[] = [];

    // Add images from each brand folder
    brandFolders.forEach(brand => {
      // For each brand, add some sample images
      // In a real app, this would be dynamically loaded from the file system
      if (brand === 'badson.us') {
        allImages.push(
          { id: `${brand}-1`, src: '/src/brand_content/badson.us/badsonclothing1.jpg', brand },
          { id: `${brand}-2`, src: '/src/brand_content/badson.us/badsonclothing2.jpg', brand },
          { id: `${brand}-3`, src: '/src/brand_content/badson.us/badsonclothing3.jpg', brand },
          { id: `${brand}-4`, src: '/src/brand_content/badson.us/fitpic1.jpg', brand }
        );
      } else if (brand === 'brotherlylove') {
        allImages.push(
          { id: `${brand}-1`, src: '/src/brand_content/brotherlylove/brotherlylove_1664046007_2934553063320393525_35912611459.jpg', brand },
          { id: `${brand}-2`, src: '/src/brand_content/brotherlylove/brotherlylove_1677787329_3049394913502992918_35912611459.jpg', brand },
          { id: `${brand}-3`, src: '/src/brand_content/brotherlylove/brotherlylove_1677787329_3049394913503056113_35912611459.jpg', brand }
        );
      } else if (brand === 'derschutze_clo') {
        allImages.push(
          { id: `${brand}-1`, src: '/src/brand_content/derschutze_clo/derschutze_clo_1726419603_3457780706064379282_2999154756.jpg', brand },
          { id: `${brand}-2`, src: '/src/brand_content/derschutze_clo/derschutze_clo_1729440411_3483121079615674640_2999154756.jpg', brand },
          { id: `${brand}-3`, src: '/src/brand_content/derschutze_clo/derschutze_clo_1730653240_3493295032112409900_2999154756.jpg', brand }
        );
      } else if (brand === 'nomaintenance') {
        allImages.push(
          { id: `${brand}-1`, src: '/src/brand_content/nomaintenance/nomaintenance_1731181155_3497723502143598634_14713530917.jpg', brand },
          { id: `${brand}-2`, src: '/src/brand_content/nomaintenance/nomaintenance_1743281181_3599225877483459256_14713530917.jpg', brand },
          { id: `${brand}-3`, src: '/src/brand_content/nomaintenance/nomaintenance_1743447001_3600616875254000951_14713530917.jpg', brand }
        );
      } else if (brand === 'outlw.usa') {
        allImages.push(
          { id: `${brand}-1`, src: '/src/brand_content/outlw.usa/outlw.usa_1711911948_3336081677266137878_44746425000.jpg', brand },
          { id: `${brand}-2`, src: '/src/brand_content/outlw.usa/outlw.usa_1728237639_3473031503831846398_44746425000.jpg', brand },
          { id: `${brand}-3`, src: '/src/brand_content/outlw.usa/outlw.usa_1728415952_3474527297397457205_44746425000.jpg', brand }
        );
      } else if (brand === 'california.arts') {
        allImages.push(
          { id: `${brand}-1`, src: '/src/brand_content/california.arts/california.arts_1728226411_3472937314143839348_48483968107.jpg', brand },
          { id: `${brand}-2`, src: '/src/brand_content/california.arts/california.arts_1728226411_3472937314194158105_48483968107.jpg', brand },
          { id: `${brand}-3`, src: '/src/brand_content/california.arts/california.arts_1736183206_3539683744023456270_48483968107.jpg', brand }
        );
      } else if (brand === 'haveyoudiedbefore') {
        allImages.push(
          { id: `${brand}-1`, src: '/src/brand_content/haveyoudiedbefore/haveyoudiedbefore_1717873259_3386088780670284580_197862798.jpg', brand },
          { id: `${brand}-2`, src: '/src/brand_content/haveyoudiedbefore/haveyoudiedbefore_1731441695_3499909070206134087_197862798.jpg', brand },
          { id: `${brand}-3`, src: '/src/brand_content/haveyoudiedbefore/haveyoudiedbefore_1735071172_3530355332268842358_197862798.jpg', brand }
        );
      }
      // Add more brands as needed
    });

    // Shuffle the images for a random order
    const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);
    setImages(shuffledImages);
    setLoading(false);

    // Load liked images from localStorage if available
    const savedLikedImages = localStorage.getItem('swiperLikedImages');
    if (savedLikedImages) {
      setLikedImages(JSON.parse(savedLikedImages));
    }
  }, []);

  // Save liked images to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('swiperLikedImages', JSON.stringify(likedImages));
  }, [likedImages]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleSwipe('left');
      } else if (e.key === 'ArrowRight') {
        handleSwipe('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= images.length) return;

    setDirection(direction);

    // If swiped right (liked), add to liked images
    if (direction === 'right') {
      const likedImage = images[currentIndex];
      setLikedImages(prev => [...prev, likedImage]);
      toast.success(`Liked @${likedImage.brand}`);
    }

    // Move to next image after animation completes
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDirection(null);
    }, 300);
  };

  // Reset to start when all images are swiped
  const handleReset = () => {
    // Shuffle the images again
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    setImages(shuffledImages);
    setCurrentIndex(0);
  };

  // Clear all liked images
  const handleClearLiked = () => {
    setLikedImages([]);
    toast.info('Cleared all liked images');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-14 md:ml-48 pt-8 px-4 md:px-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Swiper</h1>
          
          {/* Liked images gallery */}
          {likedImages.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Liked Fits</h2>
                <button 
                  onClick={handleClearLiked}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {likedImages.map((image) => (
                  <div key={image.id} className="aspect-square rounded-lg overflow-hidden shadow-md relative group">
                    <img 
                      src={image.src} 
                      alt={`Liked fit from ${image.brand}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end justify-start p-2">
                      <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        @{image.brand}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Swiper interface */}
          <div className="flex flex-col items-center justify-center py-8">
            {loading ? (
              <div className="flex justify-center items-center h-[70vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : currentIndex < images.length ? (
              <div className="w-full max-w-md">
                <div className="relative h-[70vh] w-full">
                  <AnimatePresence>
                    <motion.div
                      key={currentIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{
                        x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
                        opacity: 0,
                        transition: { duration: 0.3 }
                      }}
                      className="absolute inset-0 rounded-xl overflow-hidden shadow-xl"
                    >
                      <img
                        src={images[currentIndex].src}
                        alt={`Fashion item from ${images[currentIndex].brand}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white font-semibold">@{images[currentIndex].brand}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="flex justify-center gap-8 mt-6">
                  <button
                    onClick={() => handleSwipe('left')}
                    className="p-4 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <X size={32} className="text-red-500" />
                  </button>
                  <button
                    onClick={() => handleSwipe('right')}
                    className="p-4 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart size={32} className="text-green-500" />
                  </button>
                </div>
                
                <div className="text-center mt-4 text-gray-500">
                  <p>Use arrow keys: ← to pass, → to like</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">You've seen all the fits!</h3>
                <p className="text-gray-600 mb-6">Ready to see more?</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperPage;