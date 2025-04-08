
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface StyleImage {
  id: number;
  url: string;
  style: string;
}

// Using uploaded images for the style quiz
const styleImages: StyleImage[] = [
  // First row - fashion images
  { id: 1, url: "/lovable-uploads/2826c26c-5666-46ec-8872-60b6f526e6a5.png", style: "MINIMALIST" },
  { id: 2, url: "/lovable-uploads/c5e45c20-edf8-4052-9d18-b4293316d77f.png", style: "STREETWEAR" },
  { id: 3, url: "/lovable-uploads/963420ec-8c53-43e3-91b3-b507a7d64bad.png", style: "PUNK" },
  { id: 4, url: "/lovable-uploads/723635b7-5223-430c-a054-2a1ab7971a24.png", style: "LUXURY" },
  { id: 5, url: "/lovable-uploads/9953ddd7-f803-4af2-8bf3-6966acb27840.png", style: "Y2K" },
  { id: 6, url: "/lovable-uploads/58f18634-f3fe-4af0-8647-8d05ef1fe6f1.png", style: "GRUNGE" },
  { id: 7, url: "/lovable-uploads/1dd45f3b-15d1-4835-8864-ed5dfe439022.png", style: "VINTAGE" },
  
  // Second row - more images
  { id: 8, url: "/lovable-uploads/cc94c43a-db79-4499-9294-05627894354a.png", style: "ESSENTIALS" },
  { id: 9, url: "/lovable-uploads/200a1dfb-d9d8-49d2-8b01-89160bde0f75.png", style: "LUXURY" },
  { id: 10, url: "/lovable-uploads/dfcb5746-f522-48dd-b19d-d5be29f59c01.png", style: "COWBOY" },
  { id: 11, url: "/lovable-uploads/cd42b70e-971a-4590-b221-eecf8d55c2ff.png", style: "STREETWEAR" },
  { id: 12, url: "/lovable-uploads/0b5aa324-dc5c-4449-b3a0-293a2b9c1a7f.png", style: "MINIMALIST" },
  { id: 13, url: "/lovable-uploads/ee5de25f-77c0-4f49-9e73-149439f509d1.png", style: "PUNK" },
  { id: 14, url: "/lovable-uploads/9e07dfdf-8b93-4d03-9c1b-10d189de482a.png", style: "VINTAGE" },
];

interface StyleQuizProps {
  onClose: () => void;
}

const StyleQuiz: React.FC<StyleQuizProps> = ({ onClose }) => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Preload all images when component mounts
  useEffect(() => {
    const imagePromises = styleImages.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => [...prev, image.id]);
          resolve(image.id);
        };
        img.onerror = () => {
          // If loading fails, still resolve but log an error
          console.error(`Failed to load image: ${image.url}`);
          resolve(image.id);
        };
        img.src = image.url;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, []);

  const toggleImageSelection = (id: number) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imageId => imageId !== id));
    } else if (selectedImages.length < 5) {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleNext = () => {
    if (selectedImages.length > 0) {
      // Save to local storage that quiz has been completed
      localStorage.setItem('hasSeenStyleQuiz', 'true');
      
      // Navigate to quiz page for full experience
      navigate('/quiz');
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">What Style Are You?</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Select up to 5 outfits that match your style preferences.
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-gray-600">Loading style images...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                {styleImages.slice(0, 7).map((image) => (
                  <div 
                    key={image.id}
                    className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer relative ${
                      selectedImages.includes(image.id) ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                    } ${loadedImages.includes(image.id) ? '' : 'opacity-50'}`}
                    onClick={() => loadedImages.includes(image.id) && toggleImageSelection(image.id)}
                  >
                    <img 
                      src={image.url} 
                      alt={`Style ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImages.includes(image.id) && (
                      <div className="absolute inset-0 bg-purple-500 bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                {styleImages.slice(7, 14).map((image) => (
                  <div 
                    key={image.id}
                    className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer relative ${
                      selectedImages.includes(image.id) ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                    } ${loadedImages.includes(image.id) ? '' : 'opacity-50'}`}
                    onClick={() => loadedImages.includes(image.id) && toggleImageSelection(image.id)}
                  >
                    <img 
                      src={image.url} 
                      alt={`Style ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImages.includes(image.id) && (
                      <div className="absolute inset-0 bg-purple-500 bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              Selected: {selectedImages.length}/5
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={onClose}
              >
                Skip
              </Button>
              <Button 
                onClick={handleNext}
                disabled={selectedImages.length === 0 || isLoading}
              >
                Next
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StyleQuiz;
