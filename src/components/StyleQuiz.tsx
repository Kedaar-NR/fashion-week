import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Option {
  id: number;
  text: string;
  image?: string;
  styleProfile?: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your go-to everyday style?",
    options: [
      { id: 1, text: "Casual and comfy", image: "/quiz-images/casual.jpg", styleProfile: 'casual' },
      { id: 2, text: "Trendy and chic", image: "/quiz-images/trendy.jpg", styleProfile: 'trendy' },
      { id: 3, text: "Classic and elegant", image: "/quiz-images/classic.jpg", styleProfile: 'classic' },
      { id: 4, text: "Boho and free-spirited", image: "/quiz-images/boho.jpg", styleProfile: 'boho' },
    ]
  },
  {
    id: 2,
    question: "Pick an outfit for a night out:",
    options: [
      { id: 5, text: "Jeans and a nice top", image: "/quiz-images/jeans-top.jpg", styleProfile: 'casual' },
      { id: 6, text: "A stylish dress", image: "/quiz-images/dress.jpg", styleProfile: 'trendy' },
      { id: 7, text: "A tailored suit", image: "/quiz-images/suit.jpg", styleProfile: 'classic' },
      { id: 8, text: "Flowy maxi dress", image: "/quiz-images/maxi-dress.jpg", styleProfile: 'boho' },
    ]
  },
  {
    id: 3,
    question: "Choose your favorite color palette:",
    options: [
      { id: 9, text: "Neutrals", image: "/quiz-images/neutrals.jpg", styleProfile: 'classic' },
      { id: 10, text: "Bright and bold", image: "/quiz-images/bold.jpg", styleProfile: 'trendy' },
      { id: 11, text: "Earthy tones", image: "/quiz-images/earthy.jpg", styleProfile: 'boho' },
      { id: 12, text: "Pastels", image: "/quiz-images/pastels.jpg", styleProfile: 'casual' },
    ]
  },
  {
    id: 4,
    question: "Select an accessory:",
    options: [
      { id: 13, text: "Statement jewelry", image: "/quiz-images/statement-jewelry.jpg", styleProfile: 'trendy' },
      { id: 14, text: "Delicate necklace", image: "/quiz-images/necklace.jpg", styleProfile: 'classic' },
      { id: 15, text: "Boho hat", image: "/quiz-images/hat.jpg", styleProfile: 'boho' },
      { id: 16, text: "Comfy scarf", image: "/quiz-images/scarf.jpg", styleProfile: 'casual' },
    ]
  },
  {
    id: 5,
    question: "What's your ideal weekend activity?",
    options: [
      { id: 17, text: "Shopping", image: "/quiz-images/shopping.jpg", styleProfile: 'trendy' },
      { id: 18, text: "Museum visit", image: "/quiz-images/museum.jpg", styleProfile: 'classic' },
      { id: 19, text: "Outdoor concert", image: "/quiz-images/concert.jpg", styleProfile: 'boho' },
      { id: 20, text: "Relaxing at home", image: "/quiz-images/relaxing.jpg", styleProfile: 'casual' },
    ]
  },
];

const StyleQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: Option) => {
    let newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true);
      
      // Calculate style profile
      const styleCounts: { [key: string]: number } = {};
      newSelectedOptions.forEach(selectedOption => {
        if (selectedOption.styleProfile) {
          styleCounts[selectedOption.styleProfile] = (styleCounts[selectedOption.styleProfile] || 0) + 1;
        }
      });
  
      let predictedStyle = Object.keys(styleCounts).reduce((a, b) => styleCounts[a] > styleCounts[b] ? a : b, '');
      
      // Navigate to recommendations page with style profile
      navigate(`/recommendations?style=${predictedStyle}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Preload images for the quiz
  useEffect(() => {
    // Preload all option images
    questions.forEach(question => {
      question.options.forEach(option => {
        if (option.image) {
          const img = new Image();
          img.src = option.image;
        }
      });
    });
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-16">
      <h2 className="text-3xl font-extrabold text-center mt-8 mb-6 font-kanit">
        Discover Your Style
      </h2>

      {!isComplete ? (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`cursor-pointer transition-all duration-300 rounded-lg overflow-hidden border-2 ${
                  selectedOptions[currentQuestionIndex]?.id === option.id
                    ? 'border-black scale-105 shadow-lg'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                {option.image && (
                  <div className="h-32 md:h-36 relative"> {/* Made images smaller */}
                    <img
                      src={option.image}
                      alt={option.text}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-2 bg-white">
                  <p className="font-medium text-sm text-center">{option.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handleOptionSelect(currentQuestion.options[0])}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center">Quiz Complete!</h3>
          <p className="text-center">Redirecting to your style recommendations...</p>
        </div>
      )}
    </div>
  );
};

export default StyleQuiz;
