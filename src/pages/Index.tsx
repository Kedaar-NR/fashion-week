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
import { brands as allBrandsData } from "@/data/brands";

const brands = [
  "friedrice_nyc",
  "eternal_artwear",
  "profitminded.clo",
  "nihil.ny",
  "emptyspaces",
  "chxmicalover",
  "fnkstudios",
  "concrete_orchids",
  "kinejkt",
  "liquidlagoon",
  "sixshooter.us",
  "cozy.worldwidee",
  "aliasonline.us",
  "allure.newyork",
  "misanthropestudios",
  "fine.culture",
  "corporateworld",
  "omneeworld",
  "awaitedmilitia",
  "vengeance_studios",
  "menacelosangeles",
  "ditch",
  "vega9602k",
  "peaceandwar89",
  "idle____time",
  "oedemaa",
  "sensorydept",
  "ArtificialFever",
  "demiknj",
  "berlinc.co",
  "ssstufff.official",
  "22kilogram",
  "chinatowncountryclub",
  "bomiworks",
  "forevakaash",
  "fortytwoco",
  "winterhouse__",
  "Mutimer.co",
  "shineluxurystudios",
  "personalfears",
  "attachmentsonline",
  "__heavencanwait__",
  "pdf.channel",
  "rangercartel",
  "lildenimjean",
  "shmuie",
  "vicinity_de",
  "lantiki_official",
  "youngchickenpox",
  "maharishi",
  "fourfour.jpg",
  "bykodyphillips",
  "heavenonearthstudios",
  "eternalloveworld",
  "kontend__",
  "hypedept.co",
  "roypubliclabel",
  "hidden.season",
  "stolenarts_",
  "qbsay",
  "iconaclub",
  "saeminium",
  "srrysora",
  "alreadywritten",
  "insain.worldwide",
  "rdvstudios",
  "cyvist",
  "slovakiandreams",
  "deadatlantic",
  "emestudios_",
  "angel333online",
  "byjeshal",
  "paradoxeparis",
  "kyonijr",
  "sundae.school",
  "astonecoldstudiosproduction",
  "somar.us",
  "2001odysey",
  "ihp.ihp.ihp",
  "forcesunseen",
  "blanksbythirteen",
  "throneroomx",
  "septemberseventhstudios",
  "badson.us",
  "brotherlylove",
  "california.arts",
  "derschutze_clo",
  "drolandmiller",
  "eraworldwideclub",
  "haveyoudiedbefore",
  "nomaintenance",
  "outlw.usa",
  "poolhousenewyork",
  "thegvgallery",
];

// Shuffle brands on every reload
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getUserInterestGenres(likedBrands: string[]): string[] {
  // Find genres for liked brands
  const genreSet = new Set<string>();
  for (const brand of allBrandsData) {
    if (likedBrands.includes(brand.name)) {
      if (brand.genre) {
        brand.genre
          .split("/")
          .forEach((g) => genreSet.add(g.trim().toUpperCase()));
      }
    }
  }
  return Array.from(genreSet);
}

function getPersonalizedBrands(likedBrands: string[]): string[] {
  const interestGenres = getUserInterestGenres(likedBrands);
  if (interestGenres.length === 0) return shuffleArray(brands);
  // Find brands matching any interest genre
  const matching: string[] = [];
  const rest: string[] = [];
  for (const brand of allBrandsData) {
    if (brand.genre) {
      const brandGenres = brand.genre
        .split("/")
        .map((g) => g.trim().toUpperCase());
      if (brandGenres.some((g) => interestGenres.includes(g))) {
        matching.push(brand.name);
      } else {
        rest.push(brand.name);
      }
    } else {
      rest.push(brand.name);
    }
  }
  return [...shuffleArray(matching), ...shuffleArray(rest)];
}

