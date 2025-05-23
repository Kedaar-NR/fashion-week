import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";

// Define types for the brand content structure
interface BrandContent {
  name: string;
  images: string[];
  videos: string[];
}

// Update the props interface to include both brandName and onSelectBrand
interface BrandContentCollageProps {
  brandName?: string;
  onSelectBrand?: (brandName: string) => void;
}

const SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "mp4"];

const BrandContentCollage = ({
  brandName,
  onSelectBrand,
}: BrandContentCollageProps) => {
  const [content, setContent] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedContent, setLikedContent] = useState<Set<string>>(new Set());
  const [lastTapTime, setLastTapTime] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  // Dynamically determine columns based on content length and screen size
  useEffect(() => {
    function updateColumns() {
      const width = gridRef.current?.offsetWidth || window.innerWidth;
      let cols = 1;
      if (content.length >= 12) cols = 6;
      else if (content.length >= 9) cols = 5;
      else if (content.length >= 6) cols = 4;
      else if (content.length >= 4) cols = 3;
      else if (content.length === 3) cols = 3;
      else if (content.length === 2) cols = 2;
      else cols = 1;
      // Responsive: shrink columns if container is narrow
      if (width < 600 && cols > 2) cols = 2;
      if (width < 400) cols = 1;
      setColumns(cols);
    }
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [content.length]);

  useEffect(() => {
    if (!brandName) return;
    setLoading(true);
    const fetchContent = async () => {
      try {
        const res = await fetch(`/brand_content/${brandName}/index.json`);
        if (!res.ok) throw new Error("No index.json found");
        const data = await res.json();
        let files: string[] = data.files || [];
        files = files.map((file) => `/brand_content/${brandName}/${file}`);
        // Randomize order
        for (let i = files.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [files[i], files[j]] = [files[j], files[i]];
        }
        setContent(files);
      } catch (err) {
        setContent([]);
      }
      setLoading(false);
    };
    fetchContent();
  }, [brandName]);

  // Handle double tap/click
  const handleContentTap = (contentPath: string, event: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    const DOUBLE_TAP_DELAY = 300;
    if (tapLength < DOUBLE_TAP_DELAY && tapLength > 0) {
      event.preventDefault();
      event.stopPropagation();
      setLikedContent((prev) => {
        const newLiked = new Set(prev);
        if (newLiked.has(contentPath)) {
          newLiked.delete(contentPath);
          toast.error("Removed from wishlist");
        } else {
          newLiked.add(contentPath);
          toast.success("Added to wishlist");
        }
        return newLiked;
      });
    }
    setLastTapTime(currentTime);
  };

  // Only show a perfect square number of images (n*n)
  const getPerfectSquareCount = (count: number) => {
    return Math.pow(Math.floor(Math.sqrt(count)), 2);
  };
  const squareCount = getPerfectSquareCount(content.length);
  const squareContent = content.slice(0, squareCount);

  return (
    <div className="w-full max-w-[100vw] px-0 sm:px-0 md:px-0 lg:px-0 pb-0 mb-0 h-full flex flex-col justify-center">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : content.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`flex-1 flex flex-col justify-center ${
            squareContent.length === 1 ? "items-center" : ""
          }`}
          style={{ minHeight: "100%", height: "100%" }}
        >
          <div
            ref={gridRef}
            className={`grid gap-3 w-full h-full justify-items-center items-center ${
              squareContent.length === 1 ? "place-items-center" : ""
            }`}
            style={{
              gridTemplateColumns: `repeat(${Math.sqrt(
                squareContent.length
              )}, 1fr)`,
              justifyContent:
                squareContent.length === 1 ||
                (squareContent.length % 2 !== 0 && squareContent.length < 6)
                  ? "center"
                  : "start",
              alignItems: "center",
              height: "100%",
            }}
          >
            {/* Responsive breakpoints for columns */}
            <style>{`
              @media (max-width: 640px) {
                .brand-collage-grid { grid-template-columns: repeat(2, 1fr) !important; }
              }
              @media (min-width: 640px) {
                .brand-collage-grid { grid-template-columns: repeat(3, 1fr) !important; }
              }
              @media (min-width: 1024px) {
                .brand-collage-grid { grid-template-columns: repeat(5, 1fr) !important; }
              }
            `}</style>
            {squareContent.map((file, index) => {
              const isVideo = file.endsWith(".mp4");
              return (
                <motion.div
                  key={`content-${index}`}
                  className="relative overflow-hidden cursor-pointer group h-full w-full aspect-square brand-collage-grid"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                      damping: 20,
                      stiffness: 300,
                      delay: index * 0.1,
                    },
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      damping: 15,
                      stiffness: 400,
                    },
                  }}
                  onClick={(e) => {
                    handleContentTap(file, e);
                    if (!e.defaultPrevented) {
                      onSelectBrand?.(brandName || "");
                    }
                  }}
                >
                  {isVideo ? (
                    <video
                      src={file}
                      className="h-full w-full object-cover bg-black"
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000",
                      }}
                    />
                  ) : (
                    <img
                      src={file}
                      alt={`${brandName} content`}
                      className="h-full w-full object-cover bg-black"
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000",
                      }}
                    />
                  )}
                  {likedContent.has(file) && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Heart className="w-12 h-12 text-red-500 fill-red-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <div className="flex justify-center items-center h-40 text-gray-400 text-lg font-semibold">
          No content found for this brand.
        </div>
      )}
    </div>
  );
};

export default BrandContentCollage;
