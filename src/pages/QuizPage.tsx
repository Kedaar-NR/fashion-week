
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Quiz images from images1 folder for first part
const firstQuizImages = [
  "/images/images1/image1.jpg",
  "/images/images1/image2.jpg",
  "/images/images1/image3.jpg",
  "/images/images1/image4.jpg",
  "/images/images1/image5.jpg",
  "/images/images1/image6.jpg",
  "/images/images1/image7.jpg",
  "/images/images1/image8.jpg",
  "/images/images1/image9.jpg",
];

// Quiz images from images2 folder for second part
const secondQuizImages = [
  "/images/images2/image1.jpg",
  "/images/images2/image2.jpg",
  "/images/images2/image3.jpg",
  "/images/images2/image4.jpg",
  "/images/images2/image5.jpg",
  "/images/images2/image6.jpg",
  "/images/images2/image7.jpg",
  "/images/images2/image8.jpg",
  "/images/images2/image9.jpg",
];

const QuizPage = () => {
  const [step, setStep] = useState(1);
  const [selectedFirstImages, setSelectedFirstImages] = useState<number[]>([]);
  const [selectedSecondImages, setSelectedSecondImages] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleFirstQuizSelection = (index: number) => {
    if (selectedFirstImages.includes(index)) {
      setSelectedFirstImages(selectedFirstImages.filter(i => i !== index));
    } else if (selectedFirstImages.length < 5) {
      setSelectedFirstImages([...selectedFirstImages, index]);
    }
  };

  const handleSecondQuizSelection = (index: number) => {
    if (selectedSecondImages.includes(index)) {
      setSelectedSecondImages(selectedSecondImages.filter(i => i !== index));
    } else if (selectedSecondImages.length < 5) {
      setSelectedSecondImages([...selectedSecondImages, index]);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Combine both quiz selections for recommendation algorithm
      const stylePreferences = [...selectedFirstImages, ...selectedSecondImages];
      
      // Store the user's selections in localStorage
      localStorage.setItem('stylePreferences', JSON.stringify(stylePreferences));
      
      // Navigate to recommendations page
      navigate('/recommendations');
    }
  };

  const isImageSelected = (index: number, step: number) => {
    return step === 1 
      ? selectedFirstImages.includes(index)
      : selectedSecondImages.includes(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-5xl md:text-7xl font-bold text-black mb-12">
        {step === 1 ? "WHO ARE YOU?" : "WHAT DO YOU LIKE?"}
      </h1>
      
      <p className="text-xl mb-8">select from the following</p>
      
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {step === 1 ? (
          // First quiz with images from images1
          firstQuizImages.map((image, index) => (
            <div 
              key={index}
              className={`relative cursor-pointer overflow-hidden rounded-2xl aspect-square ${
                isImageSelected(index, 1) ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => handleFirstQuizSelection(index)}
            >
              <img 
                src={image} 
                alt={`Style option ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {isImageSelected(index, 1) && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center">
                  <div className="bg-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          // Second quiz with images from images2
          secondQuizImages.map((image, index) => (
            <div 
              key={index}
              className={`relative cursor-pointer overflow-hidden rounded-2xl aspect-square ${
                isImageSelected(index, 2) ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => handleSecondQuizSelection(index)}
            >
              <img 
                src={image} 
                alt={`Style option ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {isImageSelected(index, 2) && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center">
                  <div className="bg-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-12">
        <Button 
          onClick={handleNext}
          disabled={(step === 1 && selectedFirstImages.length === 0) || 
                  (step === 2 && selectedSecondImages.length === 0)}
          className="text-xl px-10 py-6 h-auto bg-black text-white hover:bg-gray-800 rounded-none"
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default QuizPage;
