import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, X } from "lucide-react";
import { brands } from "@/data/brands";

// Reuse the same genre colors from DropTracker for consistency
const genreColors = {
  HYPEBEAST: {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  MINIMALIST: {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  GOTH: {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  VINTAGE: {
    bg: "bg-blue-200",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  LUXURY: {
    bg: "bg-blue-200",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  ATHLETIC: {
    bg: "bg-green-200",
    text: "text-green-800",
    border: "border-green-300",
  },
  STREET: {
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
  },
  STREETWEAR: {
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
  },
  DESIGNER: {
    bg: "bg-blue-200",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  AVANT: {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  ESSENTIALS: {
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
  },
  CORE: {
    bg: "bg-red-200",
    text: "text-red-800",
    border: "border-red-300",
  },
  PUNK: {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  GRUNGE: {
    bg: "bg-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
};

// At the top, get all quiz images
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

const SwiperPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (finished) return;
      if (e.key === "ArrowRight") handleSwipe("right");
      if (e.key === "ArrowLeft") handleSwipe("left");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, finished]);

  useEffect(() => {
    if (currentIndex === 3) {
      setShowPopup(true);
      const timeout = setTimeout(() => setShowPopup(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  useEffect(() => {
    // Preload all swiper images
    quizImages.forEach((img) => {
      const image = new window.Image();
      image.src = `/style_quiz/${img}`;
    });
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    if (finished) return;
    const currentImg = quizImages[currentIndex];
    if (direction === "right") {
      setLikedImages((prev) => [...prev, currentImg]);
    }
    if (currentIndex + 1 >= quizImages.length) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex min-h-screen font-kanit">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-48 p-8 bg-white overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-transparent bg-clip-text">
            Discover Your Style
          </h1>
          <p className="text-lg text-center mb-8 text-gray-600">
            we're learning from what you like!
          </p>

          <div className="mb-8 w-full flex flex-col items-center">
            {!finished ? (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
                  Swipe right for styles you like, left for those you don't
                </h2>
                <div
                  className="relative w-full flex flex-col items-center justify-center"
                  style={{ minHeight: 0 }}
                >
                  <AnimatePresence>
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-2xl h-[60vw] min-h-[350px] max-h-[700px] flex items-center justify-center"
                    >
                      <img
                        src={`/style_quiz/${quizImages[currentIndex]}`}
                        alt={`Style option ${currentIndex + 1}`}
                        className="rounded-2xl shadow-lg w-full h-full object-cover mx-auto"
                        style={{ aspectRatio: "3/4" }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex gap-4 z-10 mt-6">
                    <button
                      onClick={() => handleSwipe("left")}
                      className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-6 h-6 text-red-500" />
                    </button>
                    <button
                      onClick={() => handleSwipe("right")}
                      className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="w-6 h-6 text-green-500" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center mb-12 w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Come back later for more fashion items!
                </h2>
              </div>
            )}
          </div>

          {likedImages.length > 0 && (
            <div className="mb-12 w-full">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
                Your Liked Styles
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {likedImages.map((img, index) => (
                  <motion.div
                    key={img}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <img
                      src={`/style_quiz/${img}`}
                      alt={`Liked style ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://source.unsplash.com/random/300x300?fashion,${index}`;
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const StyleCard = ({
  styleIndex,
  onSwipe: _onSwipe,
}: {
  styleIndex: number;
  onSwipe: (direction: string) => void;
}) => {
  return (
    <motion.div
      className="absolute w-72 bg-white rounded-xl shadow-xl overflow-hidden"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = offset.x;
        if (Math.abs(swipe) > 100) {
          _onSwipe(swipe > 0 ? "right" : "left");
        }
      }}
    >
      <img
        src={`/style_quiz/style${styleIndex}.jpg`}
        alt={`Style ${styleIndex}`}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default SwiperPage;
