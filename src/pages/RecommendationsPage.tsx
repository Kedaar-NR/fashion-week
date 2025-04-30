import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/brands";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import InstagramModal from "@/components/InstagramModal";

const getRandomBrands = (count: number) => {
  const shuffled = [...brands].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

interface StyleTag {
  name: string;
  color: string;
  textColor: string;
}

const RecommendationsPage = () => {
  const [recommendedBrands, setRecommendedBrands] = useState<typeof brands>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const navigate = useNavigate();

  const styleTags: Record<string, StyleTag> = {
    punk: {
      name: "PUNK",
      color: "bg-pink-500",
      textColor: "text-white",
    },
    street: {
      name: "STREETWEAR",
      color: "bg-red-500",
      textColor: "text-white",
    },
    basic: {
      name: "BASIC",
      color: "bg-blue-500",
      textColor: "text-white",
    },
    luxury: {
      name: "LUXURY",
      color: "bg-yellow-500",
      textColor: "text-black",
    },
    y2k: {
      name: "Y2K",
      color: "bg-purple-500",
      textColor: "text-white",
    },
    essentials: {
      name: "ESSENTIALS",
      color: "bg-green-500",
      textColor: "text-white",
    },
    vintage: {
      name: "VINTAGE",
      color: "bg-orange-500",
      textColor: "text-white",
    },
    minimalist: {
      name: "MINIMALIST",
      color: "bg-gray-500",
      textColor: "text-white",
    },
    gorpcore: {
      name: "GORPCORE",
      color: "bg-emerald-500",
      textColor: "text-white",
    },
    grunge: {
      name: "GRUNGE",
      color: "bg-purple-600",
      textColor: "text-white",
    },
    cowboy: {
      name: "COWBOY",
      color: "bg-amber-500",
      textColor: "text-white",
    },
  };

  const getBrandTags = (brand: (typeof brands)[0]) => {
    if (!brand.genre) return [];
    const genreLower = brand.genre.toLowerCase();
    const tags: StyleTag[] = [];
    if (styleTags[genreLower]) {
      tags.push(styleTags[genreLower]);
    } else {
      const allTags = Object.values(styleTags);
      tags.push(allTags[Math.floor(Math.random() * allTags.length)]);
    }
    return tags;
  };

  useEffect(() => {
    recommendedBrands.forEach((brand) => {
      const img = new Image();
      img.src = `https://placeholder.pics/svg/300x300/DEDEDE/555555/${brand.name}`;
    });
  }, [recommendedBrands]);

  useEffect(() => {
    try {
      const randomBrands = getRandomBrands(3);
      setRecommendedBrands(randomBrands);

      localStorage.setItem(
        "recommendedBrands",
        JSON.stringify(randomBrands.map((b) => b.name))
      );

      const existingLikedBrands = JSON.parse(
        localStorage.getItem("likedBrands") || "[]"
      );
      const brandNames = randomBrands.map((brand) => brand.name);

      const newLikedBrands = [
        ...new Set([...existingLikedBrands, ...brandNames]),
      ];
      localStorage.setItem("likedBrands", JSON.stringify(newLikedBrands));
    } catch (error) {
      console.error("Error setting up recommendations:", error);
    }
  }, []);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-white"
    >
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-white">
        <h1 className="text-5xl font-bold text-center mb-12 text-zinc-950">
          CURATED FOR YOU:
          <span className="block text-lg text-gray-500 mt-2">
            (Click on brands to see their Instagram)
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {recommendedBrands.map((brand, index) => {
            const cleanName = brand.name.replace("@", "");
            return (
              <motion.div
                key={index}
                initial={{
                  y: 50,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: index * 0.2,
                }}
                className="flex flex-col"
              >
                <div
                  className="rounded-xl p-3 overflow-hidden bg-gray-900 cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => handleBrandClick(cleanName)}
                >
                  <div className="flex flex-col items-center justify-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-gray-800 flex items-center justify-center">
                      <img
                        src={`/profile_pics/${cleanName}.jpg`}
                        alt={brand.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = document.createElement("span");
                          fallback.className = "font-bold text-white text-xl";
                          fallback.textContent = brand.name
                            .charAt(0)
                            .toUpperCase();
                          e.currentTarget.parentElement?.appendChild(fallback);
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <h2 className="text-xl font-semibold text-white">
                        @{cleanName}
                      </h2>
                      <div className="flex flex-wrap gap-1 mt-2 justify-center">
                        {brand.genre?.split("/").map((genre, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="text-white border-white/20"
                          >
                            {genre.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Button
          onClick={() => navigate("/home")}
          className="bg-black text-white hover:bg-gray-800 font-bold text-lg"
        >
          Explore More Brands
        </Button>
      </div>

      <AnimatePresence>
        {selectedBrand && (
          <InstagramModal
            brandName={selectedBrand}
            onClose={() => setSelectedBrand(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecommendationsPage;
