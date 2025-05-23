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
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={() => setShowSignInPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.97, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.97, y: 10, opacity: 0 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                className="bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  onClick={() => {
                    setShowSignInPopup(false);
                    navigate("/signin");
                  }}
                  className="w-full bg-black hover:bg-gray-900 text-white text-xl py-5 rounded-xl shadow-xl font-black tracking-wide"
                  style={{
                    fontFamily: "Arial Black, sans-serif",
                    fontSize: "1.5rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  SIGN IN
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
