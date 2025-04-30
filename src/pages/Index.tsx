import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import BrandSearchBar from "@/components/BrandSearchBar";
import TallyEmailWidget from "@/components/TallyEmailWidget";
import Sidebar, { useSidebar } from "@/components/Sidebar";
import BrandContentCollage from "@/components/BrandContentCollage";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import InstagramModal from "@/components/InstagramModal";

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
  const [likedBrands, setLikedBrands] = useState<string[]>(() => {
    const saved = localStorage.getItem("likedBrands");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBrandSelect = (brandName: string) => {
    navigate(`/gallery?brand=${brandName}`);
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
    <div className="flex min-h-screen font-kanit">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-48 bg-white overflow-y-auto transition-all duration-300"
      >
        <div className="w-full px-4">
          <h1 className="font-kanit font-extrabold tracking-tighter text-center mb-6 text-black text-4xl">
            FASHION:WEEK
          </h1>

          <div className="flex justify-center mb-6">
            <Button
              onClick={handleDiscoverStyle}
              className="bg-black text-white hover:bg-gray-800 font-bold text-lg"
            >
              Discover Your Style
            </Button>
          </div>

          <div className="mb-4">
            <BrandSearchBar
              onSearch={handleSearch}
              onSelectBrand={handleBrandSelect}
            />
          </div>

          <div className="space-y-24 mb-8">
            {brands.map((brand) => (
              <div key={brand} className="w-full relative">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-3">
                    <h2
                      className="text-2xl font-bold cursor-pointer hover:text-gray-600 transition-colors"
                      onClick={() => handleBrandClick(brand)}
                    >
                      {brand}
                    </h2>
                    <button
                      onClick={() => toggleLike(brand)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Heart
                        className={`h-6 w-6 ${
                          likedBrands.includes(brand)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  <BrandContentCollage brandName={brand} />
                </div>
              </div>
            ))}
          </div>

          <TallyEmailWidget />
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedBrand && (
          <InstagramModal
            brandName={selectedBrand}
            onClose={() => setSelectedBrand(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
