import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { brands, genreColors } from "@/data/brands";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import InstagramModal from "@/components/InstagramModal";
import Sidebar from "@/components/Sidebar";

const getRecommendedBrands = (selectedStyles: number[]) => {
  // Map quiz images to genres
  const styleToGenre: Record<string, string> = {
    "Grunge.png": "PUNK/GOTH/GRUNGE",
    "Grunge.jpg": "PUNK/GOTH/GRUNGE",
    "AvantStreet_LoudStreet.jpg": "STREET",
    "EuroStreet.webp": "STREET",
    "Streetwear.jpg": "STREET",
    "LuxaryStreet.jpg": "LUXURY/VINTAGE",
    "Y2K_Street.jpg": "Y2K",
    "Opium_Goth.jpg": "PUNK/GOTH/GRUNGE",
    "Gorpcore.JPG": "STREET",
    "Minimal_Comfy.JPG": "MINIMALISTIC",
    "Streetwear(1).JPG": "STREET",
    "Leather.JPG": "PUNK/GOTH/GRUNGE",
    "work_street.JPG": "STREET",
    "IMG_4959.jpg": "STREET",
    "Luxary Street.webp": "LUXURY/VINTAGE",
    "Japanese_Punk.jpg": "PUNK/GOTH/GRUNGE",
    "Emo_Opium_Goth.jpg": "PUNK/GOTH/GRUNGE",
    "Vintage.jpg": "LUXURY/VINTAGE",
    "Minimalist.jpg": "MINIMALISTIC",
    "Workwear.jpg": "STREET",
  };

  // Get the quiz images array
  const quizImages = [
    "Grunge.png",
    "Grunge.jpg",
    "AvantStreet_LoudStreet.jpg",
    "EuroStreet.webp",
    "Streetwear.jpg",
    "LuxaryStreet.jpg",
    "Y2K_Street.jpg",
    "Opium_Goth.jpg",
    "Gorpcore.JPG",
    "Minimal_Comfy.JPG",
    "Streetwear(1).JPG",
    "Leather.JPG",
    "work_street.JPG",
    "IMG_4959.jpg",
    "Luxary Street.webp",
    "Japanese_Punk.jpg",
    "Emo_Opium_Goth.jpg",
    "Vintage.jpg",
    "Minimalist.jpg",
    "Workwear.jpg",
  ];

  // Get selected genres based on quiz selections
  const selectedGenres = new Set(
    selectedStyles
      .map((index) => styleToGenre[quizImages[index]])
      .filter(Boolean)
  );

  // Filter brands by selected genres
  const matchingBrands = brands.filter(
    (brand) => brand.genre && selectedGenres.has(brand.genre)
  );

  // If we have matching brands, randomly select 3, otherwise fallback to random brands
  if (matchingBrands.length >= 3) {
    return matchingBrands.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  // Fallback to random brands if not enough matches
  return [...brands].sort(() => 0.5 - Math.random()).slice(0, 3);
};

const RecommendationsPage = () => {
  const [recommendedBrands, setRecommendedBrands] = useState<typeof brands>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Check if coming from quiz
      const quizSelectionsStr = localStorage.getItem("quizSelections");
      if (!quizSelectionsStr) {
        navigate("/quiz");
        return;
      }

      const quizSelections = JSON.parse(quizSelectionsStr);
      const recommendedBrands = getRecommendedBrands(quizSelections);
      setRecommendedBrands(recommendedBrands);

      // Store recommendations
      localStorage.setItem(
        "recommendedBrands",
        JSON.stringify(recommendedBrands.map((b) => b.name))
      );

      // Add to liked brands
      const existingLikedBrands = JSON.parse(
        localStorage.getItem("likedBrands") || "[]"
      );
      const brandNames = recommendedBrands.map((brand) => brand.name);
      const newLikedBrands = [
        ...new Set([...existingLikedBrands, ...brandNames]),
      ];
      localStorage.setItem("likedBrands", JSON.stringify(newLikedBrands));
    } catch (error) {
      console.error("Error setting up recommendations:", error);
      toast.error("Something went wrong. Please try the quiz again.");
      navigate("/quiz");
    }
  }, [navigate]);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-48"
      >
        <div className="flex-grow flex flex-col items-center justify-start p-4 pt-12">
          <h1
            className="text-5xl font-black text-center mb-2 text-zinc-950"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            CURATED FOR YOU
          </h1>
          <span
            className="block text-lg text-black font-black mb-8 text-center"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            Based on your style preferences
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
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
                  className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-4 border-b flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={`/profile_pics/${cleanName.toLowerCase()}.jpg`}
                          alt={cleanName}
                        />
                        <AvatarFallback>
                          {cleanName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <h3 className="font-medium text-gray-900">
                          @{cleanName}
                        </h3>
                      </div>
                    </div>
                    {brand.genre && (
                      <Badge
                        className={`${
                          genreColors[brand.genre.split("/")[0]]?.bg ||
                          "bg-gray-500"
                        } ${
                          genreColors[brand.genre.split("/")[0]]?.text ||
                          "text-white"
                        }`}
                      >
                        {brand.genre.split("/")[0]}
                      </Badge>
                    )}
                  </div>
                  <div
                    className="relative aspect-[3/4] cursor-pointer bg-white"
                    onClick={() => handleBrandClick(cleanName)}
                  >
                    <iframe
                      src={`https://www.instagram.com/${cleanName}/embed`}
                      className="w-full h-full border-none scale-[1.02]"
                      title={`${cleanName} Instagram Feed`}
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Button
            onClick={() => navigate("/home")}
            className="bg-black text-white hover:bg-gray-800 font-bold text-lg px-8 py-3"
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
    </div>
  );
};

export default RecommendationsPage;
