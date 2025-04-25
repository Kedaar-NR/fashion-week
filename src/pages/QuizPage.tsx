import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';

// Optimize image sizes with smaller dimensions
const firstQuizImages = [
  "/lovable-uploads/2826c26c-5666-46ec-8872-60b6f526e6a5.png?w=400",
  "/lovable-uploads/c5e45c20-edf8-4052-9d18-b4293316d77f.png?w=400",
  "/lovable-uploads/963420ec-8c53-43e3-91b3-b507a7d64bad.png?w=400",
  "/lovable-uploads/723635b7-5223-430c-a054-2a1ab7971a24.png?w=400",
  "/lovable-uploads/9953ddd7-f803-4af2-8bf3-6966acb27840.png?w=400",
  "/lovable-uploads/58f18634-f3fe-4af0-8647-8d05ef1fe6f1.png?w=400",
  "/lovable-uploads/1dd45f3b-15d1-4835-8864-ed5dfe439022.png?w=400",
  "/lovable-uploads/06e2fc25-31fe-4a72-8da0-83102ca9a5f2.png?w=400",
  "/lovable-uploads/f10a9c4d-aac3-4645-8f81-e333a6ab3dba.png?w=400",
];

const secondQuizImages = [
  "/lovable-uploads/cc94c43a-db79-4499-9294-05627894354a.png?w=400",
  "/lovable-uploads/200a1dfb-d9d8-49d2-8b01-89160bde0f75.png?w=400",
  "/lovable-uploads/dfcb5746-f522-48dd-b19d-d5be29f59c01.png?w=400",
  "/lovable-uploads/cd42b70e-971a-4590-b221-eecf8d55c2ff.png?w=400",
  "/lovable-uploads/0b5aa324-dc5c-4449-b3a0-293a2b9c1a7f.png?w=400",
  "/lovable-uploads/ee5de25f-77c0-4f49-9e73-149439f509d1.png?w=400",
  "/lovable-uploads/9e07dfdf-8b93-4d03-9c1b-10d189de482a.png?w=400",
  "/lovable-uploads/82c44263-ca67-41ed-995a-d9ce61575943.png?w=400",
  "/lovable-uploads/c477a5b0-8825-4f0a-8417-f0f376abb471.png?w=400",
];

const QuizPage = () => {
  const [step, setStep] = useState(1);
  const [selectedFirstImages, setSelectedFirstImages] = useState<number[]>([]);
  const [selectedSecondImages, setSelectedSecondImages] = useState<number[]>([]);
  const navigate = useNavigate();

  // Preload all quiz images
  useEffect(() => {
    [...firstQuizImages, ...secondQuizImages].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col items-center justify-center bg-white p-6 flex-1 ml-14"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
            {step === 1 ? "WHO ARE YOU?" : "WHAT DO YOU LIKE?"}
          </h1>
          
          <p className="text-lg mb-8">select from the following</p>
          
          <div className="grid grid-cols-3 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {step === 1 ? (
              // First quiz with uploaded images (smaller size)
              firstQuizImages.map((image, index) => (
                <motion.div 
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl aspect-square ${
                    isImageSelected(index, 1) ? "ring-4 ring-blue-500" : ""
                  }`}
                  onClick={() => handleFirstQuizSelection(index)}
                >
                  <img 
                    src={image} 
                    alt={`Style option ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="eager"
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
                </motion.div>
              ))
            ) : (
              // Second quiz with uploaded images (smaller size)
              secondQuizImages.map((image, index) => (
                <motion.div 
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl aspect-square ${
                    isImageSelected(index, 2) ? "ring-4 ring-blue-500" : ""
                  }`}
                  onClick={() => handleSecondQuizSelection(index)}
                >
                  <img 
                    src={image} 
                    alt={`Style option ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="eager"
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
                </motion.div>
              ))
            )}
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={handleNext}
              disabled={(step === 1 && selectedFirstImages.length === 0) || 
                      (step === 2 && selectedSecondImages.length === 0)}
              className="text-lg px-8 py-4 h-auto bg-black text-white hover:bg-gray-800 rounded-none"
            >
              next
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;
