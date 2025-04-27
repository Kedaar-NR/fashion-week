import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { brands, genreColors } from "@/data/brands";
import {
  Heart,
  Instagram,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MarqueeCategories from "./MarqueeCategories";
import { Button } from "./ui/button";

const getBrandWebsiteUrl = (brandName: string) => {
  const websiteUrls: Record<string, string> = {
    "aliasonline.us": "https://aliasonline.us",
    vicinity_de: "https://vicinity.de",
    "gospel.core": "https://gospelcore.com",
    "somar.us": "https://somar.us",
    "berlinc.co": "https://berlinc.co",
    "sixshooter.us": "https://sixshooter.us",
  };

  return websiteUrls[brandName] || null;
};

const fashionItems = brands.map((brand, index) => ({
  id: index + 1,
  title: brand.name,
  genre: brand.genre?.toUpperCase() || "STREET",
  image: `https://placeholder.pics/svg/300x300/DEDEDE/555555/${brand.name}`,
  followers: brand.followers,
}));

interface FashionGridProps {
  searchQuery?: string;
  onSelectBrand: (brand: any) => void;
  onResetSearch?: () => void;
}

const FashionGrid = ({
  searchQuery = "",
  onSelectBrand,
  onResetSearch,
}: FashionGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [visibleBrands, setVisibleBrands] = useState<string[]>([]);

  const filteredItems = fashionItems
    .filter((item) => {
      return selectedCategory
        ? item.genre.toUpperCase() === selectedCategory.toUpperCase()
        : true;
    })
    .filter((item) => {
      return searchQuery
        ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
    });

  const toggleLike = (brandTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedLikes = likedBrands.includes(brandTitle)
      ? likedBrands.filter((name) => name !== brandTitle)
      : [...likedBrands, brandTitle];
    setLikedBrands(updatedLikes);
    localStorage.setItem("likedBrands", JSON.stringify(updatedLikes));
  };

  useEffect(() => {
    // Preload more on desktop, fewer on mobile for speed
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
    const preloadCount = isMobile ? 12 : 50;
    const preloadBrands = fashionItems
      .slice(0, preloadCount)
      .map((item) => item.title.replace("@", ""));
    setVisibleBrands(preloadBrands);
  }, []);

  useEffect(() => {
    // Lazy load the rest as you scroll
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const brandName = entry.target.getAttribute("data-brand");
            if (brandName && !visibleBrands.includes(brandName)) {
              setVisibleBrands((prev) => [...prev, brandName]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll("[data-lazy-load]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleBrands]);

  useEffect(() => {
    // Preload all brand profile images
    brands.forEach((brand) => {
      const image = new window.Image();
      image.src = `/profile_pics/${brand.name
        .replace("@", "")
        .toLowerCase()}.jpg`;
    });
  }, []);

  return (
    <div className="p-1 flex-1 overflow-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {searchQuery && (
          <div className="mb-2 w-full flex justify-center">
            <Button
              onClick={onResetSearch}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <RefreshCw size={14} />
              <span>Reset Search</span>
            </Button>
          </div>
        )}

        <div className="mb-4 w-full">
          <MarqueeCategories onSelectCategory={setSelectedCategory} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              data-lazy-load
              data-brand={item.title.replace("@", "")}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              onClick={() => onSelectBrand(item)}
            >
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <img
                      src={`/profile_pics/${item.title
                        .replace("@", "")
                        .toLowerCase()}.jpg`}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback =
                          e.currentTarget.parentElement?.querySelector(
                            ".profile-fallback"
                          );
                        if (fallback && fallback instanceof HTMLElement) {
                          fallback.style.display = "flex";
                        }
                      }}
                    />
                    <span className="profile-fallback hidden w-full h-full items-center justify-center text-xs font-bold text-gray-600 bg-gray-200">
                      {item.title.replace("@", "").slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm font-medium break-words whitespace-normal">
                    @{item.title.replace("@", "")}
                  </div>
                </div>

                <button
                  onClick={(e) => toggleLike(item.title, e)}
                  className="p-1.5 rounded-full hover:bg-gray-200"
                  aria-label={
                    likedBrands.includes(item.title) ? "Unlike" : "Like"
                  }
                >
                  <Heart
                    size={18}
                    className={
                      likedBrands.includes(item.title)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }
                  />
                </button>
              </div>

              <div className="h-[400px] overflow-hidden relative">
                {visibleBrands.includes(item.title.replace("@", "")) && (
                  <iframe
                    src={`https://www.instagram.com/${item.title.replace(
                      "@",
                      ""
                    )}/embed`}
                    className="relative z-10 w-full h-full border-none scale-[1.02]"
                    title={`${item.title} Instagram Feed`}
                    scrolling="no"
                    loading="eager"
                    onError={(e) => {
                      const iframe = e.currentTarget;
                      iframe.style.display = "none";
                      const container = document.createElement("div");
                      container.className =
                        "w-full h-full flex items-center justify-center bg-gray-100";
                      const iconContainer = document.createElement("div");
                      iconContainer.className =
                        "text-gray-400 flex items-center justify-center h-full";
                      iconContainer.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shirt"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>';
                      container.appendChild(iconContainer);
                      iframe.parentNode?.appendChild(container);
                    }}
                  />
                )}
              </div>

              <div className="px-3 py-2">
                <div className="flex flex-wrap gap-2 justify-center">
                  {item.genre.split("/").map((genre, idx) => {
                    const genreKey = genre.trim().toUpperCase();
                    return (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          genreColors[genreKey]?.bg || "bg-gray-500"
                        } ${genreColors[genreKey]?.text || "text-white"}`}
                      >
                        {genre.trim()}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionGrid;
