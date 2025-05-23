import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

// Get the quiz images from the public/style_quiz folder
const quizImages = [
  "Grunge 2.jpg",
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
  "Luxary Street.jpg",
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
      image.loading = "eager";
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
    if (step === 1) {
      setStep(2);
    } else {
      localStorage.setItem("quizSelections", JSON.stringify(selectedImages));
      navigate("/recommendations");
    }
  };

  // Show 10 images per step, responsive grid
  const imagesToShow =
    step === 1 ? quizImages.slice(0, 10) : quizImages.slice(10, 20);

  return (
    <div className="min-h-screen w-full bg-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center w-full px-4 justify-start ml-48">
        <header className="w-full py-8 px-4 flex flex-col items-center justify-center">
          <h1
            className="text-7xl font-semibold text-black text-center w-full max-w-4xl mx-auto mb-4"
            style={{ fontFamily: "Arial Black, Kanit, sans-serif" }}
          >
            WHO ARE YOU?
          </h1>
          <p
            className="text-2xl text-black text-center mb-8 font-light"
            style={{ fontFamily: "Arial Black, Kanit, sans-serif" }}
          >
            SELECT FROM THE FOLLOWING
          </p>
        </header>
        <main className="flex-1 flex flex-col items-center w-full px-4 justify-start">
          <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full mb-6 sm:mb-8 place-items-center">
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
                    minHeight: "100px",
                    minWidth: "100px",
                    height: "20vw",
                    width: "20vw",
                    maxHeight: "220px",
                    maxWidth: "220px",
                    ...(window.innerWidth < 640
                      ? {
                          height: "32vw",
                          width: "32vw",
                          maxHeight: "140px",
                          maxWidth: "140px",
                        }
                      : {}),
                    ...(window.innerWidth >= 1024
                      ? {
                          height: "160px",
                          width: "160px",
                          maxHeight: "280px",
                          maxWidth: "280px",
                        }
                      : {}),
                  }}
                >
                  <img
                    src={`/style_quiz/${img}`}
                    alt={`Style option ${(step - 1) * 10 + idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
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
              className="text-2xl px-12 py-6 h-auto bg-black text-white hover:bg-gray-800 rounded-none mt-8 font-semibold tracking-wide"
              style={{ fontFamily: "Arial Black, Kanit, sans-serif" }}
            >
              NEXT
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizPage;
