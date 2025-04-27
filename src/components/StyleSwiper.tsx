import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";

interface StyleSwiperProps {
  onComplete: () => void;
  onLike: (image: string) => void;
}

const StyleSwiper = ({ onComplete, onLike }: StyleSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load 24 images from /public/style_quiz/
  useEffect(() => {
    // If your images are named 1.jpg, 2.jpg, ..., 24.jpg, update as needed
    const imageList = Array.from({ length: 24 }, (_, i) => `${i + 1}.jpg`);
    setImages(imageList);
  }, []);

  // Keyboard navigation (left/right arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompleted) return;
      if (e.key === "ArrowLeft") handleSwipe(false);
      if (e.key === "ArrowRight") handleSwipe(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images, isCompleted]);

  // Touch/swipe navigation for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      if (isCompleted) return;
      if (touchEndX - touchStartX > 50) handleSwipe(false); // swipe right to left = dislike
      if (touchStartX - touchEndX > 50) handleSwipe(true); // swipe left to right = like
    };
    const container = document.getElementById("style-swiper-container");
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentIndex, images, isCompleted]);

  const handleSwipe = (liked: boolean) => {
    if (liked) {
      onLike(images[currentIndex]);
    }

    setDirection(liked ? 1 : -1);

    if (currentIndex === images.length - 1) {
      setIsCompleted(true);
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Style Quiz Complete!</h2>
        <p className="text-gray-600 text-center">
          Check out your liked styles in the gallery above.
        </p>
      </div>
    );
  }

  return (
    <div
      id="style-swiper-container"
      className="relative h-[600px] bg-gray-50 rounded-lg overflow-hidden touch-pan-x select-none"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex items-center justify-center p-4"
        >
          {images[currentIndex] && (
            <div className="relative w-full h-full max-w-2xl mx-auto">
              <img
                src={`/style_quiz/${images[currentIndex]}`}
                alt={`Style ${currentIndex + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
        <Button
          onClick={() => handleSwipe(false)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          onClick={() => handleSwipe(true)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4"
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );
};

export default StyleSwiper;
