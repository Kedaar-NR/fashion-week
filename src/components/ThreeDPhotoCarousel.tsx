
import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

const keywords = [
  "streetwear",
  "fashion",
  "urban",
  "hype",
  "youth",
  "sneakers",
  "style",
  "streetstyle",
];

const duration = 0.15;
const transition = { duration, ease: [0.32, 0.72, 0, 1] };
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] };

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void;
    controls: any;
    cards: string[];
    isCarouselActive: boolean;
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
    const [rotationY, setRotationY] = useState(0);

    const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
    const faceCount = cards.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);

    const handleDrag = (_: any, info: any) => {
      if (isCarouselActive) {
        setRotationY(prevRotation => prevRotation + info.offset.x * 0.2);
      }
    };

    const handleDragEnd = (_: any, info: any) => {
      if (isCarouselActive) {
        controls.start({
          rotateY: rotationY + info.velocity.x * 0.2,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 30,
            mass: 0.1,
          },
        });
      }
    };

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            width: cylinderWidth,
            transformStyle: "preserve-3d",
            rotateY: rotationY,
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`Streetwear style ${i + 1}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none w-full rounded-xl object-cover aspect-square shadow-lg"
                initial={{ filter: "blur(2px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={transition}
                style={{
                  willChange: "transform",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

const ThreeDPhotoCarousel = () => {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();
  
  // High quality streetwear images
  const streetwearImages = useMemo(() => [
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1552573102-2b44b44d85b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1550614000-b6b72bd7cd3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80&w=800&h=800&fit=crop",
  ], []);

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveImg(null);
    setIsCarouselActive(true);
  };

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-8"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg}`}
              src={activeImg}
              className="max-w-full max-h-full rounded-xl shadow-xl"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={streetwearImages}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
};

export { ThreeDPhotoCarousel };
