import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import BrandContentCollage from "@/components/BrandContentCollage";

const WishlistPage = () => {
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    if (!user) {
      setShowSignInPopup(true);
    }

    if (user) {
      const savedLikedBrands = JSON.parse(
        localStorage.getItem("likedBrands") || "[]"
      );
      setLikedBrands(savedLikedBrands);
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-8 ml-48">
        <div className="max-w-6xl mx-auto">
          <div className={`${!isLoggedIn ? "blur-sm" : ""}`}>
            <h1
              className="text-5xl font-black text-center mb-2 text-zinc-950"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              WISHLIST
            </h1>
            <span
              className="block text-lg text-black font-black mb-8 text-center"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              YOUR FAVORITE PIECES
            </span>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
              !isLoggedIn ? "blur-sm" : ""
            }`}
          >
            {likedBrands.map((brand) => (
              <div key={brand} className="w-full">
                <BrandContentCollage brandName={brand} />
              </div>
            ))}
            {likedBrands.length === 0 && isLoggedIn && (
              <div className="col-span-full text-center text-gray-500 py-12">
                No liked brands yet. Start exploring to add some!
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {!isLoggedIn && showSignInPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-y-0 right-0 left-48 flex items-center justify-center z-50"
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSignInPopup(false)}
              />
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                className="relative z-10 bg-white rounded-xl p-8 max-w-sm w-full mx-4"
              >
                <h2 className="text-3xl font-black text-center mb-6">
                  Sign In Now
                </h2>
                <Button
                  onClick={() => {
                    setShowSignInPopup(false);
                    navigate("/signin");
                  }}
                  className="w-full bg-black hover:bg-gray-900 text-white text-lg py-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  Sign In
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;
