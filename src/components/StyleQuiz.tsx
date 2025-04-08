
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface StyleImage {
  id: number;
  url: string;
  style: string;
}

// Images for the first page (from images1 folder)
const page1Images: StyleImage[] = [
  { id: 1, url: "/images/images1/IMG_4953.JPG", style: "MINIMALIST" },
  { id: 2, url: "/images/images1/IMG_4954.JPG", style: "STREETWEAR" },
  { id: 3, url: "/images/images1/IMG_4955.JPG", style: "PUNK" },
  { id: 4, url: "/images/images1/IMG_4957.JPG", style: "LUXURY" },
  { id: 5, url: "/images/images1/IMG_4958.JPG", style: "Y2K" },
  { id: 6, url: "/images/images1/IMG_4959.JPG", style: "GRUNGE" },
  { id: 7, url: "/images/images1/IMG_4960.JPG", style: "VINTAGE" },
];

// Images for the second page (from images2 folder)
const page2Images: StyleImage[] = [
  { id: 8, url: "/images/images2/IMG_4968.JPG", style: "ESSENTIALS" },
  { id: 9, url: "/images/images2/IMG_4969.JPG", style: "LUXURY" },
  { id: 10, url: "/images/images2/IMG_4971.JPG", style: "COWBOY" },
  { id: 11, url: "/images/images2/IMG_4972.JPG", style: "STREETWEAR" },
  { id: 12, url: "/images/images2/IMG_4973.JPG", style: "MINIMALIST" },
  { id: 13, url: "/images/images2/IMG_4974.JPG", style: "PUNK" },
  { id: 14, url: "/images/images2/IMG_4975.JPG", style: "VINTAGE" },
];

interface StyleQuizProps {
  onClose: () => void;
}

const StyleQuiz: React.FC<StyleQuizProps> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1); // Track which page we're on
  const [selectedImagesPage1, setSelectedImagesPage1] = useState<number[]>([]);
  const [selectedImagesPage2, setSelectedImagesPage2] = useState<number[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Preload all images when component mounts
  useEffect(() => {
    const allImages = [...page1Images, ...page2Images];
    const imagePromises = allImages.map((image) => {
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
        img.src = image.url; // Local images don't need query parameters
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, []);

  const toggleImageSelection = (id: number) => {
    if (currentPage === 1) {
      if (selectedImagesPage1.includes(id)) {
        setSelectedImagesPage1(selectedImagesPage1.filter(imageId => imageId !== id));
      } else if (selectedImagesPage1.length < 5) {
        setSelectedImagesPage1([...selectedImagesPage1, id]);
      }
    } else {
      if (selectedImagesPage2.includes(id)) {
        setSelectedImagesPage2(selectedImagesPage2.filter(imageId => imageId !== id));
      } else if (selectedImagesPage2.length < 4) { // Allow up to 4 selections on page 2
        setSelectedImagesPage2([...selectedImagesPage2, id]);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage === 1 && selectedImagesPage1.length > 0) {
      setCurrentPage(2); // Move to page 2
    } else if (currentPage === 2 && selectedImagesPage2.length > 0) {
      // Collect all selected styles from both pages
      const allSelectedIds = [...selectedImagesPage1, ...selectedImagesPage2];
      const allImages = [...page1Images, ...page2Images];
      
      // Count styles and find the most selected ones
      const styleCounts: Record<string, number> = {};
      
      allSelectedIds.forEach(id => {
        const image = allImages.find(img => img.id === id);
        if (image) {
          styleCounts[image.style] = (styleCounts[image.style] || 0) + 1;
        }
      });
      
      // Get the top styles
      const sortedStyles = Object.entries(styleCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([style]) => style);
      
      // Save quiz results to localStorage
      localStorage.setItem('hasSeenStyleQuiz', 'true');
      localStorage.setItem('quizResults', JSON.stringify({
        selectedStyles: sortedStyles,
        page1Selections: selectedImagesPage1,
        page2Selections: selectedImagesPage2
      }));
      
      // Navigate to recommendations page
      navigate('/recommendations');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {currentPage === 1 ? "What Style Are You? (Page 1/2)" : "Almost Done! (Page 2/2)"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          {currentPage === 1 
            ? "Select up to 5 outfits that match your style preferences." 
            : "Select up to 4 more outfits that match your style."}
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-600">Loading style images...</span>
          </div>
        ) : (
          <>
            {currentPage === 1 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                {page1Images.map((image) => (
                  <div 
                    key={image.id}
                    className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer relative ${
                      selectedImagesPage1.includes(image.id) ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                    } ${loadedImages.includes(image.id) ? '' : 'opacity-50'}`}
                    onClick={() => loadedImages.includes(image.id) && toggleImageSelection(image.id)}
                  >
                    <img 
                      src={image.url} 
                      alt={`Style ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImagesPage1.includes(image.id) && (
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
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                {page2Images.map((image) => (
                  <div 
                    key={image.id}
                    className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer relative ${
                      selectedImagesPage2.includes(image.id) ? 'ring-2 ring-offset-2 ring-purple-500' : ''
                    } ${loadedImages.includes(image.id) ? '' : 'opacity-50'}`}
                    onClick={() => loadedImages.includes(image.id) && toggleImageSelection(image.id)}
                  >
                    <img 
                      src={image.url} 
                      alt={`Style ${image.id}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImagesPage2.includes(image.id) && (
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
            )}
          </>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            Selected: {currentPage === 1 ? selectedImagesPage1.length : selectedImagesPage2.length}/
            {currentPage === 1 ? '5' : '4'}
          </div>
          <div className="flex gap-4">
            {currentPage === 2 && (
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage(1)}
                disabled={isLoading}
              >
                Back
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Skip
            </Button>
            <Button 
              onClick={handleNextPage}
              disabled={
                (currentPage === 1 && selectedImagesPage1.length === 0) || 
                (currentPage === 2 && selectedImagesPage2.length === 0) || 
                isLoading
              }
            >
              {currentPage === 1 ? "Next" : "Finish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleQuiz;
