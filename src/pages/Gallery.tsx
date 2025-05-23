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
import { useLocation, useNavigate } from "react-router-dom";

const Gallery = () => {
  const { collapsed } = useSidebar();
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleBrands, setVisibleBrands] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle URL parameters for brand selection
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const brandParam = urlParams.get("brand");
    if (brandParam) {
      const cleanBrandName = brandParam.replace("@", "");
      const brand = brands.find(
        (b) => b.name === cleanBrandName || b.name === `@${cleanBrandName}`
      );
      if (brand) {
        setSelectedBrand({
          id: brands.indexOf(brand) + 1,
          title: brand.name,
          genre: brand.genre?.toUpperCase() || "STREET",
          image: `/profile_pics/${brand.name.replace("@", "")}.jpg`,
          followers: brand.followers,
        });
      }
    }
  }, [location.search]);

  // Preload all brands immediately
  useEffect(() => {
    // Initially load only 4 brands
    const initialBrands = brands
      .slice(0, 4)
      .map((brand) => brand.name.replace("@", ""));
    setVisibleBrands(initialBrands);

    // Preload only essential content initially
    const preloadEssentialContent = async () => {
      // Load first 4 profile pictures with high priority
      brands.slice(0, 4).forEach((brand) => {
        const cleanName = brand.name.replace("@", "");
        const profileImg = new Image();
        profileImg.src = `/profile_pics/${cleanName}.jpg`;
        profileImg.loading = "eager";
        profileImg.fetchPriority = "high";
      });

      // Load remaining brands after a delay
      setTimeout(() => {
        const allBrands = brands.map((brand) => brand.name.replace("@", ""));
        setVisibleBrands(allBrands);

        // Load remaining profile pictures with lower priority
        brands.slice(4).forEach((brand) => {
          const cleanName = brand.name.replace("@", "");
          const profileImg = new Image();
          profileImg.src = `/profile_pics/${cleanName}.jpg`;
          profileImg.loading = "lazy";
        });
      }, 2000); // 2 second delay before loading the rest
    };

    preloadEssentialContent();
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

  const handleBrandSelect = (brandName: string) => {
    // Update URL without triggering a page reload
    const cleanBrandName = brandName.replace("@", "");
    navigate(`/gallery?brand=${cleanBrandName}`, { replace: true });

    // Find the brand in the brands array, handling both cases with and without @
    const brand = brands.find(
      (b) => b.name === cleanBrandName || b.name === `@${cleanBrandName}`
    );
    if (brand) {
      setSelectedBrand({
        id: brands.indexOf(brand) + 1,
        title: brand.name,
        genre: brand.genre?.toUpperCase() || "STREET",
        image: `/profile_pics/${brand.name.replace("@", "")}.jpg`,
        followers: brand.followers,
      });
    }
  };

  const closeInstagramView = () => {
    setSelectedBrand(null);
    // Remove brand parameter from URL
    navigate("/gallery", { replace: true });
  };

  return (
    <div className="flex min-h-screen font-kanit">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 ml-0 md:ml-48 bg-white overflow-x-auto transition-all duration-300"
      >
        <div className="w-full px-1 sm:px-4">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4 sm:mb-6 text-black"
            style={{ fontFamily: "Arial Black, Kanit, sans-serif" }}
          >
            GALLERY
          </h1>
          <div className="mb-2 sm:mb-4">
            <BrandSearchBar
              onSearch={handleSearch}
              onSelectBrand={handleBrandSelect}
            />
          </div>
          <div className="mb-4 sm:mb-8">
            <FashionGrid
              searchQuery={searchQuery}
              onSelectBrand={setSelectedBrand}
              onResetSearch={() => setSearchQuery("")}
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
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeInstagramView}
            >
              <motion.div
                className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <motion.h2
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    @{selectedBrand.title.replace("@", "")}
                  </motion.h2>
                  <motion.button
                    onClick={closeInstagramView}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <motion.div
                  className="rounded-xl overflow-hidden aspect-square w-full relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                >
                  <iframe
                    src={`https://www.instagram.com/${selectedBrand.title.replace(
                      /@/g,
                      ""
                    )}/embed`}
                    className="w-full h-full border-none"
                    title={`${selectedBrand.title} Instagram Feed`}
                    loading="eager"
                    scrolling="no"
                    allowTransparency={true}
                    onLoad={(e) => {
                      const iframe = e.target as HTMLIFrameElement;
                      iframe.style.opacity = "1";
                    }}
                    style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;
