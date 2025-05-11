
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import SignInPrompt from "@/components/SignInPrompt";

// Update genreColors to match DropTracker
const genreColors = {
  PUNK: { bg: "bg-purple-500", text: "text-white" },
  GOTH: { bg: "bg-purple-500", text: "text-white" },
  GRUNGE: { bg: "bg-purple-500", text: "text-white" },
  ESSENTIALS: { bg: "bg-blue-500", text: "text-white" },
  LUXURY: { bg: "bg-amber-400", text: "text-white" },
  VINTAGE: { bg: "bg-amber-400", text: "text-white" },
  MINIMALISTIC: { bg: "bg-gray-500", text: "text-white" },
  "CRAZY EXPERIMENTAL": { bg: "bg-pink-500", text: "text-white" },
  Y2K: { bg: "bg-violet-400", text: "text-white" },
  JEWELERY: { bg: "bg-emerald-500", text: "text-white" },
  TECHWEAR: { bg: "bg-cyan-500", text: "text-white" },
  STREET: { bg: "bg-red-500", text: "text-white" },
};

const LikedPage = () => {
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    if (!user) {
      // Show sign-in popup immediately if not logged in
      setShowSignInPopup(true);
    }

    if (user) {
      const savedLikedBrands = JSON.parse(
        localStorage.getItem("likedBrands") || "[]"
      );
      setLikedBrands(savedLikedBrands);
    } else {
      setLikedBrands([]);
    }
  }, []);

  const filteredBrands = brands.filter((brand) =>
    likedBrands.includes(brand.name)
  );

  const handleUnlike = (brandName: string) => {
    const updatedLikedBrands = likedBrands.filter((name) => name !== brandName);
    localStorage.setItem("likedBrands", JSON.stringify(updatedLikedBrands));
    setLikedBrands(updatedLikedBrands);
    toast.success(`Removed ${brandName} from liked brands`);
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  const closeInstagramView = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-8 ml-48">
        <div className="max-w-6xl mx-auto">
          <div className={`${!isLoggedIn ? "blur-md" : ""}`}>
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

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => {
                const mainGenre = brand.genre
                  ?.split("/")[0]
                  .trim()
                  .toUpperCase();
                const genreColor = genreColors[mainGenre]?.bg || "bg-gray-500";

                return (
                  <div
                    key={brand.name}
                    className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                      !isLoggedIn ? "blur-md" : ""
                    }`}
                  >
                    <div
                      className={`p-4 border-b flex items-center justify-between gap-2 ${genreColor}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage
                            src={`/profile_pics/${brand.name
                              .replace("@", "")
                              .toLowerCase()}.jpg`}
                            alt={brand.name}
                            className="object-cover"
                            loading="eager"
                            fetchPriority="high"
                          />
                          <AvatarFallback
                            className="bg-gray-100 avatar-fallback"
                            style={{ display: "none" }}
                          >
                            {brand.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="truncate">
                          <h3
                            className={`font-bold text-white ${
                              brand.name.length > 15 ? "text-xs" : "text-sm"
                            }`}
                          >
                            {brand.name}
                          </h3>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnlike(brand.name);
                        }}
                        className="p-1.5 hover:bg-white/10 rounded-full flex-shrink-0"
                      >
                        <Heart className="h-5 w-5 fill-white text-white" />
                      </button>
                    </div>

                    <div className="h-[400px] overflow-hidden">
                      <iframe
                        src={`https://www.instagram.com/${brand.name.replace(
                          "@",
                          ""
                        )}/embed`}
                        className="w-full h-full border-none scale-[1.02]"
                        title={`${brand.name} Instagram Feed`}
                        loading="lazy"
                        onLoad={(e) => {
                          const iframe = e.target as HTMLIFrameElement;
                          iframe.style.opacity = "1";
                        }}
                        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                      />
                    </div>

                    <div className="px-3 py-1.5">
                      <div className="flex gap-2 justify-center">
                        {brand.genre?.split("/").map((genre, idx) => {
                          const genreKey = genre.trim().toUpperCase();
                          return (
                            <Badge
                              key={idx}
                              className={`px-2.5 py-1 text-xs font-medium ${
                                genreColors[genreKey]?.bg || "bg-gray-500"
                              } ${genreColors[genreKey]?.text || "text-white"}`}
                            >
                              {genre.trim()}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <AnimatePresence>
              {!isLoggedIn && showSignInPopup && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
                    className="bg-white rounded-xl p-8 flex flex-col items-center max-w-sm mx-4"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Sign In
                    </h2>
                    <Link
                      to="/signin"
                      className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                      Sign in
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {selectedBrand && (
            <div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
              onClick={closeInstagramView}
            >
              <div
                className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{selectedBrand}</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUnlike(selectedBrand)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                    <button
                      onClick={closeInstagramView}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden aspect-square w-full">
                  <iframe
                    src={`https://www.instagram.com/${selectedBrand.replace(
                      "@",
                      ""
                    )}/embed`}
                    className="w-full h-full border-none scale-[1.02]"
                    title={`${selectedBrand} Instagram Feed`}
                    loading="eager"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedPage;
