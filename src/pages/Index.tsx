import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import BrandSearchBar from "@/components/BrandSearchBar";
import Sidebar, { useSidebar } from "@/components/Sidebar";
import BrandContentCollage from "@/components/BrandContentCollage";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import InstagramModal from "@/components/InstagramModal";
import Marquee from "react-fast-marquee";
import WaitlistPopup from "@/components/WaitlistPopup";

const brands = [
  "badson.us",
  "brotherlylove",
  "eraworldwideclub",
  "outlw.usa",
  "derschutze_clo",
  "thegvgallery",
  "haveyoudiedbefore",
  "poolhousenewyork",
  "nomaintenance",
  "california.arts",
  "drolandmiller",
];

const Index = () => {
  const { collapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [showTimedSignUpPopup, setShowTimedSignUpPopup] = useState(false);
  const [showTimedQuizPopup, setShowTimedQuizPopup] = useState(false);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const brandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBrandSelect = (brandName: string) => {
    const cleanBrandName = brandName.replace("@", "");
    navigate(`/gallery?brand=${cleanBrandName}`);
  };

  const handleDiscoverStyle = () => {
    navigate("/quiz");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get("brand");
    if (brandParam) {
      handleBrandSelect(brandParam);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = brandRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            setCurrentBrandIndex(index);

            // Show sign in popup when reaching @eraworldwideclub
            if (
              brands[index] === "eraworldwideclub" &&
              !localStorage.getItem("user")
            ) {
              setShowSignInPopup(true);
            }

            // Show quiz popup when reaching @thegvgallery
            if (brands[index] === "thegvgallery") {
              setShowQuizPopup(true);
            }
          }
        });
      },
      {
        threshold: [0.1, 0.5, 0.8], // Multiple thresholds for smoother detection
        rootMargin: "-10% 0px", // Smaller margin for more precise snapping
      }
    );

    brandRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      const timer = setTimeout(() => {
        setShowTimedSignUpPopup(true);
      }, 16000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimedQuizPopup(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (brandName: string) => {
    setLikedBrands((prev) => {
      const newLikedBrands = prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName];

      localStorage.setItem("likedBrands", JSON.stringify(newLikedBrands));

      if (newLikedBrands.includes(brandName)) {
        toast.success(`Added ${brandName} to liked brands`);
      } else {
        toast.success(`Removed ${brandName} from liked brands`);
      }

      return newLikedBrands;
    });
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-48 overflow-x-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-12">
            <h1
              className="text-4xl sm:text-5xl font-black text-black"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              FASHION:WEEK
            </h1>
          </div>

          <div className="mb-8">
            <BrandSearchBar
              onSearch={handleSearch}
              onSelectBrand={handleBrandSelect}
            />
          </div>

          <div className="mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
            <Marquee
              speed={50}
              gradient={false}
              className="py-2 bg-black text-white overflow-hidden"
            >
              <div
                className="flex gap-6 mx-4 text-xs sm:text-sm md:text-base font-black text-white"
                style={{ fontFamily: "Arial Black, sans-serif" }}
              >
                <span className="text-white">STREETWEAR</span>
                <span className="text-white">•</span>
                <span className="text-white">PUNK</span>
                <span className="text-white">•</span>
                <span className="text-white">ESSENTIALS</span>
                <span className="text-white">•</span>
                <span className="text-white">LUXURY</span>
                <span className="text-white">•</span>
                <span className="text-white">VINTAGE</span>
                <span className="text-white">•</span>
                <span className="text-white">MINIMALISTIC</span>
                <span className="text-white">•</span>
                <span className="text-white">CRAZY EXPERIMENTAL</span>
                <span className="text-white">•</span>
                <span className="text-white">Y2K</span>
                <span className="text-white">•</span>
                <span className="text-white">JEWELERY</span>
                <span className="text-white">•</span>
                <span className="text-white">TECHWEAR</span>
                <span className="text-white">•</span>
                <span className="text-white">STREET</span>
              </div>
            </Marquee>
          </div>

          <div className="w-full mb-8">
            <div className="border-2 border-black py-3 sm:py-4">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.15em] text-center"
                style={{ fontFamily: "Arial Black, Kanit, sans-serif" }}
              >
                FEATURED&nbsp;&nbsp;BRANDS
              </h2>
            </div>
          </div>

          <div className="relative h-[calc(100vh-200px)] overflow-y-auto snap-y snap-mandatory">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                ref={(el) => (brandRefs.current[index] = el)}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentBrandIndex === index ? 1 : 0.3,
                  scale: currentBrandIndex === index ? 1 : 0.95,
                }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                  mass: 0.8,
                }}
                className="h-full w-full snap-start snap-always"
              >
                <div className="w-full h-full border border-black p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg bg-white">
                  <motion.div
                    className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: currentBrandIndex === index ? 1 : 0.5,
                      x: 0,
                    }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 100,
                      delay: 0.2,
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <h2
                        className="text-lg sm:text-xl md:text-2xl font-black cursor-pointer hover:text-gray-600 transition-colors"
                        style={{ fontFamily: "Arial Black, sans-serif" }}
                        onClick={() => handleBrandClick(brand)}
                      >
                        @{brand}
                      </h2>
                      <button
                        onClick={() => toggleLike(brand)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Heart
                          className={`h-5 w-5 sm:h-6 sm:w-6 ${
                            likedBrands.includes(brand)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    className="h-[calc(100%-80px)] overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: currentBrandIndex === index ? 1 : 0.3,
                      scale: currentBrandIndex === index ? 1 : 0.95,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1,
                    }}
                  >
                    <BrandContentCollage
                      brandName={brand}
                      onSelectBrand={handleBrandClick}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showSignInPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 left-48 flex items-center justify-center z-50"
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
                className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
              >
                <h2 className="text-2xl font-bold text-center mb-6">
                  Sign in to see more
                </h2>
                <Button
                  onClick={() => {
                    setShowSignInPopup(false);
                    navigate("/signin");
                  }}
                  className="w-full bg-black hover:bg-gray-800 text-white text-xl py-6 rounded-xl shadow-xl transform transition-all duration-200 hover:scale-105"
                >
                  Sign In
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showQuizPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 left-48 flex items-center justify-center z-50"
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowQuizPopup(false)}
              />
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                className="relative z-10 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-black"
              >
                <div className="absolute -top-3 -right-3">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-4">
                  Take Our Style Quiz!
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Discover brands that match your unique style preferences
                </p>
                <Button
                  onClick={() => {
                    setShowQuizPopup(false);
                    navigate("/quiz");
                  }}
                  className="w-full bg-black hover:bg-gray-800 text-white text-xl py-6 rounded-xl shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                >
                  Take the Quiz
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedBrand && (
            <InstagramModal
              brandName={selectedBrand}
              onClose={() => setSelectedBrand(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTimedSignUpPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 left-48 flex items-center justify-center z-50"
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTimedSignUpPopup(false)}
              />
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                className="relative z-10 bg-white rounded-xl p-8 max-w-sm w-full mx-4"
              >
                <h2 className="text-3xl font-black text-center mb-6">
                  Sign In
                </h2>
                <Button
                  onClick={() => {
                    setShowTimedSignUpPopup(false);
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

        <AnimatePresence>
          {showTimedQuizPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center -translate-x-8 z-50"
              onClick={() => setShowTimedQuizPopup(false)}
            >
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute -top-3 -right-3">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </div>
                <h2
                  className="text-3xl font-black text-center mb-4"
                  style={{ fontFamily: "Arial Black, sans-serif" }}
                >
                  DISCOVER YOUR STYLE
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Take our style quiz to find brands that match your unique
                  taste
                </p>
                <Button
                  onClick={() => {
                    setShowTimedQuizPopup(false);
                    navigate("/quiz");
                  }}
                  className="w-full bg-black hover:bg-gray-800 text-white text-xl py-6 rounded-xl shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl whitespace-nowrap"
                >
                  SIGN IN
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;
