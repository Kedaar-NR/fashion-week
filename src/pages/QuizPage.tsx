import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

// Get the 20 quiz images from the public/style_quiz folder
const quizImages = [
  "Grunge.png",
  "Grunge.jpg",
  "AvantStreet_LoudStreet.jpg",
  "EuroStreet.webp",
  "Streetwear.jpg",
  "LuxaryStreet.jpg",
  "Y2K_Street.jpg",
  "Opium_Goth.jpg",
  "Gorpcore.JPG",
  "Minimal_Comfy.JPG",
  "Streetwear(1).JPG",
  "Leather.JPG",
  "work_street.JPG",
  "IMG_4959.jpg",
  "Luxary Street.webp",
  "Japanese_Punk.jpg",
  "Emo_Opium_Goth.jpg",
  "Vintage.jpg",
  "Minimalist.jpg",
  "Workwear.jpg",
];

const QuizPage = () => {
  const [step, setStep] = useState(1);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const navigate = useNavigate();

  // Preload all quiz images
  useEffect(() => {
    quizImages.forEach((img) => {
      const image = new window.Image();
      image.src = `/style_quiz/${img}`;
    });
  }, []);

  const handleImageSelect = (index: number) => {
    if (selectedImages.includes(index)) {
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else navigate("/recommendations");
  };

  const imagesToShow =
    step === 1 ? quizImages.slice(0, 10) : quizImages.slice(10, 20);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Sidebar />
      <header className="w-full py-8 px-2 sm:px-0 flex justify-center items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black text-center w-full max-w-4xl mx-auto">
          WHO ARE YOU?
        </h1>
      </header>
      <main className="flex-1 flex flex-col items-center w-full px-2 sm:px-6 justify-start mt-[-32px] md:mt-[-48px]">
        <div
          className="flex flex-col items-center w-full"
          style={{ marginTop: 0 }}
        >
          <div className="h-6 sm:h-10 md:h-16" />
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-center">
            select from the following
          </p>
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl mb-6 sm:mb-8 place-items-center">
            {imagesToShow.map((img, idx) => (
              <motion.div
                key={img}
                className={`relative cursor-pointer overflow-hidden rounded-2xl aspect-square ${
                  selectedImages.includes((step - 1) * 10 + idx)
                    ? "ring-4 ring-blue-500"
                    : ""
                }`}
                onClick={() => handleImageSelect((step - 1) * 10 + idx)}
                style={{
                  minHeight: "120px",
                  minWidth: "120px",
                  height: "22vw",
                  width: "22vw",
                  maxHeight: "260px",
                  maxWidth: "260px",
                  ...(window.innerWidth < 640
                    ? {
                        height: "36vw",
                        width: "36vw",
                        maxHeight: "160px",
                        maxWidth: "160px",
                      }
                    : {}),
                  ...(window.innerWidth >= 1024
                    ? {
                        height: "180px",
                        width: "180px",
                        maxHeight: "320px",
                        maxWidth: "320px",
                      }
                    : {}),
                }}
              >
                <img
                  src={`/style_quiz/${img}`}
                  alt={`Style option ${(step - 1) * 10 + idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {selectedImages.includes((step - 1) * 10 + idx) && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <Button
            onClick={handleNext}
            className="text-xl px-10 py-6 h-auto bg-black text-white hover:bg-gray-800 rounded-none mt-2"
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
