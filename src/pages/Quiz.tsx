import { useState } from "react";
import { motion } from "framer-motion";
import StyleSwiper from "@/components/StyleSwiper";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Quiz = () => {
  const navigate = useNavigate();
  const [likedStyles, setLikedStyles] = useState<string[]>([]);

  const handleLike = (image: string) => {
    setLikedStyles((prev) => [...prev, image]);
    // Save to localStorage
    const savedStyles = JSON.parse(localStorage.getItem("likedStyles") || "[]");
    localStorage.setItem(
      "likedStyles",
      JSON.stringify([...savedStyles, image])
    );
  };

  const handleComplete = () => {
    setTimeout(() => {
      navigate("/"); // Return to home page after completion
    }, 2000);
  };

  return (
    <div className="flex min-h-screen font-kanit">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Discover Your Style
          </h1>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Swipe right for styles you like, left for those you don't
            </h2>
            <StyleSwiper onComplete={handleComplete} onLike={handleLike} />
          </div>

          {likedStyles.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Your Liked Styles</h3>
              <div className="grid grid-cols-4 gap-4">
                {likedStyles.map((style, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={`/src/style_quiz/${style}`}
                      alt={`Liked style ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;
