import { useState, useEffect, useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { brands } from "@/data/brands";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { SparklesText } from "@/components/ui/sparkles-text";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Footerdemo } from "@/components/ui/footer-section";
import { ExpandableChatDemo } from "@/components/ExpandableChatDemo";
import StyleQuiz from "@/components/StyleQuiz";

// Generate random follower counts for brands between 1 and 10k
const brandsWithRandomFollowers = brands.map(brand => ({
  ...brand,
}));

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
          <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold relative">
            {title}
          </h2>
          <div className="flex justify-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onButtonClick();
              }}
              className="mt-4 px-3 py-1 w-fit mx-auto sm:text-sm text-black bg-white h-10 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
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
  const [showStyleQuiz, setShowStyleQuiz] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenQuiz = localStorage.getItem('hasSeenStyleQuiz');
    if (hasSeenQuiz) {
      setShowStyleQuiz(false);
    }
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
    localStorage.setItem('hasSeenStyleQuiz', 'true');
  };

  const fashionSlides = [
    {
      title: "Modern Fashion",
      button: "Explore Collection",
      src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Urban Streetwear",
      button: "View Style",
      src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Designer Pieces",
      button: "Browse Designs",
      src: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Casual Elegance",
      button: "Shop Now",
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    <div className="min-h-screen flex flex-col">
      <AuroraBackground className="min-h-screen flex-1 overflow-auto p-0">
        <div className="flex min-h-screen">
          <Sidebar />
          
          <div className="flex-1 flex flex-col ml-14 md:ml-48 transition-all duration-300">
            <div className="mt-6 mb-4 px-8">
              <div className="relative">
                <SparklesText 
                  text="Your gateway to curated fashion brands"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
                  colors={{ first: "#c0c0c0", second: "#333333" }}
                  sparklesCount={15}
                />
              </div>
            </div>
            
            <div className="px-8 mb-8 animate-scale-in">
              <div className="relative w-full max-w-3xl mx-auto">
                <Command className="rounded-lg border shadow-md">
                  <CommandInput
                    placeholder="Search brands"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="h-12"
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
                              <span className="ml-auto text-xs text-gray-400">{brand.followers}</span>
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
              <div className="px-8 pb-8 mt-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-4 gradient-text gradient-primary">{selectedBrand}</h2>
                <div className="rounded-xl overflow-hidden shadow-lg bg-white w-full aspect-square max-w-3xl mx-auto hover:shadow-xl transition-shadow">
                  <iframe 
                    src={`https://www.instagram.com/${selectedBrand}/embed`}
                    className="w-full h-full border-none" 
                    title={`${selectedBrand} Instagram Feed`}
                    allowTransparency={true}
                    scrolling="no"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="px-8 pb-8 mt-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="relative overflow-hidden w-full pb-16">
                      <CustomCarousel slides={fashionSlides} onButtonClick={handleCarouselButtonClick} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </AuroraBackground>
      
      <Footerdemo />
      
      <ExpandableChatDemo />

      {showStyleQuiz && <StyleQuiz onClose={handleCloseStyleQuiz} />}
    </div>
  );
};

export default Index;