const Index = () => {
  const { collapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [showTimedQuizPopup, setShowTimedQuizPopup] = useState(false);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const collageContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showScrollPopup, setShowScrollPopup] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  const [shuffledBrands, setShuffledBrands] = useState(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedBrands") || "[]");
    return getPersonalizedBrands(storedLikes);
  });

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
    // Re-personalize on mount in case likes changed in another tab
    const storedLikes = JSON.parse(localStorage.getItem("likedBrands") || "[]");
    setShuffledBrands(getPersonalizedBrands(storedLikes));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setCurrentBrandIndex((prev) =>
          Math.min(prev + 1, shuffledBrands.length - 1)
        );
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setCurrentBrandIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Swipe and wheel navigation for mobile/tablet/trackpad
  useEffect(() => {
    const container = collageContainerRef.current;
    if (!container) return;
    let startY = 0;
    let endY = 0;
    let lastWheelTime = 0;
    const WHEEL_DEBOUNCE = 400; // ms
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      endY = e.changedTouches[0].clientY;
      const deltaY = endY - startY;
      if (Math.abs(deltaY) > 40) {
        if (deltaY < 0) {
          setCurrentBrandIndex((prev) =>
            Math.min(prev + 1, shuffledBrands.length - 1)
          );
        } else {
          setCurrentBrandIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheelTime < WHEEL_DEBOUNCE) return;
      if (e.deltaY > 30) {
        setCurrentBrandIndex((prev) =>
          Math.min(prev + 1, shuffledBrands.length - 1)
        );
        lastWheelTime = now;
      } else if (e.deltaY < -30) {
        setCurrentBrandIndex((prev) => Math.max(prev - 1, 0));
        lastWheelTime = now;
      }
    };
    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("wheel", onWheel);
    };
  }, [shuffledBrands.length]);

  useEffect(() => {
    if (scrollCount > 0 && scrollCount % 6 === 0) {
      setShowSignInPopup(true);
      setShowQuizPopup(true);
    }
  }, [scrollCount]);

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

  // Hide popup on scroll/swipe/wheel/arrow
  useEffect(() => {
    if (!showScrollPopup) return;
    const handleScroll = () => {
      setShowScrollPopup(false);
      setHasScrolled(true);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key))
        handleScroll();
    };
    const container = collageContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: true });
      container.addEventListener("touchstart", handleScroll, { passive: true });
    }
    window.addEventListener("keydown", handleKey);
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
        container.removeEventListener("touchstart", handleScroll);
      }
      window.removeEventListener("keydown", handleKey);
    };
  }, [showScrollPopup]);

  // Prevent page scroll when interacting with the collage area or anywhere on the page
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    // Prevent arrow keys from scrolling the page
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventArrowScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventArrowScroll);
    };
  }, []);

  // Re-personalize when likes change
  useEffect(() => {
    setShuffledBrands(getPersonalizedBrands(likedBrands));
  }, [likedBrands]);

  return (
    <div className="flex min-h-screen h-screen bg-white overflow-hidden">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-48 flex flex-col h-screen w-full overflow-hidden items-center justify-between pt-10"
      >
        <div
          className="w-full flex flex-col items-center justify-start flex-shrink-0"
          style={{ flex: "0 0 auto" }}
        >
          <div className="text-center mb-6 w-full flex justify-center">
            <h1
              className="text-4xl sm:text-5xl font-black text-black mx-auto"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              FASHION:WEEK
            </h1>
          </div>
          <div className="mb-3 w-full flex justify-center">
            <div className="w-full max-w-6xl">
              <BrandSearchBar
                onSearch={handleSearch}
                onSelectBrand={handleBrandSelect}
              />
            </div>
          </div>
          <div className="mb-3 w-full flex justify-center">
            <div className="w-full max-w-6xl">
              <Marquee
                speed={50}
                gradient={false}
                className="py-2 bg-black text-white overflow-hidden rounded-lg"
              >
                <div
                  className="flex gap-6 mx-4 text-xs sm:text-sm md:text-base font-black text-white"
                  style={{ fontFamily: "Arial Black, Kanit, sans-serif" }}
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
          </div>
          <div className="w-full flex justify-center mb-2">
            <div className="border-2 border-black py-2 sm:py-3 w-full max-w-6xl mx-auto rounded-lg bg-white">
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.15em] text-center"
                style={{ fontFamily: "Arial Black, Kanit, sans-serif" }}
              >
                FEATURED&nbsp;&nbsp;BRANDS
              </h2>
            </div>
          </div>
        </div>

        <div
          className="relative w-full flex-1 flex items-center justify-center overflow-hidden mt-6"
          ref={collageContainerRef}
        >
          <motion.div
            key={shuffledBrands[currentBrandIndex]}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center"
          >
            <div className="w-full h-full max-h-[85vh] max-w-6xl border border-black p-3 sm:p-4 md:p-6 lg:p-8 rounded-2xl bg-white flex flex-col items-center justify-center overflow-hidden mx-auto relative">
              <motion.div
                className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
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
                    onClick={() =>
                      setSelectedBrand(shuffledBrands[currentBrandIndex])
                    }
                  >
                    @{shuffledBrands[currentBrandIndex]}
                  </h2>
                  <button
                    className="ml-2 p-1 rounded-full hover:bg-gray-100 transition"
                    onClick={() =>
                      toggleLike(shuffledBrands[currentBrandIndex])
                    }
                    aria-label={
                      likedBrands.includes(shuffledBrands[currentBrandIndex])
                        ? "Unlike brand"
                        : "Like brand"
                    }
                  >
                    <Heart
                      className={`w-7 h-7 ${
                        likedBrands.includes(shuffledBrands[currentBrandIndex])
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
              <div className="relative w-full h-full flex-1 flex items-center justify-center">
                {/* Centered scroll popup inside the collage box */}
                <AnimatePresence>
                  {showScrollPopup && !hasScrolled && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0 z-40 flex items-start justify-center pointer-events-none"
                      style={{ top: "12%" }}
                    >
                      <div
                        className="flex items-center justify-center w-full mx-auto"
                        style={{
                          fontFamily: "Arial Black, sans-serif",
                          fontSize: "2.5rem",
                          textAlign: "center",
                          letterSpacing: "0.15em",
                          color: "white",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          textShadow: "0 4px 32px rgba(0,0,0,0.7)",
                          background: "transparent",
                          borderRadius: "2rem",
                          padding: "0",
                          margin: "0",
                          userSelect: "none",
                        }}
                      >
                        <span
                          style={{
                            color: "white",
                            fontWeight: 900,
                            marginRight: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.15em",
                          }}
                        >
                          SCROLL
                        </span>
                        <span
                          style={{
                            fontSize: "2.7rem",
                            color: "white",
                            filter: "drop-shadow(0 2px 8px #000)",
                          }}
                        >
                          ↓
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  className={`w-full h-full flex items-center justify-center overflow-hidden ${
                    showScrollPopup && !hasScrolled
                      ? "filter blur-lg transition-all duration-500"
                      : "filter-none transition-all duration-500"
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <BrandContentCollage
                    brandName={
                      shuffledBrands[currentBrandIndex].toLowerCase() ===
                      "artificialfever"
                        ? "artificialfever"
                        : shuffledBrands[currentBrandIndex]
                    }
                    onSelectBrand={setSelectedBrand}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
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
                className="relative z-10 bg-white rounded-2xl shadow-2xl p-12 max-w-lg w-full mx-4 flex flex-col items-center justify-center"
              >
                <Button
                  onClick={() => {
                    setShowSignInPopup(false);
                    navigate("/signin");
                  }}
                  className="w-full bg-black hover:bg-gray-800 text-white text-2xl py-8 rounded-2xl shadow-xl transform transition-all duration-200 hover:scale-105"
                  style={{
                    fontWeight: 900,
                    fontFamily: "Arial Black, sans-serif",
                    fontSize: "2rem",
                  }}
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
          {showTimedQuizPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50"
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
                <h2
                  className="text-3xl font-black text-center mb-6"
                  style={{ fontFamily: "Arial Black, sans-serif" }}
                >
                  Sign In
                </h2>
                <Button
                  onClick={() => {
                    setShowTimedQuizPopup(false);
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
      </motion.div>
    </div>
  );
};

export default Index;
