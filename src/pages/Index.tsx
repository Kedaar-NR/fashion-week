
import { useState, useEffect, useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { SparklesText } from "@/components/ui/sparkles-text";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Footerdemo } from "@/components/ui/footer-section";
import { ExpandableChatDemo } from "@/components/ExpandableChatDemo";
import StyleQuiz from "@/components/StyleQuiz";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { GlobeDemo } from "@/components/ui/GlobeDemo";
import { Heart } from "lucide-react";
import { toast } from "sonner";

// Sort brands alphabetically
const brandsWithRandomFollowers = [...brands].sort((a, b) => a.name.localeCompare(b.name));

// Generate brand descriptions
const getBrandDescription = (brandName: string) => {
  const descriptions = [
    `${brandName} is a cutting-edge fashion brand known for its innovative designs and sustainable practices.`,
    `With a focus on quality materials, ${brandName} creates timeless pieces for the modern individual.`,
    `${brandName} blends contemporary aesthetics with traditional craftsmanship for a unique fashion experience.`,
    `Founded with a passion for self-expression, ${brandName} pushes the boundaries of conventional fashion.`,
    `${brandName} celebrates diversity and inclusivity through its bold and vibrant collections.`
  ];
  
  // Use the first character of the brand name to consistently select a description
  const index = brandName.charCodeAt(0) % descriptions.length;
  return descriptions[index];
};

// Sample brand descriptions
const brandBlurbs: Record<string, string> = {
  "jeanpaulknott": "Jean-Paul Knott delivers timeless elegance with minimalist designs that focus on exceptional tailoring and luxurious fabrics.",
  "isseymiyake": "Issey Miyake blends technology with tradition, creating innovative pleating techniques and architectural silhouettes that redefine modern fashion.",
  "acnestudios": "Acne Studios combines Scandinavian minimalism with distinctive design elements, offering contemporary pieces with artistic sensibilities.",
  "maisonmargiela": "Maison Margiela's avant-garde approach deconstructs and reimagines fashion conventions, creating conceptual designs with intellectual depth.",
  "commedesgarcons": "Comme des Garçons challenges fashion norms with bold, architectural designs that blend art and fashion in unexpected ways.",
  "rafsimons": "Raf Simons merges youth culture references with precise tailoring, creating collections that are both culturally relevant and impeccably crafted.",
  "balenciaga": "Balenciaga delivers architectural silhouettes and street-inspired designs that define contemporary fashion through bold innovation.",
  "vetements": "Vetements subverts fashion expectations with oversized proportions and street influences, creating statement pieces with cultural commentary.",
  "rickowens": "Rick Owens crafts dark, architectural designs with a distinctive gothic aesthetic that balances brutalist forms with fluid draping.",
};

// Get a detailed blurb for a brand, fallback to generated description
const getBlurb = (brandName: string) => {
  const normalizedName = brandName.toLowerCase().replace(/[^a-z0-9]/g, "");
  return brandBlurbs[normalizedName] || getBrandDescription(brandName);
};

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  onButtonClick: () => void;
}

const Slide = ({ slide, index, current, handleSlideClick, onButtonClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[40vmin] h-[40vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold relative font-kanit">
            {title}
          </h2>
          <div className="flex justify-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick();
              }}
              className="mt-4 px-3 py-1 w-fit mx-auto sm:text-sm text-black bg-white h-10 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] font-kanit"
            >
              {button}
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border border-gray-300 rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  onButtonClick: () => void;
}

