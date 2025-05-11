import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { useSidebar } from "./Sidebar";
import { Link } from "react-router-dom";
import SignInPrompt from "@/components/SignInPrompt";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
  const { collapsed } = useSidebar();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const [visibleBrands, setVisibleBrands] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInTooltip, setShowSignInTooltip] = useState<string | null>(
    null
  );

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
    // Check login status
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    // Preload first 9 Instagram embeds in the background
    const preloadInstagramEmbeds = () => {
      fashionItems.slice(0, 9).forEach((item) => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = `https://www.instagram.com/${item.title.replace(
          "@",
          ""
        )}/embed`;
        document.body.appendChild(iframe);

        // Remove after loading to clean up
        iframe.onload = () => {
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        };
      });

      // Set initial visible brands
      setVisibleBrands(
        fashionItems.slice(0, 9).map((item) => item.title.replace("@", ""))
      );
    };

    // Start preloading immediately
    preloadInstagramEmbeds();
  }, []);

  // Add intersection observer to load more brands as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const brand = entry.target.getAttribute("data-brand");
            if (brand && !visibleBrands.includes(brand)) {
              setVisibleBrands((prev) => [...prev, brand]);
            }
          }
        });
      },
      { rootMargin: "50px" }
    );

    document.querySelectorAll("[data-lazy-load]").forEach((el) => {
      observer.observe(el);
    });

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

  // Add liked animation
  const handleLike = (brandTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isLoggedIn) {
      return; // Don't proceed if not logged in
    }

    const updatedLikes = likedBrands.includes(brandTitle)
      ? likedBrands.filter((name) => name !== brandTitle)
      : [...likedBrands, brandTitle];

    setLikedBrands(updatedLikes);
    localStorage.setItem("likedBrands", JSON.stringify(updatedLikes));

    // Animate heart
    const heartEl = event.currentTarget.querySelector("svg");
    if (heartEl) {
      heartEl.classList.add("scale-150");
      setTimeout(() => {
        heartEl.classList.remove("scale-150");
      }, 200);
    }
  };

  return (
    <div className="p-1 flex-1 overflow-auto">
      <div className="w-full flex flex-col items-center">
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

        <div
          className={`grid grid-cols-1 ${
            collapsed
              ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3"
              : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          } gap-6 w-full`}
        >
          {filteredItems.map((item, index) => {
            const mainGenre = item.genre.split("/")[0].trim().toUpperCase();
            const genreStyle =
              genreColors[mainGenre] || genreColors["ESSENTIALS"];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                data-lazy-load
                data-brand={item.title.replace("@", "")}
                onClick={() => onSelectBrand(item)}
              >
                {!isLoggedIn && (
                  <motion.div
                    className="absolute inset-0 z-30 bg-black/60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-200"
                    initial={false}
                  >
                    <p className="text-white text-lg font-medium mb-3">
                      Sign in to like
                    </p>
                    <Link
                      to="/signin"
                      className="px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Sign In
                    </Link>
                  </motion.div>
                )}

                <div
                  className="p-4 border-b flex items-center justify-between gap-2"
                  style={{ backgroundColor: genreStyle.bg }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage
                        src={`/profile_pics/${item.title
                          .replace("@", "")
                          .toLowerCase()}.jpg`}
                        alt={item.title}
                        className="object-cover"
                        loading={index < 9 ? "eager" : "lazy"}
                        fetchPriority={index < 9 ? "high" : "auto"}
                      />
                      <AvatarFallback
                        className="bg-gray-100 avatar-fallback"
                        style={{ display: "none" }}
                      >
                        {item.title.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="truncate">
                      <h3
                        className={`font-bold text-white ${
                          item.title.length > 15 ? "text-xs" : "text-sm"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleLike(item.title, e)}
                    onMouseEnter={() =>
                      !isLoggedIn && setShowSignInTooltip(item.title)
                    }
                    onMouseLeave={() => setShowSignInTooltip(null)}
                    className="p-1.5 hover:bg-white/10 rounded-full flex-shrink-0"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        likedBrands.includes(item.title)
                          ? "fill-white text-white"
                          : "text-white"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {!isLoggedIn && showSignInTooltip === item.title && (
                      <SignInPrompt
                        variant="tooltip"
                        onClose={() => setShowSignInTooltip(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-[400px] overflow-hidden">
                  {(index < 9 ||
                    visibleBrands.includes(item.title.replace("@", ""))) && (
                    <iframe
                      src={`https://www.instagram.com/${item.title.replace(
                        "@",
                        ""
                      )}/embed`}
                      className="w-full h-full border-none scale-[1.02]"
                      title={`${item.title} Instagram Feed`}
                      scrolling="no"
                      loading={index < 9 ? "eager" : "lazy"}
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

                <div className="px-3 py-1.5">
                  <div className="flex gap-2 justify-center">
                    {item.genre.split("/").map((genre, idx) => {
                      const genreKey = genre.trim().toUpperCase();
                      const genreStyle =
                        genreColors[genreKey] || genreColors["ESSENTIALS"];
                      return (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: genreStyle.bg }}
                        >
                          {genre.trim()}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FashionGrid;
