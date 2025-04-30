import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FashionGrid from "@/components/FashionGrid";
import BrandSearchBar from "@/components/BrandSearchBar";
import TallyEmailWidget from "@/components/TallyEmailWidget";
import Sidebar, { useSidebar } from "@/components/Sidebar";
import BrandContentCollage from "@/components/BrandContentCollage";
import { brands } from "@/data/brands";

const Gallery = () => {
  const { collapsed } = useSidebar();
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleBrands, setVisibleBrands] = useState<string[]>([]);
  const [preloadedEmbeds, setPreloadedEmbeds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle URL parameters for brand selection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get("brand");
    if (brandParam) {
      handleBrandSelect(brandParam);
    }
  }, []);

  // Preload all brands immediately
  useEffect(() => {
    const allBrands = brands.map((brand) => brand.name.replace("@", ""));
    setVisibleBrands(allBrands);

    // Create a container for preloaded iframes
    const preloadContainer = document.createElement("div");
    preloadContainer.style.cssText =
      "position: fixed; left: -9999px; top: -9999px; width: 0; height: 0; overflow: hidden;";
    document.body.appendChild(preloadContainer);

    // Track which embeds have been loaded
    const loadedEmbeds = new Set<string>();

    // Preload all brand profile pictures and content
    brands.forEach((brand) => {
      const cleanName = brand.name.replace("@", "");

      // Preload profile picture
      const profileImg = new Image();
      profileImg.src = `/profile_pics/${cleanName}.jpg`;

      // Preload brand content images
      const brandContentImg = new Image();
      brandContentImg.src = `https://placeholder.pics/svg/300x300/DEDEDE/555555/${brand.name}`;

      // Create and load Instagram embed iframe
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.instagram.com/${cleanName}/embed`;
      iframe.style.width = "1px";
      iframe.style.height = "1px";
      iframe.style.opacity = "0.01";
      iframe.onload = () => {
        loadedEmbeds.add(cleanName);
        setPreloadedEmbeds(new Set(loadedEmbeds));
      };
      preloadContainer.appendChild(iframe);
    });

    // Cleanup function
    return () => {
      document.body.removeChild(preloadContainer);
    };
  }, []);

  // Scroll lock when popup/modal is open
  useEffect(() => {
    if (expandedBrand || selectedBrand) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [expandedBrand, selectedBrand]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const resetSearch = () => {
    setSearchQuery("");
  };

  const handleBrandSelect = (brandName: string) => {
    const cleanBrandName = brandName.replace("@", "");
    setExpandedBrand(cleanBrandName === expandedBrand ? null : cleanBrandName);

    // If we're closing the current brand, scroll to top
    if (cleanBrandName === expandedBrand) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const brand = brands.find((b) => b.name === `@${cleanBrandName}`);
    if (brand) {
      setSelectedBrand({
        id: brands.indexOf(brand) + 1,
        title: brand.name,
        genre: brand.genre?.toUpperCase() || "STREET",
        image: `/profile_pics/${brand.name.replace("@", "")}.jpg`,
        followers: brand.followers,
      });

      // If opening a new brand, scroll to the collage after a brief delay
      if (cleanBrandName !== expandedBrand) {
        setTimeout(() => {
          const collageElement = document.getElementById("brand-collage");
          if (collageElement) {
            collageElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      }
    }
  };

  const closeInstagramView = () => {
    setSelectedBrand(null);
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
          <h1 className="font-bold text-center mb-6 text-black text-4xl">
            Gallery
          </h1>

          <div className="mb-4">
            <BrandSearchBar
              onSearch={handleSearch}
              onSelectBrand={handleBrandSelect}
            />
          </div>

          <div className="mb-8">
            <FashionGrid
              searchQuery={searchQuery}
              onSelectBrand={setSelectedBrand}
              onResetSearch={resetSearch}
            />
          </div>

          <TallyEmailWidget />

          <AnimatePresence>
            {expandedBrand && (
              <motion.div
                id="brand-collage"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8 bg-white rounded-lg fixed left-0 top-0 w-full z-40"
                style={{ minHeight: "100vh" }}
              >
                <BrandContentCollage
                  brandName={expandedBrand}
                  onSelectBrand={handleBrandSelect}
                />
                <button
                  className="absolute top-6 right-8 z-50 bg-black text-white px-4 py-2 rounded-lg text-lg font-bold hover:bg-gray-800 transition"
                  onClick={() => setExpandedBrand(null)}
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>

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
                  <h2 className="text-2xl font-bold">
                    @{selectedBrand.title.replace("@", "")}
                  </h2>
                  <button
                    onClick={closeInstagramView}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="rounded-xl overflow-hidden aspect-square w-full relative">
                  {(visibleBrands.includes(
                    selectedBrand.title.replace("@", "")
                  ) ||
                    preloadedEmbeds.has(
                      selectedBrand.title.replace("@", "")
                    )) && (
                    <iframe
                      src={`https://www.instagram.com/${selectedBrand.title.replace(
                        "@",
                        ""
                      )}/embed`}
                      className="w-full h-full border-none"
                      title={`${selectedBrand.title} Instagram Feed`}
                      loading="eager"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