const CustomCarousel = ({ slides, onButtonClick }: CarouselProps) => {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[40vmin] h-[40vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            onButtonClick={onButtonClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full bottom-[-3rem]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showStyleQuiz, setShowStyleQuiz] = useState(false);
  const [likedBrands, setLikedBrands] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has completed the quiz
    const hasCompletedQuiz = localStorage.getItem('hasCompletedQuiz');
    
    // If not completed, show the quiz
    if (!hasCompletedQuiz) {
      setShowStyleQuiz(true);
    }
    
    // Load liked brands from localStorage
    const saved = JSON.parse(localStorage.getItem('likedBrands') || '[]');
    setLikedBrands(saved);
  }, []);

  const handleSelect = (brandName: string) => {
    setSelectedBrand(brandName.replace('@', ''));
  };

  const filteredBrands = searchQuery ? brandsWithRandomFollowers.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const handleCarouselButtonClick = () => {
    navigate('/brands');
  };

  const handleCloseStyleQuiz = () => {
    setShowStyleQuiz(false);
  };

  const handleOpenStyleQuiz = () => {
    setShowStyleQuiz(true);
  };

  // Handle toggling liked status for brands
  const toggleLikeBrand = (e: React.MouseEvent, brandName: string) => {
    e.stopPropagation();
    
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Please sign in to save brands");
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
      return;
    }
    
    const isLiked = likedBrands.includes(brandName);
    let updatedLikedBrands;
    
    if (isLiked) {
      // Remove from liked
      updatedLikedBrands = likedBrands.filter(name => name !== brandName);
      toast.success(`Removed ${brandName} from liked brands`);
    } else {
      // Add to liked
      updatedLikedBrands = [...likedBrands, brandName];
      toast.success(`Added ${brandName} to liked brands`);
    }
    
    setLikedBrands(updatedLikedBrands);
    localStorage.setItem('likedBrands', JSON.stringify(updatedLikedBrands));
  };

  // Close brand popup
  const closeInstagramView = () => {
    setSelectedBrand(null);
  };

  // Brand popup UI - shared between Index and LikedPage
  const renderBrandPopup = (brandName: string) => {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center ml-14 md:ml-48">
        <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{brandName}</h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => toggleLikeBrand(e, brandName)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart 
                  className={`h-5 w-5 ${likedBrands.includes(brandName) ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </button>
              <button 
                onClick={closeInstagramView}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ✕
              </button>
            </div>
          </div>
          
          {/* Brand description */}
          <p className="mb-4 text-gray-600 italic border-l-4 border-gray-300 pl-3 py-2 bg-gray-50">
            {getBlurb(brandName)}
          </p>
          
          <div className="rounded-xl overflow-hidden aspect-square w-full h-[70vh]">
            <iframe 
              src={`https://www.instagram.com/${brandName}/embed`}
              className="w-full h-full border-none" 
              title={`${brandName} Instagram Feed`}
              allowTransparency={true}
              scrolling="no"
            />
          </div>
        </div>
      </div>
    );
  };

  // Updated carousel images from the images folder
  const fashionSlides = [
    {
      title: "Modern Fashion",
      button: "Explore Collection",
      src: "/images/images1/image1.jpg",
    },
    {
      title: "Urban Streetwear",
      button: "View Style",
      src: "/images/images2/image1.jpg",
    },
    {
      title: "Designer Pieces",
      button: "Browse Designs",
      src: "/images/images1/image2.jpg",
    },
    {
      title: "Casual Elegance",
      button: "Shop Now",
      src: "/images/images2/image2.jpg",
    },
  ];

  const brandColors = [
    'from-gray-500 to-gray-800',
    'from-gray-400 to-black',
    'from-gray-600 to-gray-900',
    'from-silver-400 to-gray-700',
    'from-gray-300 to-gray-800',
    'from-gray-500 to-black',
    'from-gray-400 to-gray-700',
    'from-silver-500 to-gray-800',
    'from-gray-400 to-black',
    'from-gray-500 to-gray-700',
  ];

  return (
    <div className="min-h-screen flex flex-col font-kanit bg-white">
      <div className="flex-grow">
        <div className="flex min-h-screen">
          <Sidebar />
          
          <div className="flex-1 flex flex-col ml-14 md:ml-48 transition-all duration-300">
            <div className="mt-6 mb-4 px-8">
              <div className="relative">
                <SparklesText 
                  text="Your gateway to curated fashion brands"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-center font-kanit"
                  colors={{ first: "#c0c0c0", second: "#333333" }}
                  sparklesCount={15}
                />
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              <RainbowButton onClick={handleOpenStyleQuiz}>
                Discover Your Style
              </RainbowButton>
            </div>
            
            <div className="px-8 mb-8 animate-scale-in">
              <div className="relative w-full max-w-3xl mx-auto">
                <Command className="rounded-lg border shadow-md">
                  <CommandInput
                    placeholder="Search brands"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="h-12 font-kanit"
                  />
                  {searchQuery.length > 0 && filteredBrands.length > 0 && (
                    <CommandList>
                      <CommandGroup heading="Brands">
                        <ScrollArea className="h-64">
                          {filteredBrands.map((brand, index) => (
                            <CommandItem
                              key={brand.name}
                              onSelect={() => handleSelect(brand.name)}
                              className="cursor-pointer flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                            >
                              <Avatar className={`h-8 w-8 bg-gradient-to-br ${brandColors[index % brandColors.length]}`}>
                                <div className="font-bold text-white">
                                  {brand.name.charAt(0).toUpperCase()}
                                </div>
                              </Avatar>
                              <span>{brand.name}</span>
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </div>
            </div>
            
            {selectedBrand ? (
              renderBrandPopup(selectedBrand)
            ) : (
              <>
                <div className="px-8 pb-8 mt-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="relative overflow-hidden w-full pb-16">
                      <CustomCarousel slides={fashionSlides} onButtonClick={handleCarouselButtonClick} />
                    </div>
                  </div>
                </div>
                
                <div className="px-8 pb-8">
                  <GlobeDemo />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative z-10">
        <Footerdemo />
      </div>
      
      <ExpandableChatDemo />

      {showStyleQuiz && <StyleQuiz onClose={handleCloseStyleQuiz} />}
    </div>
  );
};

export default Index;
