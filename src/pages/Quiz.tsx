import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Quiz = () => {
  const navigate = useNavigate();
  const [quizImages, setQuizImages] = useState<string[]>([]);
  const [page, setPage] = useState(1); // 1 or 2

  // On mount, pick 20 random images from 24
  useEffect(() => {
    const allImages = Array.from({ length: 24 }, (_, i) => `${i + 1}.jpg`);
    const shuffled = allImages.sort(() => 0.5 - Math.random());
    setQuizImages(shuffled.slice(0, 20));
  }, []);

  return (
    <div className="min-h-screen bg-white font-kanit flex flex-col">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center w-full px-2 sm:px-6 pt-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black text-center mb-2 mt-2 w-full">
          WHO ARE YOU?
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8 w-full">
          select from the following
        </p>
        <div className="w-full max-w-3xl flex flex-col items-center">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 w-full mb-8">
            {quizImages.slice((page - 1) * 10, page * 10).map((img, idx) => (
              <div
                key={img}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center"
              >
                <img
                  src={`/style_quiz/${img}`}
                  alt={`Style option ${(page - 1) * 10 + idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-gray-700 text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-800 transition"
            onClick={() => {
              if (page === 1) setPage(2);
              else navigate("/recommendations");
            }}
          >
            {page === 1 ? "Next" : "See Your Recommendations"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Quiz;
