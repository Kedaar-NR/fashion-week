
import { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface StyleImage {
  id: number;
  url: string;
  style: string;
}

const styleImages: StyleImage[] = [
  // First row
  { id: 1, url: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8", style: "MINIMALIST" },
  { id: 2, url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2", style: "STREETWEAR" },
  { id: 3, url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f", style: "PUNK" },
  { id: 4, url: "https://images.unsplash.com/photo-1599032909756-5deb82fea3b0", style: "LUXURY" },
  { id: 5, url: "https://images.unsplash.com/photo-1583744946564-b52d01e7f922", style: "Y2K" },
  { id: 6, url: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7", style: "GRUNGE" },
  { id: 7, url: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5", style: "VINTAGE" },
  
  // Second row
  { id: 8, url: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd", style: "ESSENTIALS" },
  { id: 9, url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952", style: "LUXURY" },
  { id: 10, url: "https://images.unsplash.com/photo-1566206091558-7f218b696731", style: "COWBOY" },
  { id: 11, url: "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5", style: "STREETWEAR" },
  { id: 12, url: "https://images.unsplash.com/photo-1603189343302-e603f7add05f", style: "MINIMALIST" },
  { id: 13, url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e", style: "PUNK" },
  { id: 14, url: "https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc", style: "VINTAGE" },
];

interface StyleQuizProps {
  onClose: () => void;
}

const StyleQuiz: React.FC<StyleQuizProps> = ({ onClose }) => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleImageSelection = (id: number) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imageId => imageId !== id));
    } else if (selectedImages.length < 5) {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const handleNext = () => {
    if (selectedImages.length > 0) {
      // Count styles and find the most selected one
      const styleCounts: Record<string, number> = {};
      
      selectedImages.forEach(id => {
        const image = styleImages.find(img => img.id === id);
        if (image) {
          styleCounts[image.style] = (styleCounts[image.style] || 0) + 1;
        }
      });
      
      let dominantStyle = '';
      let maxCount = 0;
      
      Object.entries(styleCounts).forEach(([style, count]) => {
        if (count > maxCount) {
          maxCount = count;
          dominantStyle = style;
        }
      });
      
      // Save to local storage that quiz has been completed
      localStorage.setItem('hasSeenStyleQuiz', 'true');
      
      // Navigate to brands page with the dominant style filter
      navigate(`/brands?style=${dominantStyle}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6">
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
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          {styleImages.slice(0, 7).map((image) => (
            <div 
              key={image.id}
              className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer relative ${
                selectedImages.includes(image.id) ? 'ring-2 ring-offset-2 ring-purple-500' : ''
              }`}
              onClick={() => toggleImageSelection(image.id)}
            >
              <img 
                src={`${image.url}?w=300&h=400&fit=crop`} 
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
              }`}
              onClick={() => toggleImageSelection(image.id)}
            >
              <img 
                src={`${image.url}?w=300&h=400&fit=crop`} 
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
              disabled={selectedImages.length === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleQuiz;
