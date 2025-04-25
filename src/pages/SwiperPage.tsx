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

const SwiperPage = () => {
  const navigate = useNavigate();
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [likedStyles, setLikedStyles] = useState<string[]>(() => {
    const saved = localStorage.getItem("likedStyles");
    return saved ? JSON.parse(saved) : [];
  });

  // Check if quiz is completed on mount
  useEffect(() => {
    const completed = localStorage.getItem("hasCompletedQuiz");
    if (completed === "true") {
      setHasCompletedQuiz(true);
    }
  }, []);

  const handleSwipe = (direction: string) => {
    if (direction === "right") {
      const currentStyle = `style${currentStyleIndex + 1}.jpg`;
      setLikedStyles((prev) => {
        const newLikedStyles = [...prev, currentStyle];
        localStorage.setItem("likedStyles", JSON.stringify(newLikedStyles));
        return newLikedStyles;
      });
    }

    if (currentStyleIndex + 1 >= 10) {
      // Assuming we have 10 style images
      localStorage.setItem("hasCompletedQuiz", "true");
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } else {
      setCurrentStyleIndex((prev) => prev + 1);
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
        className="flex-1 p-8 bg-white overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-transparent bg-clip-text">
            Discover Your Style
          </h1>

          {hasCompletedQuiz ? (
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                New Pictures Coming Soon!
              </h2>
              <p className="text-gray-600">
                Check back later for more styles to discover.
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
                Swipe right for styles you like, left for those you don't
              </h2>

              <div className="relative h-96 flex items-center justify-center">
                <AnimatePresence>
                  {currentStyleIndex < 10 && (
                    <StyleCard
                      key={currentStyleIndex}
                      styleIndex={currentStyleIndex + 1}
                      onSwipe={handleSwipe}
                    />
                  )}
                </AnimatePresence>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
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
            </div>
          )}

          {likedStyles.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
                Your Liked Styles
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {likedStyles.map((style, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <img
                      src={`/style_quiz/${style}`}
                      alt={`Liked style ${index + 1}`}
                      className="w-full h-full object-cover"
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
  onSwipe,
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
          onSwipe(swipe > 0 ? "right" : "left");
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
